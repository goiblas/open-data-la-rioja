import { getFuelConsumptionPerType } from '@/lib/fuel-consumption'
import { LineChart } from '@tremor/react'
import CardExpanded from '@/components/ui/CardExpanded'

export default async function FuelComsumptionPerType ({ originUrl }: { originUrl?: string }) {
  const { index, data, categories } = await getFuelConsumptionPerType()

  return (
        <CardExpanded originUrl={originUrl}>
            <LineChart
                className="mt-6"
                data={data}
                index={index}
                categories={categories}
            />
        </CardExpanded>
  )
}
