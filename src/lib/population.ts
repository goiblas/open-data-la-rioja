import database from './shared/database'
import { config } from '@/config'
import { getYearFromTimeDto } from './shared/utils'
import { type ChartData } from '@/types'

interface PopulationByAgeDto {
  '[COMARCA AGRARIA]': string
  '[AÑOS]': string
  '[Measures].[Habitante], [SEXO].[Mujeres]': number
  '[EDAD]': string
  '[Measures].[Habitante], [SEXO].[Hombres]': number
  '[Measures].[Habitante], [SEXO].[Sexos]': number
}

interface PopulationDto {
  '[AÑOS]': string
  '[SECCIÓN CENSAL]': string
  '[Measures].[Habitante]': number
}

const TOTAL_DISTRICT = '[SECCIÓN CENSAL].[Distrito - Sección]' as const
const CAPITAL_DISTRICT = '[SECCIÓN CENSAL].[Logroño]' as const

export interface PopulationByAge {
  year: number
  men: number
  women: number
  ageGroup: string
  total: number
}

export interface Population {
  year: number
  measure: number
  district: string
}

// "[EDAD].[de 0 a 4 años]" -> "de 0 a 4 años"
// "[EDAD].[Edades]" -> "all"
function getAgeGroup (ageGroupDto: string): string {
  const ageGroup = ageGroupDto.split('.')[1]

  if (!ageGroup) {
    throw new Error(`Error getting age group from ${ageGroupDto}`)
  }

  const ageGroupText = ageGroup.replace('[', '').replace(']', '')
  return ageGroupText === 'Edades' ? 'all' : ageGroupText
}

export async function getPopulationByAge (): Promise<PopulationByAge[]> {
  const reponse = await database.get<PopulationByAgeDto>(config.population.fileName)

  return reponse
    .map(dto => {
      return {
        year: getYearFromTimeDto(dto['[AÑOS]']),
        ageGroup: getAgeGroup(dto['[EDAD]']),
        men: dto['[Measures].[Habitante], [SEXO].[Hombres]'],
        women: dto['[Measures].[Habitante], [SEXO].[Mujeres]'],
        total: dto['[Measures].[Habitante], [SEXO].[Sexos]']
      }
    })
}

async function getPopulation (): Promise<Population[]> {
  const reponse = await database.get<PopulationDto>(config.population.fileName)

  return reponse.map(dto => {
    return {
      year: getYearFromTimeDto(dto['[AÑOS]']),
      measure: dto['[Measures].[Habitante]'],
      district: dto['[SECCIÓN CENSAL]']
    }
  })
}

export async function getPopulationTotalPerYear (): Promise<ChartData> {
  const population = await getPopulation()

  const years = [...new Set(population.map(p => p.year).sort((a, b) => a - b))]

  const data = years.map(year => {
    const populationOfYear = population.filter(p => p.year === year)
    const totalDistrict = populationOfYear.find(p => p.district === TOTAL_DISTRICT)
    const capital = populationOfYear.find(p => p.district === CAPITAL_DISTRICT)

    return {
      year,
      'La Rioja': totalDistrict?.measure,
      Logroño: capital?.measure
    }
  })

  return {
    index: 'year',
    categories: ['La Rioja', 'Logroño'],
    data
  }
}
