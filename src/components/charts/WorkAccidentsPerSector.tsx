import { getWorkAccidentsSeriousPerSector } from '@/lib/work-accidents'
import CardExpanded from '@/components/ui/CardExpanded'
import WorkAccidentsPerSectorClient from './WorkAccidentsPerSectorClient'

export default async function WorkAccidentsPerSector({
  originUrl
}: {
  originUrl?: string
}) {
  const { index, data, categories } = await getWorkAccidentsSeriousPerSector()

  return (
    <CardExpanded originUrl={originUrl}>
      <WorkAccidentsPerSectorClient
        data={data}
        index={index}
        categories={categories}
      />
    </CardExpanded>
  )
}
