import { getFuelConsumptionPerSpecificType } from '@/lib/fuel-consumption'
import { LineChart, Card } from '@tremor/react'

export default async function FuelComsumptionPerSpecificType () {
  const { index, data, categories } = await getFuelConsumptionPerSpecificType()

  return (
        <div className="my-12 container-expanded">
            <Card>
                <LineChart
                    className="mt-6"
                    data={data}
                    index={index}
                    categories={categories}
                />
            </Card>
        </div>
  )
}
