import { expect, test, afterEach, vi, describe } from 'vitest'
import database from './shared/database'
import { getYearsWithData, groupByYear, getCountMarriagesByGroups } from './marriage'

const exampleArray = [{
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 15 a 19 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 25 a 29 años]': 1.0,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 70 a 74 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[85 años o más]': null,
  '[GRUPOS DE EDAD PRIMER]': '[GRUPOS DE EDAD PRIMER].[de 30 a 34 años]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 50 a 54 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 75 a 79 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 60 a 64 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 30 a 34 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 55 a 59 años]': null,
  '[AÑOS]': '[AÑOS].[2020]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 40 a 44 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 65 a 69 años]': null,
  '[MUNICIPIO]': '[MUNICIPIO].[Agoncillo]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 35 a 39 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 80 a 84 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 20 a 24 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 45 a 49 años]': null
},
{
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 15 a 19 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 25 a 29 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 70 a 74 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[85 años o más]': null,
  '[GRUPOS DE EDAD PRIMER]': '[GRUPOS DE EDAD PRIMER].[de 35 a 39 años]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 50 a 54 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 75 a 79 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 60 a 64 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 30 a 34 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 55 a 59 años]': null,
  '[AÑOS]': '[AÑOS].[2021]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 40 a 44 años]': 1.0,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 65 a 69 años]': null,
  '[MUNICIPIO]': '[MUNICIPIO].[Agoncillo]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 35 a 39 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 80 a 84 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 20 a 24 años]': null,
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 45 a 49 años]': null
}]

describe('marriage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should return an array of years', () => {
    const expected = ['2020', '2021']

    const data = getYearsWithData(exampleArray)

    expect(data).toEqual(expected)
  })

  test('should return marriages grouped by year', async () => {
    const databaseMock = vi.spyOn(database, 'get')

    const expected = {
      2020: [
        {
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 15 a 19 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 25 a 29 años]': 1.0,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 70 a 74 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[85 años o más]': null,
          '[GRUPOS DE EDAD PRIMER]': '[GRUPOS DE EDAD PRIMER].[de 30 a 34 años]',
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 50 a 54 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 75 a 79 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 60 a 64 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 30 a 34 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 55 a 59 años]': null,
          '[AÑOS]': '[AÑOS].[2020]',
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 40 a 44 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 65 a 69 años]': null,
          '[MUNICIPIO]': '[MUNICIPIO].[Agoncillo]',
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 35 a 39 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 80 a 84 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 20 a 24 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 45 a 49 años]': null
        }],
      2021: [
        {
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 15 a 19 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 25 a 29 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 70 a 74 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[85 años o más]': null,
          '[GRUPOS DE EDAD PRIMER]': '[GRUPOS DE EDAD PRIMER].[de 35 a 39 años]',
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 50 a 54 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 75 a 79 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 60 a 64 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 30 a 34 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 55 a 59 años]': null,
          '[AÑOS]': '[AÑOS].[2021]',
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 40 a 44 años]': 1.0,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 65 a 69 años]': null,
          '[MUNICIPIO]': '[MUNICIPIO].[Agoncillo]',
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 35 a 39 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 80 a 84 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 20 a 24 años]': null,
          '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 45 a 49 años]': null
        }]
    }

    databaseMock.mockResolvedValue(exampleArray)

    const data = await groupByYear()

    expect(data).toEqual(expected)
  })

  test('should return marriages grouped by ages', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const expected = [
      {
        '85 años o más': 0,
        año: '2020',
        'de 15 a 19 años': 0,
        'de 20 a 24 años': 0,
        'de 25 a 29 años': 1,
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
        'de 80 a 84 años': 0
      },
      {
        '85 años o más': 0,
        año: '2021',
        'de 15 a 19 años': 0,
        'de 20 a 24 años': 0,
        'de 25 a 29 años': 0,
        'de 30 a 34 años': 0,
        'de 35 a 39 años': 0,
        'de 40 a 44 años': 1,
        'de 45 a 49 años': 0,
        'de 50 a 54 años': 0,
        'de 55 a 59 años': 0,
        'de 60 a 64 años': 0,
        'de 65 a 69 años': 0,
        'de 70 a 74 años': 0,
        'de 75 a 79 años': 0,
        'de 80 a 84 años': 0
      }]

    databaseMock.mockResolvedValue(exampleArray)
    const { cleanedData } = await getCountMarriagesByGroups()

    expect(cleanedData).toEqual(expected)
  })
})
