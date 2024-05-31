import CardExpanded from '@/components/ui/CardExpanded'
import IncomesPerCategoryClient from './IncomesPerCategoryClient'
import { getIncomesByCategory } from '@/lib/incomes'

export default async function IncomesPerCategory({
  originUrl
}: {
  originUrl?: string
}) {
  const { data } = await getIncomesByCategory()

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
      <IncomesPerCategoryClient data={formattedData} years={years} />
    </CardExpanded>
  )
}
