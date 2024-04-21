import { getEmigrationPerDestination } from '@/lib/emigration'
import CardExpanded from '@/components/ui/CardExpanded'
import EmigrationsPerDestinationClient from './EmigrationsPerDestinationClient'

export default async function EmigrationsPerDestination({
  originUrl
}: {
  originUrl?: string
}) {
  const { index, data, categories } = await getEmigrationPerDestination()

  return (
    <CardExpanded originUrl={originUrl}>
      <EmigrationsPerDestinationClient
        data={data}
        index={index}
        categories={categories}
      />
    </CardExpanded>
  )
}
