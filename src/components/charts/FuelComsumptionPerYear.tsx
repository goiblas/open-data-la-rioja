import { getFuelConsumptionTotalPerYear } from '@/lib/fuel-consumption'
import { BarChart } from '@tremor/react'
import CardExpanded from '@/components/ui/CardExpanded'

export default async function FuelComsumptionPerYear ({ originUrl }: { originUrl?: string }) {
  const { index, data, categories } = await getFuelConsumptionTotalPerYear()

  return (
        <CardExpanded originUrl={originUrl}>
            <BarChart
                className="mt-6"
                data={data}
                index={index}
                categories={categories}
                showLegend={false}
            />
        </CardExpanded>
  )
}
