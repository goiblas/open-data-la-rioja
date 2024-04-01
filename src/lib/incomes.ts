import database from './shared/database'
import { config } from '@/config'
import { type ChartData } from '@/types'

interface IncomeDTO {
  MODIFICACION: number
  EJERCICIO: string
  ID_CONCEPTO: string
  ID_SUBCONCEPTO: string
  DESC_CONCEPTO: string
  DESC_SUBCONCEPTO?: string
  ID_CAPITULO: string
  DESC_CAPITULO: string
  DERECHOS_RECONOCIDOS_NETOS: number
  RECAUDACION_NETA: number
  DESC_ARTICULO: string
  PPTO_DEFINITIVO: number
  PPTO_INICIAL: number
  ID_ARTICULO: string
}

export interface Income {
  description: string
  category: string
  amount: number
  title: string
  id: string
  year: number
}

function mapDtoToIncome (income: IncomeDTO): Income {
  return {
    id: `${income.ID_CONCEPTO}-${income.ID_SUBCONCEPTO}`,
    category: income.DESC_CAPITULO,
    title: income.DESC_CONCEPTO,
    description: `${income.DESC_ARTICULO} - ${income.DESC_SUBCONCEPTO}`,
    amount: income.RECAUDACION_NETA,
    year: parseInt(income.EJERCICIO)
  }
}

export async function getIncomes (): Promise<ChartData> {
  const reponse = await database.get<IncomeDTO>(config.incomes.fileName)
  const incomes = reponse.map(mapDtoToIncome)

  const years = Array.from(new Set(incomes.map(d => d.year)))

  const data = years.map(year => {
    const yearIncomes = incomes.filter(d => d.year === year)
    const amount = yearIncomes.reduce((acc, d) => acc + d.amount, 0)
    return {
      Ingresos: amount,
      year
    }
  })

  return {
    index: 'year',
    categories: ['Ingresos'],
    data
  }
}

export async function getIncomesByCategory (): Promise<ChartData> {
  // TODO: Implement this function

  return {
    index: 'year',
    categories: [],
    data: []
  }
}
