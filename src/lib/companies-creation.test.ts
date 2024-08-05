import { expect, test, afterEach, vi, describe } from 'vitest'
import { getCompaniesCreated } from './companies-creation'
import database from './shared/database'

describe('getCompanyCreated', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should return total com', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const databaseDtos = [
      {
        '[Measures].[Capital suscrito La Rioja]': 144,
        '[Measures].[Número de sociedades La Rioja]': 28,
        '[TIPO SOCIEDAD]': '[TIPO SOCIEDAD].[Sociedad limitada]',
        '[TIEMPO]': '[TIEMPO].[Agosto (2023)]',
        '[Measures].[Capital desembolsado La Rioja]': 144
      },
      {
        '[Measures].[Capital suscrito La Rioja]': 272,
        '[Measures].[Número de sociedades La Rioja]': 25,
        '[TIPO SOCIEDAD]': '[TIPO SOCIEDAD].[Tipo sociedad]',
        '[TIEMPO]': '[TIEMPO].[Julio (2023)]',
        '[Measures].[Capital desembolsado La Rioja]': 272
      },
      {
        '[Measures].[Capital suscrito La Rioja]': 272,
        '[Measures].[Número de sociedades La Rioja]': 25,
        '[TIPO SOCIEDAD]': '[TIPO SOCIEDAD].[Sociedad limitada]',
        '[TIEMPO]': '[TIEMPO].[Julio (2023)]',
        '[Measures].[Capital desembolsado La Rioja]': 272
      },
      {
        '[Measures].[Capital suscrito La Rioja]': 587,
        '[Measures].[Número de sociedades La Rioja]': 37,
        '[TIPO SOCIEDAD]': '[TIPO SOCIEDAD].[Tipo sociedad]',
        '[TIEMPO]': '[TIEMPO].[Junio (2023)]',
        '[Measures].[Capital desembolsado La Rioja]': 587
      }
    ]

    const expected = [
      {
        measure: 37,
        time: 'Junio 2023'
      },
      {
        measure: 25,
        time: 'Julio 2023'
      }
    ]

    databaseMock.mockResolvedValue(databaseDtos)

    const { data, index, categories } = await getCompaniesCreated()

    expect(data).toEqual(expected)
    expect(index).toEqual('time')
    expect(categories).toEqual(['measure'])
  })
})
