import database from './shared/database'
import { config } from '@/config'
import { getMonthFromTimeDto, getYearFromTimeDto } from './shared/utils'
import { type ChartData } from '@/types'

const ALL_SECTORS = '[ACTIVIDAD DE CONSUMO ].[Todas las actividades]'

interface ElectricityDto {
  '[ACTIVIDAD DE CONSUMO ]': string
  '[Measures].[Var (%) anual]': number
  '[Measures].[Var (%) en lo que va de año]': number
  '[Measures].[Consumo (kWH)]': number
  '[TIEMPO]': string
  '[Measures].[Var (%) mensual]': number
}

interface Electricity {
  year: number
  month: string
  measure: number
}

type ElectricityWithSector = Electricity & { sector: string }

// "[ACTIVIDAD DE CONSUMO ].[Agricultura]" -> "Agricultura"
function getSector(activity: string): string {
  const sector = activity.split('.')[1]
  return sector.replace('[', '').replace(']', '').trim()
}

async function getElectricity(): Promise<Electricity[]> {
  const reponse = await database.get<ElectricityDto>(
    config.electricity.fileName
  )

  return reponse
    .filter(dto => dto['[ACTIVIDAD DE CONSUMO ]'] === ALL_SECTORS)
    .map(dto => {
      return {
        month: getMonthFromTimeDto(dto['[TIEMPO]']),
        year: getYearFromTimeDto(dto['[TIEMPO]']),
        measure: dto['[Measures].[Consumo (kWH)]']
      }
    })
}

async function getElectricityWithSector(): Promise<ElectricityWithSector[]> {
  const reponse = await database.get<ElectricityDto>(
    config.electricity.fileName
  )

  return reponse
    .filter(dto => dto['[ACTIVIDAD DE CONSUMO ]'] !== ALL_SECTORS)
    .map(dto => {
      return {
        month: getMonthFromTimeDto(dto['[TIEMPO]']),
        year: getYearFromTimeDto(dto['[TIEMPO]']),
        measure: dto['[Measures].[Consumo (kWH)]'],
        sector: getSector(dto['[ACTIVIDAD DE CONSUMO ]'])
      }
    })
}

export async function getElectricityTotalPerYear(): Promise<ChartData> {
  const electricity = await getElectricity()

  const years = [...new Set(electricity.map(e => e.year))]
  const orderedYears = years.sort((a, b) => a - b)

  const data = orderedYears.map(year => {
    const electricityOfYear = electricity.filter(e => e.year === year)

    const total = electricityOfYear.reduce((acc, e) => {
      acc += e.measure
      return acc
    }, 0)

    return {
      year,
      total: Math.round(total)
    }
  })

  return {
    index: 'year',
    categories: ['total'],
    data
  }
}

export async function getElectricityConsumptionPerType(): Promise<ChartData> {
  const electricity = await getElectricityWithSector()

  const years = [...new Set(electricity.map(e => e.year))]
  const sectors = [...new Set(electricity.map(e => e.sector))]
  const orderedYears = years.sort((a, b) => a - b)

  const data = orderedYears.map(year => {
    const electricityOfYear = electricity.filter(e => e.year === year)

    const groups = electricityOfYear.reduce((acc, { sector, measure }) => {
      if (acc[sector]) {
        acc[sector] += measure
      } else {
        acc[sector] = measure
      }

      return acc
    }, {})

    const roundedGroups = Object.keys(groups).reduce((acc, key) => {
      acc[key] = Math.round(groups[key] as number)
      return acc
    }, {})

    return {
      year,
      ...roundedGroups
    }
  })

  return {
    index: 'year',
    categories: sectors,
    data
  }
}
