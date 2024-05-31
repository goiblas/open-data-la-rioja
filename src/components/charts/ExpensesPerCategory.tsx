import { getExpensesByCategory } from '@/lib/expenses'
import CardExpanded from '@/components/ui/CardExpanded'
import ExpensesPerCategoryClient from './ExpensesPerCategoryClient'

export default async function ExpensesPerCategory({
  originUrl
}: {
  originUrl?: string
}) {
  const { data } = await getExpensesByCategory()

  const years = data.map(d => d.year)

  const formattedData = years.reduce((acc, year) => {
    const yearData = data.find(info => info.year === year)

    delete yearData.year

    return {
      ...acc,
      [year]: yearData
    }
  }, {})

  return (
    <CardExpanded originUrl={originUrl}>
      <ExpensesPerCategoryClient data={formattedData} years={years} />
    </CardExpanded>
  )
}
