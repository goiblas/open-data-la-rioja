import database from './shared/database'
import { getMonthFromTimeDto, getYearFromTimeDto } from './shared/utils'
import { MONTHS } from './shared/constants'
import { config } from '@/config'
import { type ChartData, type ChartDataPerYear } from '@/types'

const ALL_TYPES = '[TIPO DE COMBUSTIBLE].[Todas los combustibles]' as const
const FUEL_BIA = '[TIPO DE COMBUSTIBLE].[Fuelóleo BIA]' as const
const DEFAULT_TYPE = 'Gasolina' as const

interface FuelDto {
  '[Measures].[Var (%) en lo que va de año (La Rioja)]': number
  '[Measures].[Var (%) anual (La Rioja)]': number
  '[Measures].[Var (%) mensual (La Rioja)]': number
  '[TIPO DE COMBUSTIBLE]': string
  '[Measures].[Consumo en La Rioja (Toneladas)]': number
  '[TIEMPO]': string
}

interface Fuel {
  month: string
  year: number
  measure: number
}

type FuelWithType = Fuel & { type: string }

function getType (fuel: string): string {
  const type = fuel.split('.')[1]

  if (!type) {
    return DEFAULT_TYPE
  }

  return type.replace('[', '').replace(']', '').trim()
}

function getSpecificType (fuel: string): string {
  const typeArray = fuel.split('.')

  if (fuel === FUEL_BIA) {
    const type = typeArray[1]
    return type.replace('[', '').replace(']', '').trim()
  }

  const type = typeArray[2]
  return type.replace('[', '').replace(']', '').trim()
}

function isSpecificType (fuel: string): boolean {
  if (fuel === ALL_TYPES) {
    return false
  }

  if (fuel === FUEL_BIA) {
    return true
  }

  return fuel.split('.').length > 2
}

function isGeneralType (fuel: string): boolean {
  if (fuel === ALL_TYPES) {
    return false
  }

  return fuel.split('.').length === 2
}

async function getFuelsWithSpecificType (): Promise<FuelWithType[]> {
  const reponse = await database.get<FuelDto>(config.fuel.file)

  return reponse
    .filter(dto => isSpecificType(dto['[TIPO DE COMBUSTIBLE]']))
    .map(dto => {
      return {
        month: getMonthFromTimeDto(dto['[TIEMPO]']),
        year: getYearFromTimeDto(dto['[TIEMPO]']),
        measure: dto['[Measures].[Consumo en La Rioja (Toneladas)]'],
        type: getSpecificType(dto['[TIPO DE COMBUSTIBLE]'])
      }
    })
}

async function getFuelsWithType (): Promise<FuelWithType[]> {
  const reponse = await database.get<FuelDto>(config.fuel.file)

  return reponse
    .filter(dto => isGeneralType(dto['[TIPO DE COMBUSTIBLE]']))
    .map(dto => {
      return {
        month: getMonthFromTimeDto(dto['[TIEMPO]']),
        year: getYearFromTimeDto(dto['[TIEMPO]']),
        measure: dto['[Measures].[Consumo en La Rioja (Toneladas)]'],
        type: getType(dto['[TIPO DE COMBUSTIBLE]'])
      }
    })
}

async function getFuels (): Promise<Fuel[]> {
  const reponse = await database.get<FuelDto>(config.fuel.file)

  return reponse
    .filter(dto => isGeneralType(dto['[TIPO DE COMBUSTIBLE]']))
    .map(dto => {
      return {
        month: getMonthFromTimeDto(dto['[TIEMPO]']),
        year: getYearFromTimeDto(dto['[TIEMPO]']),
        measure: dto['[Measures].[Consumo en La Rioja (Toneladas)]']
      }
    })
}

export async function getFuelConsumptionPerType (): Promise<ChartData> {
  const fuels = await getFuelsWithType()

  const years = [...new Set(fuels.map(fuel => fuel.year))]
  const types = [...new Set(fuels.map(fuel => fuel.type))]
  const data = years.map(year => {
    const fuelsOfYear = fuels.filter(fuel => fuel.year === year)

    const groups = fuelsOfYear.reduce((acc, fuel) => {
      const { type, measure } = fuel

      if (acc[type]) {
        acc[type] += measure
      } else {
        acc[type] = measure
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
    categories: types,
    data
  }
}

export async function getFuelConsumptionTotalPerYear (): Promise<ChartData> {
  const fuels = await getFuels()

  const years = [...new Set(fuels.map(fuel => fuel.year))]
  const data = years.map(year => {
    const fuelsOfYear = fuels.filter(fuel => fuel.year === year)

    const total = fuelsOfYear.reduce((acc, fuel) => {
      acc += fuel.measure
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

export async function getFuelConsumptionPerSpecificType (): Promise<ChartData> {
  const fuels = await getFuelsWithSpecificType()

  const years = [...new Set(fuels.map(fuel => fuel.year))]
  const types = [...new Set(fuels.map(fuel => fuel.type))]
  const data = years.map(year => {
    const fuelsOfYear = fuels.filter(fuel => fuel.year === year)

    const groups = fuelsOfYear.reduce((acc, fuel) => {
      const { type, measure } = fuel

      if (acc[type]) {
        acc[type] += measure
      } else {
        acc[type] = measure
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
    categories: types,
    data
  }
}

export async function getFuelConsumptionPerMonth (): Promise<ChartDataPerYear> {
  const fuels = await getFuelsWithType()

  const years = [...new Set(fuels.map(fuel => fuel.year))]
  const types = [...new Set(fuels.map(fuel => fuel.type))]

  const data = years.reduce<any>((acc, year) => {
    const fuelsOfYear = fuels.filter(fuel => fuel.year === year)
    const data = MONTHS.map(month => {
      const fuelsOfMonth = fuelsOfYear.filter(fuel => fuel.month === month)
      const typesInMonth = [...new Set(fuelsOfMonth.map(fuel => fuel.type))]

      const measuresByType = typesInMonth.reduce((acc, type) => {
        const fuelsOfType = fuelsOfMonth.filter(fuel => fuel.type === type)

        const total = fuelsOfType.reduce((acc, fuel) => {
          acc += fuel.measure
          return acc
        }, 0)

        acc[type] = total
        return acc
      }, {})

      return {
        month,
        ...measuresByType
      }
    })

    return {
      ...acc,
      [year]: data
    }
  }, {})

  return {
    years,
    index: 'month',
    categories: types,
    data
  }
}
