import { getEmigrationPerYear } from '@/lib/emigration'
import CardExpanded from '@/components/ui/CardExpanded'
import WorkAccidentsPerYearClient from './WorkAccidentsPerYearClient'

export default async function EmigrationsPerYear ({ originUrl }: { originUrl?: string }) {
  const { index, data, categories } = await getEmigrationPerYear()

  return (
        <CardExpanded originUrl={originUrl}>
            <WorkAccidentsPerYearClient
                data={data}
                index={index}
                categories={categories}
            />
        </CardExpanded>
  )
}
