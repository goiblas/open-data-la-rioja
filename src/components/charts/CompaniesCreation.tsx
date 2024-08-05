import { getCompaniesCreated } from '@/lib/companies-creation'
import CardExpanded from '@/components/ui/CardExpanded'
import { BarChart } from '@tremor/react'

export default async function CompaniesCreation({
  originUrl
}: {
  originUrl?: string
}) {
  const { data, index, categories } = await getCompaniesCreated()

  return (
    <CardExpanded originUrl={originUrl}>
      <BarChart
        className="mt-6"
        data={data}
        index={index}
        categories={categories}
        showLegend={false}
        yAxisWidth={40}
      />
    </CardExpanded>
  )
}
