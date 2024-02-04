import { getFuelConsumptionPerSpecificType } from '@/lib/fuel-consumption'
import { LineChart } from '@tremor/react'
import CardExpanded from '@/components/ui/CardExpanded'

export default async function FuelComsumptionPerSpecificType ({ originUrl }: { originUrl?: string }) {
  const { index, data, categories } = await getFuelConsumptionPerSpecificType()

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
