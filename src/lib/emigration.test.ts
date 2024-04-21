/* eslint-disable no-useless-escape */
import { expect, test, afterEach, vi, describe } from 'vitest'
import { getEmigrations } from './emigration'
import database from './shared/database'

describe('getEmigration', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should return emigration', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const databaseDtos = [
      {
        '[SEXO]': '[SEXO].[Ambos sexos]',
        '[EDAD GRUPOS QUINQUENALES]':
          '[EDAD GRUPOS QUINQUENALES].[50 a 54 años]',
        '[PAÍS DE ORIGEN/DESTINO]':
          '[PAÍS DE ORIGEN/DESTINO].[América del Norte]',
        '[TIEMPO]': '[TIEMPO].[2008]',
        '[Measures].[Movimientos migratorios (La Rioja)]': 1.0
      },
      {
        '[SEXO]': '[SEXO].[Ambos sexos]',
        '[EDAD GRUPOS QUINQUENALES]': '[EDAD GRUPOS QUINQUENALES].[Total]',
        '[PAÍS DE ORIGEN/DESTINO]':
          '[PAÍS DE ORIGEN/DESTINO].[Centro América y Caribe]',
        '[TIEMPO]': '[TIEMPO].[2008]',
        '[Measures].[Movimientos migratorios (La Rioja)]': 6.0
      }
    ]

    const expected = [
      {
        year: 2008,
        ageGroup: '50 a 54 años',
        destination: 'América del Norte',
        measure: 1
      },
      {
        year: 2008,
        destination: 'Centro América y Caribe',
        measure: 6,
        ageGroup: 'Total'
      }
    ]

    databaseMock.mockResolvedValue(databaseDtos)

    const data = await getEmigrations()

    expect(data).toEqual(expected)
  })
})
