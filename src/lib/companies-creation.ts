import database from './shared/database'
import { config } from '@/config'
import { type ChartData } from '@/types'

const ALL_SOCIAL_TYPES = '[TIPO SOCIEDAD].[Tipo sociedad]'

interface CompanyCreatedDto {
  '[Measures].[Capital suscrito La Rioja]'?: number
  '[Measures].[Número de sociedades La Rioja]'?: number
  '[TIPO SOCIEDAD]': string
  '[TIEMPO]': string
  '[Measures].[Capital desembolsado La Rioja]': number
}

// [TIEMPO].[Septiembre (2023)]
function getTimeFormattedFromTimeDto(time: string): string {
  const rawTime = time.split('.')[1]

  const timeFormatted = rawTime
    .replace('(', '')
    .replace(')', '')
    .replace('[', '')
    .replace(']', '')

  return timeFormatted
}

export async function getCompaniesCreated(): Promise<ChartData> {
  const response = await database.get<CompanyCreatedDto>(
    config.companies_creation.fileName
  )

  const data = response
    .filter(dto => dto['[TIPO SOCIEDAD]'] === ALL_SOCIAL_TYPES)
    .map(dto => {
      return {
        time: getTimeFormattedFromTimeDto(dto['[TIEMPO]']),
        measure: dto['[Measures].[Número de sociedades La Rioja]']
      }
    })
    .reverse()

  return {
    data,
    index: 'time',
    categories: ['measure']
  }
}
