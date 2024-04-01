import { expect, test, afterEach, vi, describe } from 'vitest'
import { getIncomes } from './incomes'
import database from './shared/database'

describe('incomes', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should get incomes formatted', async () => {
    const databaseMock = vi.spyOn(database, 'get')
    const databaseDtos = [{
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

    databaseMock.mockResolvedValue(databaseDtos)

    const { data, categories, index } = await getIncomes()

    expect(data).toEqual(expected)
    expect(categories).toEqual(['Ingresos'])
    expect(index).toEqual('year')
  })
})
