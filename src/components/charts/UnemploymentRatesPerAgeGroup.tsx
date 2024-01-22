import { getUnemploymentRateByAgeGroup } from '@/lib/unemployment-rate'
import UnemploymentRatesPerAgeGroupClient from './UnemploymentRatesPerAgeGroupClient'
import CardExpanded from '@/components/ui/CardExpanded'

export default async function UnemploymentRatesPerAgeGroup ({ originUrl }: { originUrl: string }) {
  const { index, data, categories } = await getUnemploymentRateByAgeGroup({ groupName: 'average' })

  return (
        <CardExpanded originUrl={originUrl}>
            <UnemploymentRatesPerAgeGroupClient
                data={data}
                index={index}
                categories={categories}
            />
        </CardExpanded>
  )
}
