import { getEmigrationPerAgeGroup } from '@/lib/emigration'
import EmigrationsPerAgeGroupClient from './EmigrationsPerAgeGroupClient'
import CardExpanded from '@/components/ui/CardExpanded'

export default async function EmigrationsPerAgeGroup ({ originUrl }: { originUrl: string }) {
  const { index, data, categories } = await getEmigrationPerAgeGroup()

  return (
        <CardExpanded originUrl={originUrl}>
            <EmigrationsPerAgeGroupClient
                data={data}
                index={index}
                categories={categories}
            />
        </CardExpanded>
  )
}
