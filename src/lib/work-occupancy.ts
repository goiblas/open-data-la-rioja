import database from './shared/database'
import { config } from '@/config'

interface WorkOccupancyDto {
  '[ACTIVIDAD EN EL EMPLEO ]': string
  '[CICLO]': string
  '[Measures].[Personas]': number
}

export interface WorkOccupancy {
  sector: string
  year: number
  amount: number
}

// [CICLO].[2022 (T. 3)] -> 2022
function getYear (cycle: string): number {
  const cyclePart = cycle.split(' ')[0]
  const yearRegex = /\d{4}/

  if (!yearRegex.test(cyclePart)) {
    throw new Error(`Invalid year in: ${cycle}`)
  }

  const year = yearRegex.exec(cyclePart)[0]
  return Number(year)
}

// "[ACTIVIDAD EN EL EMPLEO ].[Agricultura]" -> "Agricultura"
function getSector (activity: string): string {
  const sector = activity.split('.')[1]
  return sector.replace('[', '').replace(']', '')
}

const GENERAL_ACTIVITY = 'Actividad principal'

export async function getWorkOccupancy (): Promise<WorkOccupancy[]> {
  const databaseDtos = await database.get<WorkOccupancyDto>(config.work_occupancy.file)

  const workOccupancy = databaseDtos
    .map(dto => {
      return {
        sector: getSector(dto['[ACTIVIDAD EN EL EMPLEO ]']),
        year: getYear(dto['[CICLO]']),
        amount: dto['[Measures].[Personas]']
      }
    })
    .filter(wo => wo.sector !== GENERAL_ACTIVITY)
    .reduce((acc, wo) => {
      const index = acc.findIndex(a => a.sector === wo.sector && a.year === wo.year)
      if (index === -1) {
        acc.push(wo)
      } else {
        acc[index].amount += wo.amount
      }
      return acc
    }, [])

  return workOccupancy
}
