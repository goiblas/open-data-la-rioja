import database from './shared/database'
import { config } from '@/config'
import { type ChartData } from '@/types'
import { capitalize } from './shared/utils'

const TOTAL_INJURIES = 'TOTAL' as const
const MINOR_INJURIES = 'Leve' as const

export interface WorkAccidentDto {
  '[CNAE_09]': string
  '[GRADO DE LA LESIÓN]': string
  '[CICLO]': string
  '[TIPO ACCIDENTE]': string
  '[Measures].[Accidentes]': number
}

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

// "[CNAE_09].[CONSTRUCCIÓN]" -> "Construcción"
// "[CNAE_09].[AGRICULTURA].[A Agricultura, ganadería, silvicultura y pesca]" -> "Agricultura"
function getSector (cnae: string): string {
  const match = cnae.split('.')[1]

  if (!match) {
    throw new Error(`Invalid cnae ${cnae}`)
  }

  const sectorText = match.replace('[', '').replace(']', '')
  return capitalize(sectorText.toLowerCase())
}

async function getWorkAccidents () {
  const databaseDtos = await database.get<WorkAccidentDto>(config.work_accidents.fileName)

  const workAccidents = databaseDtos
    .map(dto => ({
      year: getYear(dto['[CICLO]']),
      amount: dto['[Measures].[Accidentes]'],
      injury: getInjury(dto['[GRADO DE LA LESIÓN]']),
      sector: getSector(dto['[CNAE_09]'])
    }))
    .filter(wa => wa.injury !== TOTAL_INJURIES)

  return workAccidents
}

export async function getWorkAccidentsPerYear (): Promise<ChartData> {
  const allWorkAccidents = await getWorkAccidents()

  const workAccidents = allWorkAccidents.filter(wa => wa.injury !== TOTAL_INJURIES)

  const years = [...new Set(workAccidents.map(wa => wa.year).sort((a, b) => a - b))]
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

export async function getWorkAccidentsSeriousPerSector (): Promise<ChartData> {
  const allWorkAccidents = await getWorkAccidents()

  const workAccidents = allWorkAccidents
    .filter(wa => wa.injury !== TOTAL_INJURIES)
    .filter(wa => wa.injury !== MINOR_INJURIES)

  const years = [...new Set(workAccidents.map(wa => wa.year).sort((a, b) => a - b))]
  const sectors = [...new Set(workAccidents.map(wa => wa.sector))]

  const data = years.map(year => {
    const workAccidentsOfYear = workAccidents.filter(wa => wa.year === year)

    const groups = workAccidentsOfYear.reduce((acc, workAccident) => {
      const { sector, amount } = workAccident

      if (acc[sector]) {
        acc[sector] += amount
      } else {
        acc[sector] = amount
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
    categories: sectors
  }
}
