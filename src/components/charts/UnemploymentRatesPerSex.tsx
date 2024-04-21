import { getUnemploymentRateBySex } from '@/lib/unemployment-rate'
import CardExpanded from '@/components/ui/CardExpanded'
import UnemploymentRatesPerSexClient from './UnemploymentRatesPerSexClient'

export default async function FuelComsumptionPerType({
  originUrl
}: {
  originUrl: string
}) {
  const { index, data } = await getUnemploymentRateBySex()

  return (
    <CardExpanded originUrl={originUrl}>
      <UnemploymentRatesPerSexClient
        data={data}
        index={index}
        categories={['Mujeres', 'Hombres']}
      />
    </CardExpanded>
  )
}
