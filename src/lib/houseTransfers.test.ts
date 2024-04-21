import { expect, test, afterEach, vi, describe } from 'vitest'
import { getHouseTransfers } from './houseTransfers'
import database from './shared/database'

describe.skip('house transfers', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should get house transfers formatted', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const mockData = [
      {
        '[Measures].[Número de transmisiones (La Rioja)]': 56,
        '[Measures].[Var (%) en lo que va de año (La Rioja)]':
          -29.4227188081937,
        '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO]':
          '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO].[Compraventa].[Compraventa vivienda nueva]',
        '[Measures].[Var (%) anual (La Rioja)]': 19.1489361702128,
        '[Measures].[Var (%) mensual (La Rioja)]': -20,
        '[TIEMPO]': '[TIEMPO].[2023].[Julio (2023)]'
      },
      {
        '[Measures].[Número de transmisiones (La Rioja)]': 280,
        '[Measures].[Var (%) en lo que va de año (La Rioja)]':
          -16.4010882238632,
        '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO]':
          '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO].[Compraventa].[Compraventa vivienda usada]',
        '[Measures].[Var (%) anual (La Rioja)]': -14.3730886850153,
        '[Measures].[Var (%) mensual (La Rioja)]': 0.3584229390681,
        '[TIEMPO]': '[TIEMPO].[2023].[Julio (2023)]'
      }
    ]

    const expected = [
      {
        year: 2023,
        month: 'Julio',
        'Vivienda usada': 280,
        'Vivienda nueva': 56
      }
    ]

    databaseMock.mockResolvedValue(mockData)

    const houseTransfers = await getHouseTransfers()
    expect(houseTransfers).toEqual(expected)
  })

  test('should exclude unnecessary types ', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const mockData = [
      {
        '[Measures].[Número de transmisiones (La Rioja)]': 56,
        '[Measures].[Var (%) en lo que va de año (La Rioja)]':
          -29.4227188081937,
        '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO]':
          '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO].[Compraventa].[Compraventa vivienda nueva]',
        '[Measures].[Var (%) anual (La Rioja)]': 19.1489361702128,
        '[Measures].[Var (%) mensual (La Rioja)]': -20,
        '[TIEMPO]': '[TIEMPO].[2023].[Julio (2023)]'
      },
      {
        '[Measures].[Número de transmisiones (La Rioja)]': 280,
        '[Measures].[Var (%) en lo que va de año (La Rioja)]':
          -16.4010882238632,
        '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO]':
          '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO].[Compraventa].[Compraventa vivienda usada]',
        '[Measures].[Var (%) anual (La Rioja)]': -14.3730886850153,
        '[Measures].[Var (%) mensual (La Rioja)]': 0.3584229390681,
        '[TIEMPO]': '[TIEMPO].[2023].[Julio (2023)]'
      },
      {
        '[Measures].[Número de transmisiones (La Rioja)]': 12,
        '[Measures].[Var (%) en lo que va de año (La Rioja)]':
          -34.9693251533742,
        '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO]':
          '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO].[Donación]',
        '[Measures].[Var (%) anual (La Rioja)]': 33.3333333333333,
        '[Measures].[Var (%) mensual (La Rioja)]': -25,
        '[TIEMPO]': '[TIEMPO].[2023].[Julio (2023)]'
      }
    ]

    const expected = [
      {
        year: 2023,
        month: 'Julio',
        'Vivienda usada': 280,
        'Vivienda nueva': 56
      }
    ]

    databaseMock.mockResolvedValue(mockData)

    const houseTransfers = await getHouseTransfers()
    expect(houseTransfers).toEqual(expected)
  })

  test('should set 0 for missing values', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const mockData = [
      {
        '[Measures].[Número de transmisiones (La Rioja)]': 56,
        '[Measures].[Var (%) en lo que va de año (La Rioja)]':
          -29.4227188081937,
        '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO]':
          '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO].[Compraventa].[Compraventa vivienda nueva]',
        '[Measures].[Var (%) anual (La Rioja)]': 19.1489361702128,
        '[Measures].[Var (%) mensual (La Rioja)]': -20,
        '[TIEMPO]': '[TIEMPO].[2023].[Julio (2023)]'
      }
    ]

    const expected = [
      {
        year: 2023,
        month: 'Julio',
        'Vivienda usada': 0,
        'Vivienda nueva': 56
      }
    ]

    databaseMock.mockResolvedValue(mockData)

    const houseTransfers = await getHouseTransfers()
    expect(houseTransfers).toEqual(expected)
  })

  test('should get house transfers formatted with multiple periods', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const mockData = [
      {
        '[Measures].[Número de transmisiones (La Rioja)]': 56,
        '[Measures].[Var (%) en lo que va de año (La Rioja)]':
          -29.4227188081937,
        '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO]':
          '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO].[Compraventa].[Compraventa vivienda nueva]',
        '[Measures].[Var (%) anual (La Rioja)]': 19.1489361702128,
        '[Measures].[Var (%) mensual (La Rioja)]': -20,
        '[TIEMPO]': '[TIEMPO].[2023].[Julio (2023)]'
      },
      {
        '[Measures].[Número de transmisiones (La Rioja)]': 280,
        '[Measures].[Var (%) en lo que va de año (La Rioja)]':
          -16.4010882238632,
        '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO]':
          '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO].[Compraventa].[Compraventa vivienda usada]',
        '[Measures].[Var (%) anual (La Rioja)]': -14.3730886850153,
        '[Measures].[Var (%) mensual (La Rioja)]': 0.3584229390681,
        '[TIEMPO]': '[TIEMPO].[2023].[Agosto (2023)]'
      },
      {
        '[Measures].[Número de transmisiones (La Rioja)]': 12,
        '[Measures].[Var (%) en lo que va de año (La Rioja)]':
          -34.9693251533742,
        '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO]':
          '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO].[Compraventa].[Compraventa vivienda usada]',
        '[Measures].[Var (%) anual (La Rioja)]': 33.3333333333333,
        '[Measures].[Var (%) mensual (La Rioja)]': -25,
        '[TIEMPO]': '[TIEMPO].[2023].[Enero (2024)]'
      },
      {
        '[Measures].[Número de transmisiones (La Rioja)]': 16,
        '[Measures].[Var (%) en lo que va de año (La Rioja)]':
          -29.4227188081937,
        '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO]':
          '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO].[Compraventa].[Compraventa vivienda nueva]',
        '[Measures].[Var (%) anual (La Rioja)]': 19.1489361702128,
        '[Measures].[Var (%) mensual (La Rioja)]': -20,
        '[TIEMPO]': '[TIEMPO].[2023].[Enero (2024)]'
      }
    ]

    const expected = [
      {
        year: 2023,
        month: 'Julio',
        'Vivienda usada': 0,
        'Vivienda nueva': 56
      },
      {
        year: 2023,
        month: 'Agosto',
        'Vivienda usada': 280,
        'Vivienda nueva': 0
      },
      {
        year: 2024,
        month: 'Enero',
        'Vivienda usada': 12,
        'Vivienda nueva': 16
      }
    ]

    databaseMock.mockResolvedValue(mockData)

    const houseTransfers = await getHouseTransfers()
    expect(houseTransfers).toEqual(expected)
  })
})
