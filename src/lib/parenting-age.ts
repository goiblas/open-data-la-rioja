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
interface WomenAgeGroup {
  ageGroup: string
  amount: number
}

export interface ParentingAge {
  year: number
  municipality: string
  dad_age_group: string
  mom_age_group: WomenAgeGroup[]
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

function getMomAgeGroup (momAgeGroupDto: string): string {
  const momAgeGroup = momAgeGroupDto.split('.')[2]

  if (!momAgeGroup) {
    throw new Error(`Error getting age group from ${momAgeGroupDto}`)
  }

  const momAgeGroupText = momAgeGroup.replace('[', '').replace(']', '')
  return momAgeGroupText
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
    mom_age_group: Object.entries(parentingAge)
      .filter(([key]) => key.includes('[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE]'))
      .map(([key, amount]) => {
        return {
          ageGroup: getMomAgeGroup(key),
          amount
        }
      })
  }
}

export async function getBirthsPerYear () {
  const response = await database.get<ParentingAgeDto>(config.parenting_age.fileName)
  const parentingAges = response.map(mapDtoToParentingAge)
  const years = [...new Set(parentingAges.map(wa => wa.year).sort((a, b) => a - b))]

  const data = years.map(year => {
    const yearParentingAges = parentingAges.filter(d => d.year === year)

    const amountByYear = yearParentingAges.reduce((acc, d) => {
      return acc + d.mom_age_group.reduce((acc, ageGroup) => acc + ageGroup.amount, 0)
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

export async function getParentingPerAgeGroup () {
  const response = await database.get<ParentingAgeDto>(config.parenting_age.fileName)
  const parentingAges = response.map(mapDtoToParentingAge)
  const years = Array.from(new Set(parentingAges.map(d => d.year).sort((a, b) => a - b)))
  const manAgeGroups = Array.from(new Set(parentingAges.map(d => d.dad_age_group)))
  const womanAgeGroups = Array.from(new Set(parentingAges.map(d => d.mom_age_group.map(d => d.ageGroup)).flat()))

  const data = years.map(year => {
    const yearParentingAges = parentingAges.filter(d => d.year === year)
    const womanAmounts = womanAgeGroups.map(ageGroup => {
      const ageGroupAmount = yearParentingAges.reduce((acc, d) => {
        return acc + d.mom_age_group.reduce((acc, momAgeGroup) => {
          if (momAgeGroup.ageGroup === ageGroup) {
            return acc + momAgeGroup.amount
          }
          return acc
        }, 0)
      }
      , 0)
      return ageGroupAmount
    })
    const manAmounts = manAgeGroups.map(ageGroup => {
      const ageGroupAmount = yearParentingAges.reduce((acc, d) => {
        if (d.dad_age_group === ageGroup) {
          return acc + d.mom_age_group.reduce((acc, ageGroup) => acc + ageGroup.amount, 0)
        }
        return acc
      }, 0)
      return ageGroupAmount
    })

    return {
      year,
      ...Object.fromEntries(womanAgeGroups.map((c, i) => ['Mujeres ' + c, womanAmounts[i]]).filter(([, amount]) => amount !== 0)),
      ...Object.fromEntries(manAgeGroups.map((c, i) => ['Hombres ' + c, manAmounts[i]]).filter(([, amount]) => amount !== 0))
    }
  })
  return {
    index: 'year',
    categories: [...womanAgeGroups.map(ageGroup => 'Mujeres ' + ageGroup), ...manAgeGroups.map(ageGroup => 'Hombres ' + ageGroup)],
    data
  }
}
