import { getParentingPerAgeGroup } from '@/lib/parenting-age'
import ParentingPerAgeGroupClient from './ParentingPerAgeGroupClient'
import CardExpanded from '@/components/ui/CardExpanded'

export default async function ParentingPerAgeGroup ({ originUrl }: { originUrl: string }) {
  const { index, data, categories } = await getParentingPerAgeGroup()

  return (
        <CardExpanded originUrl={originUrl}>
            <ParentingPerAgeGroupClient
                data={data}
                index={index}
                categories={categories}
            />
        </CardExpanded>
  )
}
