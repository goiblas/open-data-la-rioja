import { expect, test, afterEach, vi, describe } from 'vitest'
import database from './shared/database'
import { getEvolutionOfDeceases } from './mortality'

const dataBaseMocked = [
  {
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 15 a 19 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 55 a 59 años]': 1.0,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 70 a 74 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 45 a 49 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 60 a 64 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 35 a 39 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 35 a 39 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 80 a 84 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 25 a 29 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 25 a 29 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 80 a 84 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 70 a 74 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 55 a 59 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 15 a 19 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 60 a 64 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 45 a 49 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 0 a 4 años]':
      null,
    '[MUNICIPIO]': '[MUNICIPIO].[Ábalos]',
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 50 a 54 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 75 a 79 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 5 a 9 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 40 a 44 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 65 a 69 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 30 a 34 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 20 a 24 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 10 a 14 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 10 a 14 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 0 a 4 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 5 a 9 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 30 a 34 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[85 años o más]':
      null,
    '[AÑOS]': '[AÑOS].[2022]',
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[85 años o más]': 2.0,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 20 a 24 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 75 a 79 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 50 a 54 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 40 a 44 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 65 a 69 años]':
      null
  },
  {
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 15 a 19 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 55 a 59 años]': 2.0,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 70 a 74 años]': 1.0,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 45 a 49 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 60 a 64 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 35 a 39 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 35 a 39 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 80 a 84 años]': 5.0,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 25 a 29 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 25 a 29 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 80 a 84 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 70 a 74 años]': 3.0,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 55 a 59 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 15 a 19 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 60 a 64 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 45 a 49 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 0 a 4 años]':
      null,
    '[MUNICIPIO]': '[MUNICIPIO].[Agoncillo]',
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 50 a 54 años]': 1.0,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 75 a 79 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 5 a 9 años]': 1.0,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 40 a 44 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 65 a 69 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 30 a 34 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 20 a 24 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 10 a 14 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 10 a 14 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 0 a 4 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 5 a 9 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 30 a 34 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[85 años o más]': 4.0,
    '[AÑOS]': '[AÑOS].[2022]',
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[85 años o más]': 4.0,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 20 a 24 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 75 a 79 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 50 a 54 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 40 a 44 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 65 a 69 años]':
      null
  },
  {
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 15 a 19 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 55 a 59 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 70 a 74 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 45 a 49 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 60 a 64 años]': 1.0,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 35 a 39 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 35 a 39 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 80 a 84 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 25 a 29 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 25 a 29 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 80 a 84 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 70 a 74 años]': 1.0,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 55 a 59 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 15 a 19 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 60 a 64 años]': 2.0,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 45 a 49 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 0 a 4 años]':
      null,
    '[MUNICIPIO]': '[MUNICIPIO].[Aguilar del Río Alhama]',
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 50 a 54 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 75 a 79 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 5 a 9 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 40 a 44 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 65 a 69 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 30 a 34 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 20 a 24 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 10 a 14 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 10 a 14 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 0 a 4 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 5 a 9 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 30 a 34 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[85 años o más]': 3.0,
    '[AÑOS]': '[AÑOS].[2025]',
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[85 años o más]': 4.0,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 20 a 24 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 75 a 79 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 50 a 54 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 40 a 44 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 65 a 69 años]':
      null
  },
  {
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 15 a 19 años]': 1235,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 55 a 59 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 70 a 74 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 45 a 49 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 60 a 64 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 35 a 39 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 35 a 39 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 80 a 84 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 25 a 29 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 25 a 29 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 80 a 84 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 70 a 74 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 55 a 59 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 15 a 19 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 60 a 64 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 45 a 49 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 0 a 4 años]':
      null,
    '[MUNICIPIO]': '[MUNICIPIO].[Ajamil de Cameros]',
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 50 a 54 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 75 a 79 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 5 a 9 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 40 a 44 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 65 a 69 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 30 a 34 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 20 a 24 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 10 a 14 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 10 a 14 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 0 a 4 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 5 a 9 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 30 a 34 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[85 años o más]':
      null,
    '[AÑOS]': '[AÑOS].[2022]',
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[85 años o más]': 1.0,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 20 a 24 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 75 a 79 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 50 a 54 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Mujeres], [GRUPOS DE EDAD].[de 40 a 44 años]':
      null,
    '[Measures].[Defunciones], [SEXO].[Hombres], [GRUPOS DE EDAD].[de 65 a 69 años]':
      null
  }
]

describe('should return the data of the deceased by year order ASC', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should return the data of the deceased by year order ASC', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const expected = []

    databaseMock.mockResolvedValue(dataBaseMocked)
    const data = await getEvolutionOfDeceases()
    expect(data).toEqual(expected)
  })
})
