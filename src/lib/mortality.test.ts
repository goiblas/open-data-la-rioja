import { expect, test, afterEach, vi, describe } from 'vitest'
import database from './shared/database'
import { getEvolutionOfDeceases, getGenreDeceasesForYears } from './mortality'

const dataBaseMocked = [
  {
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 0 a 4 años]': 25.0,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 5 a 9 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 10 a 14 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 15 a 19 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 20 a 24 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 25 a 29 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 30 a 34 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 35 a 39 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 40 a 44 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 45 a 49 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 50 a 54 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 55 a 59 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 60 a 64 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 65 a 69 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 70 a 74 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 75 a 79 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 80 a 84 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[85 años o más]':
      null,
    '[MUNICIPIO]': '[MUNICIPIO].[Ábalos]',
    '[AÑOS]': '[AÑOS].[2016]',
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 0 a 4 años]': 12,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 5 a 9 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 10 a 14 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 15 a 19 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 20 a 24 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 25 a 29 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 30 a 34 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 35 a 39 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 40 a 44 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 45 a 49 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 50 a 54 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 55 a 59 años]': 3.0,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 60 a 64 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 65 a 69 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 70 a 74 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 75 a 79 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 80 a 84 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[85 años o más]': 2.0
  },
  {
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 0 a 4 años]':
      '',
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 5 a 9 años]': 1.0,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 10 a 14 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 15 a 19 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 20 a 24 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 25 a 29 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 30 a 34 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 35 a 39 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 40 a 44 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 45 a 49 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 50 a 54 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 55 a 59 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 60 a 64 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 65 a 69 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 70 a 74 años]': 1.0,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 75 a 79 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 80 a 84 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[85 años o más]': 4.0,
    '[MUNICIPIO]': '[MUNICIPIO].[Agoncillo]',
    '[AÑOS]': '[AÑOS].[2017]',
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 0 a 4 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 5 a 9 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 10 a 14 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 15 a 19 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 20 a 24 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 25 a 29 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 30 a 34 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 35 a 39 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 40 a 44 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 45 a 49 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 50 a 54 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 55 a 59 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 60 a 64 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 65 a 69 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 70 a 74 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 75 a 79 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 80 a 84 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[85 años o más]': 1.0
  }
]

describe('should return the data of the deceased by year order ASC', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should return the data of the deceased by year order ASC', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const expectedData = [
      {
        AÑO: '2016',
        'de 0 a 4 años': 37,
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
        'de 55 a 59 años': 3,
        'de 60 a 64 años': 0,
        'de 65 a 69 años': 0,
        'de 70 a 74 años': 0,
        'de 75 a 79 años': 0,
        'de 80 a 84 años': 0,
        '85 años o más': 2
      },
      {
        AÑO: '2017',
        'de 0 a 4 años': 0,
        'de 5 a 9 años': 1,
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
        'de 70 a 74 años': 1,
        'de 75 a 79 años': 0,
        'de 80 a 84 años': 0,
        '85 años o más': 5
      }
    ]
    databaseMock.mockResolvedValue(dataBaseMocked)
    const data = await getEvolutionOfDeceases()
    expect(data).toEqual(expectedData)
  })
})

describe('should return the data of the deceased by GENRES order ASC', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should return the data of the deceased by year order ASC', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const expectedData = [
      {
        AÑO: '2016',
        MUJERES: 25,
        HOMBRES: 17
      },
      {
        AÑO: '2017',
        MUJERES: 6,
        HOMBRES: 1
      }
    ]
    databaseMock.mockResolvedValue(dataBaseMocked)
    const data = await getGenreDeceasesForYears()
    expect(data).toEqual(expectedData)
  })
})
