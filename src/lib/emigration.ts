import database from './shared/database'
import { getYearFromTimeDto } from './shared/utils'
import { config } from '@/config'
import { type ChartData } from '@/types'

interface EmigrationDto {
  '[SEXO]': string
  '[EDAD GRUPOS QUINQUENALES]': string
  '[PAÍS DE ORIGEN/DESTINO]': string
  '[TIEMPO]': string
  '[Measures].[Movimientos migratorios (La Rioja)]': number
}

interface Emigration {
  destination: string
  year: number
  measure: number
  ageGroup: string
}

const TotalKey = 'Total' as const

// [EDAD GRUPOS QUINQUENALES].[50 a 54 años] -> 50 a 54 años
function getAgeGroup(ageGroup: string): string {
  const ageGroupPart = ageGroup.split('.')[1]
  if (!ageGroupPart) {
    throw new Error(`Invalid age group in: ${ageGroup}`)
  }

  return ageGroupPart.replace('[', '').replace(']', '').trim()
}

// [PAÍS DE ORIGEN/DESTINO].[América del Norte] -> América del Norte
function getDestination(destination: string): string {
  const destinationPart = destination.split('.')[1]
  if (!destinationPart) {
    throw new Error(`Invalid destination in: ${destination}`)
  }

  return destinationPart.replace('[', '').replace(']', '').trim()
}

export async function getEmigrations(): Promise<Emigration[]> {
  const response = await database.get<EmigrationDto>(config.emigration.fileName)

  return response.map(dto => {
    return {
      destination: getDestination(dto['[PAÍS DE ORIGEN/DESTINO]']),
      year: getYearFromTimeDto(dto['[TIEMPO]']),
      measure: dto['[Measures].[Movimientos migratorios (La Rioja)]'],
      ageGroup: getAgeGroup(dto['[EDAD GRUPOS QUINQUENALES]'])
    }
  })
}

export async function getEmigrationPerYear(): Promise<ChartData> {
  const emigrations = await getEmigrations()

  const years = [
    ...new Set(emigrations.map(wa => wa.year).sort((a, b) => a - b))
  ]

  const data = years.map(year => {
    const yearData = emigrations.filter(wa => wa.year === year)
    const total = yearData.find(wa => wa.destination === TotalKey)?.measure ?? 0
    return {
      year,
      Emigraciones: total
    }
  })

  return {
    index: 'year',
    categories: ['Emigraciones'],
    data
  }
}

export async function getEmigrationPerAgeGroup(): Promise<ChartData> {
  const emigrations = await getEmigrations()

  const emigrationWithoutTotal = emigrations.filter(
    wa => wa.ageGroup !== TotalKey
  )

  const ageGroups = [...new Set(emigrationWithoutTotal.map(wa => wa.ageGroup))]
  const years = [
    ...new Set(emigrationWithoutTotal.map(wa => wa.year).sort((a, b) => a - b))
  ]

  const data = years.map(year => {
    const emigrationsOfYear = emigrationWithoutTotal.filter(
      wa => wa.year === year
    )

    const groups = emigrationsOfYear.reduce((acc, emigration) => {
      const { ageGroup, measure } = emigration

      if (acc[ageGroup]) {
        acc[ageGroup] += measure
      } else {
        acc[ageGroup] = measure
      }
      return acc
    }, {})

    return {
      year,
      ...groups
    }
  })

  return {
    index: 'year',
    categories: ageGroups,
    data
  }
}

export async function getEmigrationPerDestination(): Promise<ChartData> {
  const emigrations = await getEmigrations()

  const emigrationWithoutTotal = emigrations.filter(
    wa => wa.destination !== TotalKey
  )
  const destinations = [
    ...new Set(emigrationWithoutTotal.map(wa => wa.destination))
  ]
  const years = [
    ...new Set(emigrationWithoutTotal.map(wa => wa.year).sort((a, b) => a - b))
  ]

  const data = years.map(year => {
    const emigrationsOfYear = emigrationWithoutTotal.filter(
      wa => wa.year === year && wa.ageGroup === TotalKey
    )

    const groups = emigrationsOfYear.reduce((acc, emigration) => {
      const { destination, measure } = emigration

      if (acc[destination]) {
        acc[destination] += measure
      } else {
        acc[destination] = measure
      }
      return acc
    }, {})

    return {
      year,
      ...groups
    }
  })

  return {
    index: 'year',
    categories: destinations,
    data
  }
}
