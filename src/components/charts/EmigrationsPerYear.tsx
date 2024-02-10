import { getEmigrationPerYear } from '@/lib/emigration'
import CardExpanded from '@/components/ui/CardExpanded'
import WorkAccidentsPerYearClient from './WorkAccidentsPerYearClient'
import { BarChart } from '@tremor/react'

export default async function EmigrationsPerYear ({ originUrl }: { originUrl?: string }) {
  const { index, data, categories } = await getEmigrationPerYear()

  return (
        <CardExpanded originUrl={originUrl}>
            <BarChart
                className='mt-6'
                data={data}
                index={index}
                categories={categories}
                showLegend={false}
            />
        </CardExpanded>
  )
}
