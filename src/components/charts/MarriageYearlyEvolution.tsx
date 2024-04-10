import CardExpanded from '@/components/ui/CardExpanded'
import { LineChart } from '@tremor/react'
import { getCountMarriagesByGroups } from '@/lib/marriage'

export default async function MarriageYearlyEvolution ({ originUrl }: { originUrl?: string }) {
  const { cleanedData, categories, index } = await getCountMarriagesByGroups()
  return (
    <CardExpanded originUrl={originUrl}>
      <LineChart
          data={cleanedData}
          index={index}
          categories={categories}
      />
    </CardExpanded>
  )
}
