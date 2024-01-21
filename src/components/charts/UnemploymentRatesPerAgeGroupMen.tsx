import { Card } from '@tremor/react'
import { getUnemploymentRateByAgeGroup } from '@/lib/unemployment-rate'
import UnemploymentRatesPerAgeGroupClient from './UnemploymentRatesPerAgeGroupClient'

export default async function UnemploymentRatesPerAgeGroupMen () {
  const { index, data, categories } = await getUnemploymentRateByAgeGroup({ groupName: 'men' })
  return (
        <div className="my-12 container-expanded">
            <Card>
                <UnemploymentRatesPerAgeGroupClient
                    data={data}
                    index={index}
                    categories={categories}
                />
            </Card>
        </div>
  )
}
