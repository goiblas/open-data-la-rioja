import CardExpanded from '@/components/ui/CardExpanded'
import { getGenreDeceasesForYears } from '@/lib/mortality'
import { LineChart } from '@tremor/react'

export default async function MortalityEvolutionByGenres({
  originUrl
}: {
  originUrl?: string
}) {
  const data = await getGenreDeceasesForYears()
  return (
    <CardExpanded originUrl={originUrl}>
      <LineChart
        index="AÑO"
        data={data}
        categories={['MUJERES', 'HOMBRES']}
        colors={['red-300', 'blue-300']}
      />
    </CardExpanded>
  )
}
