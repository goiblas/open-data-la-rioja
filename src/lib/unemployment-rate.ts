import database from './shared/database'
import { config } from '@/config'
import { type ChartData } from '@/types'
import { capitalize, round } from './shared/utils'

const GENERAL_AGE_GROUP = '[GRUPOS DE EDAD ].[Decenios]' as const
const RETIRED_AGE_GROUP = '[GRUPOS DE EDAD ].[de 65 y más años]' as const

interface UnemploymentDto {
  '[Measures].[Personas], [SEXO ].[Hombres]'?: number
  '[Measures].[Personas], [SEXO ].[Mujeres]'?: number
  '[Measures].[Personas], [SEXO ].[Ambos sexos]': number
  '[Measures].[Porcentaje por edad], [SEXO ].[Ambos sexos]': number
  '[CICLO]': string
  '[GRUPOS DE EDAD ]': string
  '[Measures].[Porcentaje por edad], [SEXO ].[Hombres]'?: number
  '[Measures].[Porcentaje por edad], [SEXO ].[Mujeres]'?: number
}

interface UnemploymentRateBySex {
  '[CICLO]': string
  '[Measures].[Tasa de paro], [SEXO].[Mujeres]': number
  '[Measures].[Tasa de empleo], [SEXO].[Ambos sexos]': number
  '[Measures].[Tasa de paro], [SEXO].[Hombres]': number
  '[Measures].[Tasa de actividad], [SEXO].[Hombres]': number
  '[Measures].[Tasa de paro], [SEXO].[Ambos sexos]': number
  '[Measures].[Tasa de actividad], [SEXO].[Ambos sexos]': number
  '[Measures].[Tasa de actividad], [SEXO].[Mujeres]': number
  '[Measures].[Tasa de empleo], [SEXO].[Hombres]': number
  '[Measures].[Tasa de empleo], [SEXO].[Mujeres]': number
}

interface UnemploymentRate {
  year: number
  men: number
  women: number
  ageGroup: string
  average: number
}

// "[GRUPOS DE EDAD ].[de 56 a 64 años]" -> "de 56 a 64 años"
function getAgeGroup (ageGroupDto: string): string {
  const ageGroup = ageGroupDto.split('.')[1]

  if (!ageGroup) {
    throw new Error(`Error getting age group from ${ageGroupDto}`)
  }

  return capitalize(ageGroup.replace('[', '').replace(']', ''))
}

// "[CICLO].[2022 (T. 1)]" -> 2022
function getYearFromCycle (cycle: string): number {
  const cyclePart = cycle.split(' ')[0]
  const yearRegex = /\d{4}/

  if (!yearRegex.test(cyclePart)) {
    throw new Error(`Error getting year from ${cycle}`)
  }

  const year = yearRegex.exec(cyclePart)[0]
  return Number(year)
}

async function getUnemploymentValues (): Promise<UnemploymentRate[]> {
  const reponse = await database.get<UnemploymentDto>(config.unemployment.file)

  return reponse
    .filter(dto => dto['[GRUPOS DE EDAD ]'] !== GENERAL_AGE_GROUP)
    .filter(dto => dto['[GRUPOS DE EDAD ]'] !== RETIRED_AGE_GROUP)
    .map(dto => {
      return {
        year: getYearFromCycle(dto['[CICLO]']),
        ageGroup: getAgeGroup(dto['[GRUPOS DE EDAD ]']),
        average: dto['[Measures].[Porcentaje por edad], [SEXO ].[Ambos sexos]'],
        men: dto['[Measures].[Porcentaje por edad], [SEXO ].[Hombres]'] ?? 0,
        women: dto['[Measures].[Porcentaje por edad], [SEXO ].[Mujeres]'] ?? 0
      }
    })
}

export async function getUnemploymentRateByAgeGroup (): Promise<ChartData> {
  const unemploymentRates = await getUnemploymentValues()
  const ageGroups = [...new Set(unemploymentRates.map(ur => ur.ageGroup))]

  // group by year
  const unemploymentRatesByYear = unemploymentRates.reduce((acc, ur) => {
    if (!acc[ur.year]) {
      acc[ur.year] = []
    }

    acc[ur.year].push(ur)

    return acc
  }, {})

  // calculate average
  const unemploymentRatesAverage = Object.keys(unemploymentRatesByYear).sort().map(year => {
    const unemploymentRates = unemploymentRatesByYear[Number(year)]

    const groupedByAgeGroup = unemploymentRates.reduce((acc, ur) => {
      if (!acc[ur.ageGroup]) {
        acc[ur.ageGroup] = []
      }

      acc[ur.ageGroup].push(ur)

      return acc
    }, {}) as Record<string, UnemploymentRate[]>

    const averageByAgeGroup = Object.keys(groupedByAgeGroup).reduce((acc, ageGroup) => {
      const ageGroupUnemploymentRates = groupedByAgeGroup[ageGroup]
      const length = ageGroupUnemploymentRates.length

      const average = round(ageGroupUnemploymentRates.reduce((acc, e) => acc + e.average, 0) / length)

      acc[ageGroup] = average

      return acc
    }, {})

    return {
      year: Number(year),
      ...averageByAgeGroup
    }
  })

  return {
    index: 'year',
    data: unemploymentRatesAverage,
    categories: ageGroups
  }
}

export async function getUnemploymentRateBySex (): Promise<ChartData> {
  const reponse = await database.get<UnemploymentRateBySex>(config.unemployment_by_sex.file)

  const unemploymentRates = reponse.map(ur => {
    return {
      year: getYearFromCycle(ur['[CICLO]']),
      Ambos: ur['[Measures].[Tasa de paro], [SEXO].[Ambos sexos]'],
      Hombres: ur['[Measures].[Tasa de paro], [SEXO].[Hombres]'],
      Mujeres: ur['[Measures].[Tasa de paro], [SEXO].[Mujeres]']
    }
  })

  const categories = Object.keys(unemploymentRates[0]).filter(key => key !== 'year')

  const groupedByYear = unemploymentRates.reduce((acc, ur) => {
    if (!acc[ur.year]) {
      acc[ur.year] = []
    }

    acc[ur.year].push(ur)

    return acc
  }, {})

  const data = Object.keys(groupedByYear).sort().map(year => {
    const unemploymentRates = groupedByYear[Number(year)]

    const averageByCatogory = categories.reduce((acc, category) => {
      const unemploymentOfYear = unemploymentRates.filter(ur => ur.year === Number(year))
      const length = unemploymentOfYear.length

      const average = round(unemploymentOfYear.reduce((acc, e) => acc + e[category], 0) / length)

      acc[category] = average

      return acc
    }, {})

    return {
      year: Number(year),
      ...averageByCatogory
    }
  })

  return {
    index: 'year',
    data,
    categories
  }
}
