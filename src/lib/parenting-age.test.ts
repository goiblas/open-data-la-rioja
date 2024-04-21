import { test, afterEach, describe, expect, vi } from 'vitest'
import { getBirthsPerYear, getParentingPerAgeGroup } from './parenting-age'
import database from './shared/database'

describe('parenting-age', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should return parenting age', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const mockData = [
      {
        '[AÑOS]': '[AÑOS].[2019]',
        '[MUNICIPIO]': '[MUNICIPIO].[Agoncillo]',
        '[GRUPOS DE EDAD PADRE]': '[GRUPOS DE EDAD PADRE].[de 50 a 54 años]',
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 10 a 14 años]': 2.0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 15 a 19 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 20 a 24 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 25 a 29 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 30 a 34 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 35 a 39 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 40 a 44 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 45 a 49 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 50 a 54 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 55 a 59 años]': 0
      },
      {
        '[AÑOS]': '[AÑOS].[2019]',
        '[MUNICIPIO]': '[MUNICIPIO].[Agoncillo]',
        '[GRUPOS DE EDAD PADRE]': '[GRUPOS DE EDAD PADRE].[de 55 a 59 años]',
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 10 a 14 años]': 3.0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 15 a 19 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 20 a 24 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 25 a 29 años]': 1.0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 30 a 34 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 35 a 39 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 40 a 44 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 45 a 49 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 50 a 54 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 55 a 59 años]': 0
      },
      {
        '[AÑOS]': '[AÑOS].[2020]',
        '[MUNICIPIO]': '[MUNICIPIO].[Agoncillo]',
        '[GRUPOS DE EDAD PADRE]': '[GRUPOS DE EDAD PADRE].[de 55 a 59 años]',
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 10 a 14 años]': 2.0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 15 a 19 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 20 a 24 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 25 a 29 años]': 1.0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 30 a 34 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 35 a 39 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 40 a 44 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 45 a 49 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 50 a 54 años]': 0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 55 a 59 años]': 0
      }
    ]
    const expected = {
      index: 'year',
      categories: ['Nacimientos'],
      data: [
        {
          year: 2019,
          Nacimientos: 6
        },
        {
          year: 2020,
          Nacimientos: 3
        }
      ]
    }
    databaseMock.mockResolvedValue(mockData)

    const result = await getBirthsPerYear()
    expect(result).toEqual(expected)
  })

  test('should return parenting age by gender and age', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const mockData = [
      {
        '[AÑOS]': '[AÑOS].[2019]',
        '[MUNICIPIO]': '[MUNICIPIO].[Agoncillo]',
        '[GRUPOS DE EDAD PADRE]': '[GRUPOS DE EDAD PADRE].[de 50 a 54 años]',
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 10 a 14 años]':
          null,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 15 a 19 años]':
          null,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 20 a 24 años]': 2.0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 25 a 29 años]':
          null,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 30 a 34 años]':
          null,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 35 a 39 años]':
          null,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 40 a 44 años]':
          null,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 45 a 49 años]':
          null,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 50 a 54 años]':
          null,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 55 a 59 años]':
          null
      },
      {
        '[AÑOS]': '[AÑOS].[2019]',
        '[MUNICIPIO]': '[MUNICIPIO].[Agoncillo]',
        '[GRUPOS DE EDAD PADRE]': '[GRUPOS DE EDAD PADRE].[de 55 a 59 años]',
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 10 a 14 años]':
          null,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 15 a 19 años]':
          null,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 20 a 24 años]':
          null,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 25 a 29 años]':
          null,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 30 a 34 años]': 3.0,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 35 a 39 años]':
          null,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 40 a 44 años]':
          null,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 45 a 49 años]':
          null,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 50 a 54 años]':
          null,
        '[Measures].[Nacimientos], [GRUPOS DE EDAD MADRE].[de 55 a 59 años]':
          null
      }
    ]
    const expected = {
      index: 'year',
      categories: [
        'Mujeres de 10 a 14 años',
        'Mujeres de 15 a 19 años',
        'Mujeres de 20 a 24 años',
        'Mujeres de 25 a 29 años',
        'Mujeres de 30 a 34 años',
        'Mujeres de 35 a 39 años',
        'Mujeres de 40 a 44 años',
        'Mujeres de 45 a 49 años',
        'Mujeres de 50 a 54 años',
        'Mujeres de 55 a 59 años',
        'Hombres de 50 a 54 años',
        'Hombres de 55 a 59 años'
      ],
      data: [
        {
          year: 2019,
          'Hombres de 50 a 54 años': 2,
          'Hombres de 55 a 59 años': 3,
          'Mujeres de 20 a 24 años': 2,
          'Mujeres de 30 a 34 años': 3
        }
      ]
    }
    databaseMock.mockResolvedValue(mockData)

    const result = await getParentingPerAgeGroup()
    expect(result).toEqual(expected)
  })
})
