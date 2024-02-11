import { getInmigrationPerYear } from '@/lib/inmigration'
import CardExpanded from '@/components/ui/CardExpanded'
import InmigrationPerYearClient from './InmigrationPerYearClient'

export default async function InmigrationPerYear ({ originUrl }: { originUrl?: string }) {
  const { index, data, categories } = await getInmigrationPerYear()

  return (
        <CardExpanded originUrl={originUrl}>
            <InmigrationPerYearClient
                data={data}
                index={index}
                categories={categories}
            />
        </CardExpanded>
  )
}
