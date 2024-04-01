import { expect, test, afterEach, vi, describe } from 'vitest'
import { getIncomes, getIncomesByCategory } from './incomes'
import database from './shared/database'

describe('incomes', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should get incomes formatted', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const mockData = [{
      MODIFICACION: 0,
      EJERCICIO: '2001',
      ID_CONCEPTO: '1-0-2',
      ID_SUBCONCEPTO: '1-0-2-  ',
      DESC_CONCEPTO: 'Tramo Autonomico Del I.R.P.F.',
      DESC_SUBCONCEPTO: null,
      ID_CAPITULO: '1',
      DESC_CAPITULO: 'Impuestos Directos',
      DERECHOS_RECONOCIDOS_NETOS: 44522391.95,
      RECAUDACION_NETA: 44522391.95,
      DESC_ARTICULO: 'Sobre La Renta',
      PPTO_DEFINITIVO: 45325928.86,
      PPTO_INICIAL: 45325928.86,
      ID_ARTICULO: '1-0'
    }, {
      MODIFICACION: 0,
      EJERCICIO: '2001',
      ID_CONCEPTO: '1-1-0',
      ID_SUBCONCEPTO: '1-1-0-01',
      DESC_CONCEPTO: 'Impuesto General Sobre Sucesiones Y Donaciones',
      DESC_SUBCONCEPTO: 'Donaciones',
      ID_CAPITULO: '1',
      DESC_CAPITULO: 'Impuestos Directos',
      DERECHOS_RECONOCIDOS_NETOS: 1889871.95,
      RECAUDACION_NETA: 1699753.93,
      DESC_ARTICULO: 'Sobre El Capital',
      PPTO_DEFINITIVO: 13078023.39,
      PPTO_INICIAL: 13078023.39,
      ID_ARTICULO: '1-1'
    }, {
      MODIFICACION: 0,
      EJERCICIO: '2002',
      ID_CONCEPTO: '1-1-0',
      ID_SUBCONCEPTO: '1-1-0-01',
      DESC_CONCEPTO: 'Impuesto General Sobre Sucesiones Y Donaciones',
      DESC_SUBCONCEPTO: 'Donaciones',
      ID_CAPITULO: '1',
      DESC_CAPITULO: 'Impuestos Directos',
      DERECHOS_RECONOCIDOS_NETOS: 1889871.95,
      RECAUDACION_NETA: 200,
      DESC_ARTICULO: 'Sobre El Capital',
      PPTO_DEFINITIVO: 200,
      PPTO_INICIAL: 200,
      ID_ARTICULO: '1-1'
    }]

    const expected = [{
      year: 2001,
      Ingresos: 46222145.88
    }, {
      year: 2002,
      Ingresos: 200
    }]

    databaseMock.mockResolvedValue(mockData)

    const { data, categories, index } = await getIncomes()

    expect(data).toEqual(expected)
    expect(categories).toEqual(['Ingresos'])
    expect(index).toEqual('year')
  })

  test('should get incomes by category formatted', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const mockData = [{
      MODIFICACION: 0,
      EJERCICIO: '2001',
      ID_CONCEPTO: '1-0-2',
      ID_SUBCONCEPTO: '1-0-2-  ',
      DESC_CONCEPTO: 'Tramo Autonomico Del I.R.P.F.',
      DESC_SUBCONCEPTO: null,
      ID_CAPITULO: '1',
      DESC_CAPITULO: 'Impuestos Directos',
      DERECHOS_RECONOCIDOS_NETOS: 44522391.95,
      RECAUDACION_NETA: 44522391.95,
      DESC_ARTICULO: 'Sobre La Renta',
      PPTO_DEFINITIVO: 45325928.86,
      PPTO_INICIAL: 45325928.86,
      ID_ARTICULO: '1-0'
    }, {
      MODIFICACION: 0,
      EJERCICIO: '2001',
      ID_CONCEPTO: '1-1-0',
      ID_SUBCONCEPTO: '1-1-0-01',
      DESC_CONCEPTO: 'Impuesto General Sobre Sucesiones Y Donaciones',
      DESC_SUBCONCEPTO: 'Donaciones',
      ID_CAPITULO: '1',
      DESC_CAPITULO: 'Impuestos Directos',
      DERECHOS_RECONOCIDOS_NETOS: 1889871.95,
      RECAUDACION_NETA: 1699753.93,
      DESC_ARTICULO: 'Sobre El Capital',
      PPTO_DEFINITIVO: 13078023.39,
      PPTO_INICIAL: 13078023.39,
      ID_ARTICULO: '1-1'
    }, {
      MODIFICACION: 0,
      EJERCICIO: '2001',
      ID_CONCEPTO: '1-1-0',
      ID_SUBCONCEPTO: '1-1-0-01',
      DESC_CONCEPTO: 'Impuesto General Sobre Sucesiones Y Donaciones',
      DESC_SUBCONCEPTO: 'Donaciones',
      ID_CAPITULO: '1',
      DESC_CAPITULO: 'Tasas Y Otros Ingresos.',
      DERECHOS_RECONOCIDOS_NETOS: 1889871.95,
      RECAUDACION_NETA: 300,
      DESC_ARTICULO: 'Sobre El Capital',
      PPTO_DEFINITIVO: 300,
      PPTO_INICIAL: 300,
      ID_ARTICULO: '1-1'
    }, {
      MODIFICACION: 0,
      EJERCICIO: '2002',
      ID_CONCEPTO: '1-1-0',
      ID_SUBCONCEPTO: '1-1-0-01',
      DESC_CONCEPTO: 'Impuesto General Sobre Sucesiones Y Donaciones',
      DESC_SUBCONCEPTO: 'Donaciones',
      ID_CAPITULO: '1',
      DESC_CAPITULO: 'Tasas Y Otros Ingresos.',
      DERECHOS_RECONOCIDOS_NETOS: 1889871.95,
      RECAUDACION_NETA: 200,
      DESC_ARTICULO: 'Sobre El Capital',
      PPTO_DEFINITIVO: 200,
      PPTO_INICIAL: 200,
      ID_ARTICULO: '1-1'
    }]

    const expected = [{
      year: 2001,
      'Impuestos Directos': 46222145.88,
      'Tasas Y Otros Ingresos.': 300
    }, {
      year: 2002,
      'Tasas Y Otros Ingresos.': 200
    }]

    databaseMock.mockResolvedValue(mockData)

    const { data, categories, index } = await getIncomesByCategory()

    expect(data).toEqual(expected)
    expect(categories).toEqual(['Impuestos Directos', 'Tasas Y Otros Ingresos.'])
    expect(index).toEqual('year')
  })
})
