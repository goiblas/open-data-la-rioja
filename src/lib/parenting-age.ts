import { config } from '@/config'
import database from './shared/database'

interface ParentingAgeDto {
  '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 50 a 54 años]': number
  '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 40 a 44 años]': number
  '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 30 a 34 años]': number
  '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 55 a 59 años]': number
  '[GRUPOS DE EDAD PADRE]': string
  '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 20 a 24 años]': number
  '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 45 a 49 años]': number
  '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 10 a 14 años]': number
  '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 35 a 39 años]': number
  '[AÑOS]': string
  '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 25 a 29 años]': number
  '[MUNICIPIO]': string
  '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 15 a 19 años]': number
}
interface AgeGroup {
  10_14: number
  15_19: number
  20_24: number
  25_29: number
  30_34: number
  35_39: number
  40_44: number
  45_49: number
  50_54: number
  55_59: number
}

export interface ParentingAge {
  year: number
  municipality: string
  dad_age_group: string
  mom_age_group: AgeGroup
}

// "[GRUPOS DE EDAD PADRE].[de 50 a 54 años]" -> "de 50 a 54 años"

function getDadAgeGroup (dadAgeGroupDto: string): string {
  const dadAgeGroup = dadAgeGroupDto.split('.')[1]

  if (!dadAgeGroup) {
    throw new Error(`Error getting age group from ${dadAgeGroupDto}`)
  }

  const dadAgeGroupText = dadAgeGroup.replace('[', '').replace(']', '')
  return dadAgeGroupText
}

// "[AÑOS].[2020]"" -> 2020
function getYear (yearDto: string): number {
  const year = yearDto.split('.')[1]

  if (!year) {
    throw new Error(`Error getting year from ${yearDto}`)
  }
  const yearText = year.replace('[', '').replace(']', '')
  return parseInt(yearText)
}

// "[MUNICIPIO].[Agoncillo]"" -> "Agoncillo"
function getMunicipality (municipalityDto: string): string {
  const municipality = municipalityDto.split('.')[1]

  if (!municipality) {
    throw new Error(`Error getting municipality from ${municipalityDto}`)
  }
  const municipalityText = municipality.replace('[', '').replace(']', '')
  return municipalityText
}

function mapDtoToParentingAge (parentingAge: ParentingAgeDto): ParentingAge {
  return {
    year: getYear(parentingAge['[AÑOS]']),
    municipality: getMunicipality(parentingAge['[MUNICIPIO]']),
    dad_age_group: getDadAgeGroup(parentingAge['[GRUPOS DE EDAD PADRE]']),
    mom_age_group: {
      10_14: parentingAge['[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 10 a 14 años]'],
      15_19: parentingAge['[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 15 a 19 años]'],
      20_24: parentingAge['[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 20 a 24 años]'],
      25_29: parentingAge['[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 25 a 29 años]'],
      30_34: parentingAge['[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 30 a 34 años]'],
      35_39: parentingAge['[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 35 a 39 años]'],
      40_44: parentingAge['[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 40 a 44 años]'],
      45_49: parentingAge['[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 45 a 49 años]'],
      50_54: parentingAge['[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 50 a 54 años]'],
      55_59: parentingAge['[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 55 a 59 años]']
    }
  }
}

export async function getBirthsPerYear () {
  const response = await database.get<ParentingAgeDto>(config.parenting_age.fileName)
  const parentingAges = response.map(mapDtoToParentingAge)
  const years = [...new Set(parentingAges.map(wa => wa.year).sort((a, b) => a - b))]

  const data = years.map(year => {
    const yearParentingAges = parentingAges.filter(d => d.year === year)

    const amountByYear = yearParentingAges.reduce((acc, d) => {
      return acc + Object.values(d.mom_age_group).reduce((acc, ageGroup) => acc + ageGroup, 0)
    }, 0)

    return {
      year,
      Nacimientos: amountByYear
    }
  })
  return {
    index: 'year',
    categories: ['Nacimientos'],
    data
  }
}
