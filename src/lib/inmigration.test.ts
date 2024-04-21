import { expect, test, afterEach, vi, describe } from 'vitest'
import { getInmigrationPerYear } from './inmigration'
import database from './shared/database'

describe('getInmigration', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should return inmigration until the current year', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const databaseDtos = [
      {
        '[Measures].[Movimientos migratorios]': 2570.0,
        '[SEXO]': '[SEXO].[Ambos sexos]',
        '[TIEMPO]': '[TIEMPO].[2013]',
        '[CCAA DE DESTINO]': '[CCAA DE DESTINO].[Total]'
      },
      {
        '[Measures].[Movimientos migratorios]': 186.0,
        '[SEXO]': '[SEXO].[Ambos sexos]',
        '[TIEMPO]': '[TIEMPO].[2015]',
        '[CCAA DE DESTINO]': '[CCAA DE DESTINO].[Total]'
      },
      {
        '[Measures].[Movimientos migratorios]': 200.0,
        '[SEXO]': '[SEXO].[Ambos sexos]',
        '[TIEMPO]': '[TIEMPO].[2040]',
        '[CCAA DE DESTINO]': '[CCAA DE DESTINO].[Total]'
      }
    ]

    const expected = [
      {
        Inmigración: 2570,
        year: 2013
      },
      {
        Inmigración: 186,
        year: 2015
      }
    ]

    databaseMock.mockResolvedValue(databaseDtos)

    const { data } = await getInmigrationPerYear()

    expect(data).toEqual(expected)
  })
})
