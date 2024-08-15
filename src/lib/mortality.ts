import { config } from '@/config'
import database from './shared/database'

type NumberOrNull = number | null
interface MortalityDto {
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 0 a 4 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 5 a 9 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 10 a 14 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 15 a 19 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 20 a 24 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 25 a 29 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 30 a 34 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 35 a 39 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 40 a 44 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 45 a 49 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 50 a 54 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 55 a 59 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 60 a 64 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 65 a 69 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 70 a 74 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 75 a 79 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 80 a 84 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[85 años o más]': NumberOrNull
  '[AÑOS]': string
  '[MUNICIPIO]': string
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 0 a 4 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 5 a 9 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 10 a 14 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 15 a 19 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 20 a 24 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 25 a 29 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 30 a 34 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 35 a 39 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 40 a 44 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 45 a 49 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 50 a 54 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 55 a 59 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 60 a 64 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 65 a 69 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 70 a 74 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 75 a 79 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 80 a 84 años]': NumberOrNull
  '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[85 años o más]': NumberOrNull
}

interface stepYearsDto {
  AÑO?: string
  'de 0 a 4 años': number
  'de 5 a 9 años': number
  'de 10 a 14 años': number
  'de 15 a 19 años': number
  'de 20 a 24 años': number
  'de 25 a 29 años': number
  'de 30 a 34 años': number
  'de 35 a 39 años': number
  'de 40 a 44 años': number
  'de 45 a 49 años': number
  'de 50 a 54 años': number
  'de 55 a 59 años': number
  'de 60 a 64 años': number
  'de 65 a 69 años': number
  'de 70 a 74 años': number
  'de 75 a 79 años': number
  'de 80 a 84 años': number
  '85 años o más': number
}
const stepYears = {
  'de 0 a 4 años': 0,
  'de 5 a 9 años': 0,
  'de 10 a 14 años': 0,
  'de 15 a 19 años': 0,
  'de 20 a 24 años': 0,
  'de 25 a 29 años': 0,
  'de 30 a 34 años': 0,
  'de 35 a 39 años': 0,
  'de 40 a 44 años': 0,
  'de 45 a 49 años': 0,
  'de 50 a 54 años': 0,
  'de 55 a 59 años': 0,
  'de 60 a 64 años': 0,
  'de 65 a 69 años': 0,
  'de 70 a 74 años': 0,
  'de 75 a 79 años': 0,
  'de 80 a 84 años': 0,
  '85 años o más': 0
}

export async function getMortalityRawData(): Promise<MortalityDto[]> {
  const response = await database.get<MortalityDto>(config.mortality.fileName)
  return response
}

const getOrderByYear = (data: stepYearsDto[], type = 'ASC'): stepYearsDto[] => {
  const orderedData = data.map((object, index) => {
    const { AÑO, ...rest } = object
    const entries = Object.entries(rest)
    entries.sort((a, b) => {
      const rangoA = a[0].match(/\d+/g)
      const rangoB = b[0].match(/\d+/g)
      const valorA = rangoA ? parseInt(rangoA[0]) : Infinity
      const valorB = rangoB ? parseInt(rangoB[0]) : Infinity

      return type === 'ASC' ? valorA - valorB : valorA - valorB
    })
    return { AÑO, ...Object.fromEntries(entries) }
  })
  const orderDataByYear = orderedData.sort((a, b) => {
    return parseInt(a['AÑO']) - parseInt(b['AÑO'])
  })
  return orderDataByYear
}

export const getSetpYears = () => {
  return Object.keys(stepYears)
}

export const getEvolutionOfDeceases = async (
  orderBy: string = 'ASC'
): Promise<stepYearsDto[]> => {
  const dataset = await getMortalityRawData()
  const data = dataset.reduce(
    (acc: stepYearsDto[], obj: MortalityDto, index: number) => {
      const { '[MUNICIPIO]': MUNICIPIO, '[AÑOS]': AÑO, ...rest } = obj
      const clearYear = AÑO.split('.')[1].replace('[', '').replace(']', '')
      const cleanData = Object.keys(rest).reduce<Record<string, number>>(
        (acc, key) => {
          const cleanKey = key
            .split('.')[3]
            .replace('[', '')
            .replace(']', '')
            .trim()
          if (cleanKey in acc) {
            return {
              ...acc,
              ...{ [cleanKey]: acc[cleanKey] + (obj[cleanKey] || 0) }
            }
          }
          return { ...acc, ...{ [cleanKey]: rest[key] || 0 } }
        },
        {}
      )
      if (index === 0 || acc[acc.length - 1].AÑO !== clearYear) {
        const initData = {
          AÑO: clearYear,
          ...cleanData
        }
        return [...acc, initData]
      }

      Object.keys(rest).forEach((each, index) => {
        const cleanKey = each
          .split('.')[3]
          .replace('[', '')
          .replace(']', '')
          .trim()
        acc[acc.length - 1][cleanKey] += rest[each] || 0
      })
      return acc
    },
    []
  )

  return getOrderByYear(data, orderBy)
}

export const getGenreDeceasesForYears = async (): Promise<stepYearsDto[]> => {
  const dataset = await getMortalityRawData()
  const data = dataset.reduce(
    (acc: any[], obj: MortalityDto, index: number) => {
      const { MUJERES, HOMBRES } = Object.keys(obj).reduce(
        (acc, eachObject) => {
          if (eachObject.includes('Mujeres')) {
            acc.MUJERES += obj[eachObject] || 0
            acc[eachObject] = obj[eachObject]
          }
          if (eachObject.includes('Hombres')) {
            acc.HOMBRES += obj[eachObject] || 0
            acc[eachObject] = obj[eachObject]
          }
          return acc
        },
        { HOMBRES: 0, MUJERES: 0 }
      )
      if (index === 0) {
        const objResult = {
          AÑO: obj['[AÑOS]'],
          MUJERES,
          HOMBRES
        }
        return [...acc, objResult]
      }
      if (acc[acc.length - 1].AÑO === obj['[AÑOS]']) {
        acc[acc.length - 1].MUJERES += MUJERES
        acc[acc.length - 1].HOMBRES += HOMBRES
      } else {
        const initDataForOneYear = {
          AÑO: obj['[AÑOS]'],
          HOMBRES,
          MUJERES
        }
        return [...acc, initDataForOneYear]
      }
      return acc
    },
    []
  )
  return data
}
