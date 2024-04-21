import { getForeignEmigrationPerYear } from '@/lib/inmigration'
import CardExpanded from '@/components/ui/CardExpanded'
import ForeignInmigrationPerYearClient from './ForeignInmigrationPerYearClient'

export default async function ForeignInmigrationPerYear({
  originUrl
}: {
  originUrl?: string
}) {
  const { index, data, categories } = await getForeignEmigrationPerYear()

  return (
    <CardExpanded originUrl={originUrl}>
      <ForeignInmigrationPerYearClient
        data={data}
        index={index}
        categories={categories}
      />
    </CardExpanded>
  )
}
