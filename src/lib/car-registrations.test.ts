import { expect, test, afterEach, vi, describe } from 'vitest'
import { getCarRegistrations } from './car-registrations'
import database from './shared/database'

describe('getCarRegistrations', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test.skip('should get car registrations formatted', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const mockData = [
      {
        '[Measures].[Var (%) anual], [NUEVO / USADO].[Todos los vehículos]': -2.27576974564926,
        '[Measures].[Var (%) mensual], [NUEVO / USADO].[Vehículo nuevo]': null,
        '[Measures].[Var (%) anual], [NUEVO / USADO].[Vehículo usado]': 21.0526315789474,
        '[Measures].[Var (%) en lo que va de año], [NUEVO / USADO].[Vehículo nuevo]': -19.7251114413076,
        '[Measures].[Var (%) en lo que va de año], [NUEVO / USADO].[Vehículo usado]': -25.8495145631068,
        '[Measures].[Var (%) mensual], [NUEVO / USADO].[Vehículo usado]': null,
        '[Measures].[Var (%) mensual], [NUEVO / USADO].[Todos los vehículos]': null,
        '[Measures].[Matriculaciones en La Rioja], [NUEVO / USADO].[Todos los vehículos]': 730,
        '[Measures].[Matriculaciones en La Rioja], [NUEVO / USADO].[Vehículo nuevo]': 661,
        '[Measures].[Matriculaciones en La Rioja], [NUEVO / USADO].[Vehículo usado]': 69,
        '[Measures].[Var (%) anual], [NUEVO / USADO].[Vehículo nuevo]': -4.20289855072464,
        '[Measures].[Var (%) en lo que va de año], [NUEVO / USADO].[Todos los vehículos]': -20.2921348314607,
        '[TIEMPO]': '[TIEMPO].[2019].[Noviembre (2019)]'
      },
      {
        '[Measures].[Var (%) anual], [NUEVO / USADO].[Todos los vehículos]': 18.491921005386,
        '[Measures].[Var (%) mensual], [NUEVO / USADO].[Vehículo nuevo]': 10.90573012939,
        '[Measures].[Var (%) anual], [NUEVO / USADO].[Vehículo usado]': 71.4285714285714,
        '[Measures].[Var (%) en lo que va de año], [NUEVO / USADO].[Vehículo nuevo]': -13.6073601424544,
        '[Measures].[Var (%) en lo que va de año], [NUEVO / USADO].[Vehículo usado]': -22.4606580829757,
        '[Measures].[Var (%) mensual], [NUEVO / USADO].[Vehículo usado]': 11.1111111111111,
        '[Measures].[Var (%) mensual], [NUEVO / USADO].[Todos los vehículos]': 10.9243697478992,
        '[Measures].[Matriculaciones en La Rioja], [NUEVO / USADO].[Todos los vehículos]': 660,
        '[Measures].[Matriculaciones en La Rioja], [NUEVO / USADO].[Vehículo nuevo]': 600,
        '[Measures].[Matriculaciones en La Rioja], [NUEVO / USADO].[Vehículo usado]': 60,
        '[Measures].[Var (%) anual], [NUEVO / USADO].[Vehículo nuevo]': 14.9425287356322,
        '[Measures].[Var (%) en lo que va de año], [NUEVO / USADO].[Todos los vehículos]': -14.439365420812,
        '[TIEMPO]': '[TIEMPO].[2019].[Septiembre (2019)]'
      }
    ]

    const expected = [{
      year: 2019,
      month: 'Noviembre',
      'Vehículo nuevo': 661,
      'Vehículo usado': 69
    }, {
      year: 2019,
      month: 'Septiembre',
      'Vehículo nuevo': 600,
      'Vehículo usado': 60
    }]

    databaseMock.mockResolvedValue(mockData)

    const carRegistrations = await getCarRegistrations()

    expect(carRegistrations).toEqual(expected)
  })
})
