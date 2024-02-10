import { getEmigrationPerYear } from '@/lib/emigration'
import CardExpanded from '@/components/ui/CardExpanded'
import EmigrationsPerYearClient from './EmigrationsPerYearClient'

export default async function EmigrationsPerYear ({ originUrl }: { originUrl?: string }) {
  const { index, data, categories } = await getEmigrationPerYear()

  return (
        <CardExpanded originUrl={originUrl}>
            <EmigrationsPerYearClient
                data={data}
                index={index}
                categories={categories}
            />
        </CardExpanded>
  )
}
