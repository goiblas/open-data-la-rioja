import { getIncomes } from '@/lib/incomes'
import { getExpenses } from '@/lib/expenses'
import CardExpanded from '@/components/ui/CardExpanded'
import ExpensesIncomesClient from './ExpensesIncomesClient'

export default async function ExpensesIncomes ({ originUrls }: { originUrls?: string[] }) {
  const { data: incomesData } = await getIncomes()
  const { data: dataExpenses } = await getExpenses()

  const expenseYears = dataExpenses.map(d => d.year)
  const incomeYears = incomesData.map(d => d.year)
  const years = Array.from(new Set([...expenseYears, ...incomeYears]))

  const data = years.map(year => {
    const expense = dataExpenses.find(d => d.year === year)
    const income = incomesData.find(d => d.year === year)

    return {
      Gastos: expense?.Gastos || 0,
      Ingresos: income?.Ingresos || 0,
      year
    }
  })

  return (
        <CardExpanded originUrls={originUrls}>
            <ExpensesIncomesClient
                data={data}
                index={'year'}
                categories={['Ingresos', 'Gastos']}
            />
        </CardExpanded>
  )
}
