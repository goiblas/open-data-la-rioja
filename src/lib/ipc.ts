import database from './shared/database'
import { getYearFromTimeDto, getMonthFromTimeDto } from './shared/utils'
import { config } from '@/config'
import { MONTHS_NUMBER } from './shared/constants'
import { type ChartData } from '@/types'

interface IPByRubricCDto {
  '[Measures].[Var (%) en lo que va de año (La Rioja)]': number
  '[Measures].[IPC La Rioja]': number
  '[Measures].[Var (%) anual (La Rioja)]': number
  '[Measures].[Var (%) mensual (La Rioja)]': number
  '[RÚBRICAS]': string
  '[TIEMPO]': string
}

interface IPCDto {
  '[Measures].[Var (%) en lo que va de año (La Rioja)]': number
  '[Measures].[IPC La Rioja]': number
  '[GENERAL Y GRUPOS COICOP]': string
  '[Measures].[Var (%) anual (La Rioja)]': number
  '[Measures].[Var (%) mensual (La Rioja)]': number
  '[TIEMPO]': string
}

const ORIGIN_GENERAL_GROUP = '[GENERAL Y GRUPOS ECOICOP].[00 Índice general]' as const
export const GENERAL_GROUP = 'General' as const

interface IPC {
  year: number
  month?: string
  groupName: string
  measureAnual: number
  measureMensual: number
}

function round (value: number): number {
  return Math.round(value * 100) / 100
}

// "[RÚBRICAS].[Turismo y hostelería]" -> "Turismo y hostelería"
function getTopicFromRubric (rubric: string): string {
  return rubric.replace('[RÚBRICAS].[', '').replace(']', '')
}

// "[GENERAL Y GRUPOS ECOICOP].[01 Alimentos y bebidas no alcohólicas]" -> "Alimentos y bebidas no alcohólicas"
function getGroupName (origin: string): string {
  if (origin === ORIGIN_GENERAL_GROUP) {
    return GENERAL_GROUP
  }

  const originName = origin.replace('[GENERAL Y GRUPOS ECOICOP].[', '').replace(']', '')
  const nameWithoutNumber = originName.replace(/\d{2} /, '')

  return nameWithoutNumber
}

function getMonth (time: string): string {
  try {
    return getMonthFromTimeDto(time)
  } catch (error) {
    return null
  }
}

export async function getIPCbyRubrics (): Promise<IPC[]> {
  const response = await database.get<IPByRubricCDto>(config.ipc_rubrics.fileName)

  return response.map(dto => {
    return {
      month: getMonth(dto['[TIEMPO]']),
      year: getYearFromTimeDto(dto['[TIEMPO]']),
      groupName: getTopicFromRubric(dto['[RÚBRICAS]']),
      measureAnual: round(dto['[Measures].[Var (%) anual (La Rioja)]']),
      measureMensual: round(dto['[Measures].[Var (%) mensual (La Rioja)]'])
    }
  })
}

export async function getIPCs (): Promise<IPC[]> {
  const response = await database.get<IPCDto>(config.ipc.fileName)
  return response.map(dto => {
    return {
      month: getMonth(dto['[TIEMPO]']),
      year: getYearFromTimeDto(dto['[TIEMPO]']),
      groupName: getGroupName(dto['[GENERAL Y GRUPOS COICOP]']),
      measureAnual: round(dto['[Measures].[Var (%) anual (La Rioja)]']),
      measureMensual: round(dto['[Measures].[Var (%) mensual (La Rioja)]'])
    }
  })
}

function capitalize (string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const getTimesFromNow = (months: number, initialDate: string) => {
  const date = new Date(initialDate)
  date.setMonth(date.getMonth() - months)
  const month = date.toLocaleString('es-ES', { month: 'long' })
  return {
    month: capitalize(month),
    year: date.getFullYear()
  }
}

const generateDate = (month: string, year: number) => {
  return `${year}-${MONTHS_NUMBER[month]}-01`
}

const limitData = (data: any, limitMonths: number, initialDate: string) => {
  return Array.from({ length: limitMonths }, (_, i) => {
    const { month, year } = getTimesFromNow(i, initialDate)
    return data.filter(d => d.month === month && d.year === year)
  })
    .reverse()
    .flat()
}

export async function getCurrentPeriodIPCs ({ months }: { months: number }): Promise<ChartData> {
  const ipcs = await getIPCs()
  const fullData = ipcs.filter(ipc => !!ipc.month)
    .reverse()
    .map(ipc => {
      return {
        time: `${ipc.month} ${ipc.year}`,
        month: ipc.month,
        year: ipc.year,
        anual: ipc.measureAnual,
        groupName: ipc.groupName
      }
    })

  const lastElementWidthMonth = fullData.findLast(ipc => ipc.month)
  const lastDate = generateDate(lastElementWidthMonth.month, lastElementWidthMonth.year)

  const data = limitData(fullData, months, lastDate)
  return {
    index: 'time',
    categories: ['anual'],
    data
  }
}
