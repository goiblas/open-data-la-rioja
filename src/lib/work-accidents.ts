import database from './shared/database'
import { type WorkAccidentDto } from '../types'
import { config } from '@/config'
import { type ChartData } from '@/types'

const TOTAL_INJURIES = 'TOTAL' as const
const MINOR_INJURIES = 'Leve' as const

// [GRADO DE LA LESIÓN].[Leve] -> Leve
function getInjury (injury: string) {
  const match = injury.match(/\[*\]\.\[(.+)\]/)

  if (!match) {
    throw new Error(`Invalid injury ${injury}`)
  }

  return match[1]
}

// "[CICLO].[Enero-octubre 2020]" -> 2020
function getYear (cycle: string): number {
  const match = cycle.match(/\d{4}/)
  return match ? parseInt(match[0]) : 0
}

export async function getWorkAccidentsPerYear (): Promise<ChartData> {
  const databaseDtos = await database.get<WorkAccidentDto>(config.work_accidents.file)

  const workAccidents = databaseDtos
    .map(dto => ({
      year: getYear(dto['[CICLO]']),
      amount: dto['[Measures].[Accidentes]'],
      injury: getInjury(dto['[GRADO DE LA LESIÓN]'])
    }))
    .filter(wa => wa.injury !== TOTAL_INJURIES)

  const years = [...new Set(workAccidents.map(wa => wa.year))]
  const injuries = [...new Set(workAccidents.map(wa => wa.injury))]

  const data = years.map(year => {
    const workAccidentsOfYear = workAccidents.filter(fuel => fuel.year === year)

    const groups = workAccidentsOfYear.reduce((acc, fuel) => {
      const { injury, amount } = fuel

      if (acc[injury]) {
        acc[injury] += amount
      } else {
        acc[injury] = amount
      }
      return acc
    }, {})

    return {
      year,
      ...groups
    }
  })

  return {
    data,
    index: 'year',
    categories: injuries
  }
}

export async function getWorkAccidentsSeriousPerYear (): Promise<ChartData> {
  const databaseDtos = await database.get<WorkAccidentDto>(config.work_accidents.file)

  const workAccidents = databaseDtos
    .map(dto => ({
      year: getYear(dto['[CICLO]']),
      amount: dto['[Measures].[Accidentes]'],
      injury: getInjury(dto['[GRADO DE LA LESIÓN]'])
    }))
    .filter(wa => wa.injury !== TOTAL_INJURIES)
    .filter(wa => wa.injury !== MINOR_INJURIES)

  const years = [...new Set(workAccidents.map(wa => wa.year))]
  const injuries = [...new Set(workAccidents.map(wa => wa.injury))]

  const data = years.map(year => {
    const workAccidentsOfYear = workAccidents.filter(fuel => fuel.year === year)

    const groups = workAccidentsOfYear.reduce((acc, fuel) => {
      const { injury, amount } = fuel

      if (acc[injury]) {
        acc[injury] += amount
      } else {
        acc[injury] = amount
      }
      return acc
    }, {})

    return {
      year,
      ...groups
    }
  })

  return {
    data,
    index: 'year',
    categories: injuries
  }
}
