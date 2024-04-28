import { expect, test, afterEach, vi, describe } from 'vitest'
import { getExpenses, getExpensesByCategory } from './expenses'
import database from './shared/database'

describe('expenses', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should get expenses formatted', async () => {
    const databaseMock = vi.spyOn(database, 'get')

    const mockData = [
      {
        ID_FUNCIONAL_1: '1',
        ID_FUNCIONAL_2: '0',
        ID_FUNCIONAL_3: '0',
        ID_FUNCIONAL_4: '0',
        DESC_ORGANICO_1: 'Gastos Generales',
        DESC_ECONOMICO_1: 'Gastos Corrientes',
        DESC_ECONOMICO_2: 'Gastos De Personal',
        DESC_ECONOMICO_3: 'Personal Funcionario',
        DESC_ECONOMICO_4: 'Personal Funcionario',
        PAGOS_NETOS: 120.88,
        EJERCICIO: '2001'
      },
      {
        ID_FUNCIONAL_1: '2',
        ID_FUNCIONAL_2: '0',
        ID_FUNCIONAL_3: '0',
        ID_FUNCIONAL_4: '0',
        DESC_ORGANICO_1: 'Gastos Generales',
        DESC_ECONOMICO_1: 'Gastos Corrientes',
        DESC_ECONOMICO_2: 'Gastos De Personal',
        DESC_ECONOMICO_3: 'Personal Funcionario',
        DESC_ECONOMICO_4: 'Personal Funcionario',
        PAGOS_NETOS: 11,
        EJERCICIO: '2001'
      },
      {
        ID_FUNCIONAL_1: '2',
        ID_FUNCIONAL_2: '1',
        ID_FUNCIONAL_3: '0',
        ID_FUNCIONAL_4: '0',
        DESC_ORGANICO_1: 'Gastos Generales',
        DESC_ECONOMICO_1: 'Gastos Corrientes',
        DESC_ECONOMICO_2: 'Gastos De Personal',
        DESC_ECONOMICO_3: 'Personal Funcionario',
        DESC_ECONOMICO_4: 'Personal Funcionario',
        PAGOS_NETOS: 200,
        EJERCICIO: '2002'
      }
    ]

    const expected = [
      {
        year: 2001,
        Gastos: 131.88
      },
      {
        year: 2002,
        Gastos: 200
      }
    ]

    databaseMock.mockResolvedValue(mockData)

    const { data, categories, index } = await getExpenses()

    expect(data).toEqual(expected)
    expect(categories).toEqual(['Gastos'])
    expect(index).toEqual('year')
  })

  test('should get expenses by category formatted', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const mockData = [
      {
        ID_FUNCIONAL_1: '1',
        ID_FUNCIONAL_2: '0',
        ID_FUNCIONAL_3: '0',
        ID_FUNCIONAL_4: '0',
        DESC_ORGANICO_1: 'Gastos Generales',
        DESC_ECONOMICO_1: 'Gastos Corrientes',
        DESC_ECONOMICO_2: 'Gastos De Personal',
        DESC_ECONOMICO_3: 'Personal Funcionario',
        DESC_ECONOMICO_4: 'Personal Funcionario',
        PAGOS_NETOS: 120.88,
        EJERCICIO: '2001'
      },
      {
        ID_FUNCIONAL_1: '2',
        ID_FUNCIONAL_2: '0',
        ID_FUNCIONAL_3: '0',
        ID_FUNCIONAL_4: '0',
        DESC_ORGANICO_1: 'Gastos Generales',
        DESC_ECONOMICO_1: 'Gastos Corrientes',
        DESC_ECONOMICO_2: 'Gastos De Personal',
        DESC_ECONOMICO_3: 'Personal Funcionario',
        DESC_ECONOMICO_4: 'Personal Funcionario',
        PAGOS_NETOS: 11,
        EJERCICIO: '2001'
      },
      {
        ID_FUNCIONAL_1: '3',
        ID_FUNCIONAL_2: '0',
        ID_FUNCIONAL_3: '0',
        ID_FUNCIONAL_4: '0',
        DESC_ORGANICO_1: 'Servicio Riojano De Salud',
        DESC_ECONOMICO_1: 'Gastos Corrientes',
        DESC_ECONOMICO_2: 'Gastos De Personal',
        DESC_ECONOMICO_3: 'Personal Funcionario',
        DESC_ECONOMICO_4: 'Personal Funcionario',
        PAGOS_NETOS: 120,
        EJERCICIO: '2001'
      },
      {
        ID_FUNCIONAL_1: '2',
        ID_FUNCIONAL_2: '1',
        ID_FUNCIONAL_3: '0',
        ID_FUNCIONAL_4: '0',
        DESC_ORGANICO_1: 'Gastos Generales',
        DESC_ECONOMICO_1: 'Gastos Corrientes',
        DESC_ECONOMICO_2: 'Gastos De Personal',
        DESC_ECONOMICO_3: 'Personal Funcionario',
        DESC_ECONOMICO_4: 'Personal Funcionario',
        PAGOS_NETOS: 200,
        EJERCICIO: '2002'
      }
    ]

    const expected = [
      {
        year: 2001,
        'Gastos Generales': 131.88,
        'Servicio Riojano De Salud': 120
      },
      {
        year: 2002,
        'Gastos Generales': 200
      }
    ]

    databaseMock.mockResolvedValue(mockData)

    const { data, categories, index } = await getExpensesByCategory()

    expect(data).toEqual(expected)
    expect(categories).toEqual([
      'Gastos Generales',
      'Servicio Riojano De Salud'
    ])
    expect(index).toEqual('year')
  })
})
