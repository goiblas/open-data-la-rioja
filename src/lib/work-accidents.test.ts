import { expect, test, afterEach, vi, describe } from 'vitest'
import { getWorkAccidentsPerYear } from './work-accidents'
import database from './shared/database'

describe('getWorkAccidentsPerYear', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should return work accidents per year', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const databaseDtos = [{
      '[CNAE_09]': '[CNAE_09].[AGRICULTURA]',
      '[GRADO DE LA LESIÓN]': '[GRADO DE LA LESIÓN].[TOTAL]',
      '[CICLO]': '[CICLO].[Enero-octubre 2020]',
      '[TIPO ACCIDENTE]': '[TIPO ACCIDENTE].[TOTAL]',
      '[Measures].[Accidentes]': 213.0
    }, {
      '[CNAE_09]': '[CNAE_09].[CONSTRUCCIÓN]',
      '[GRADO DE LA LESIÓN]': '[GRADO DE LA LESIÓN].[Grave]',
      '[CICLO]': '[CICLO].[Enero-septiembre 2020]',
      '[TIPO ACCIDENTE]': '[TIPO ACCIDENTE].[En centro habitual]',
      '[Measures].[Accidentes]': 4.0
    }, {
      '[CNAE_09]': '[CNAE_09].[SERVICIOS]',
      '[GRADO DE LA LESIÓN]': '[GRADO DE LA LESIÓN].[Grave]',
      '[CICLO]': '[CICLO].[Enero-septiembre 2020]',
      '[TIPO ACCIDENTE]': '[TIPO ACCIDENTE].[En centro habitual]',
      '[Measures].[Accidentes]': 3.0
    }, {
      '[CNAE_09]': '[CNAE_09].[AGRICULTURA].[A Agricultura, ganadería, silvicultura y pesca]',
      '[GRADO DE LA LESIÓN]': '[GRADO DE LA LESIÓN].[Grave]',
      '[CICLO]': '[CICLO].[Enero-septiembre 2020]',
      '[TIPO ACCIDENTE]': '[TIPO ACCIDENTE].[En centro habitual]',
      '[Measures].[Accidentes]': 4.0
    }, {
      '[CNAE_09]': '[CNAE_09].[INDUSTRIA].[C Industria manufacturera]',
      '[GRADO DE LA LESIÓN]': '[GRADO DE LA LESIÓN].[Grave]',
      '[CICLO]': '[CICLO].[Enero-septiembre 2020]',
      '[TIPO ACCIDENTE]': '[TIPO ACCIDENTE].[En centro habitual]',
      '[Measures].[Accidentes]': 8.0
    }, {
      '[CNAE_09]': '[CNAE_09].[CONSTRUCCIÓN].[F Construcción]',
      '[GRADO DE LA LESIÓN]': '[GRADO DE LA LESIÓN].[Grave]',
      '[CICLO]': '[CICLO].[Enero-septiembre 2020]',
      '[TIPO ACCIDENTE]': '[TIPO ACCIDENTE].[En centro habitual]',
      '[Measures].[Accidentes]': 4.0
    }]

    const expected = [{
      Grave: 23,
      year: 2020
    }]

    databaseMock.mockResolvedValue(databaseDtos)

    const { data } = await getWorkAccidentsPerYear()

    expect(data).toEqual(expected)
  })
})
