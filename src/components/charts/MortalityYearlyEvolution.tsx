import CardExpanded from '@/components/ui/CardExpanded'
import { getEvolutionOfDeceases, getSetpYears } from '@/lib/mortality'
import { LineChart } from '@tremor/react'

export default async function MortalityYearlyEvolution({
  originUrl
}: {
  originUrl?: string
}) {
  const data = await getEvolutionOfDeceases()
  const stepYears = getSetpYears()
  return (
    <CardExpanded originUrl={originUrl}>
      <LineChart data={data} index="AÑO" categories={stepYears} />
    </CardExpanded>
  )
}
