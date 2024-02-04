import { getFuelConsumptionPerMonth } from '@/lib/fuel-consumption'
import ChartWithYearSelector from '@/components/ui/ChartWithYearSelector'
import CardExpanded from '@/components/ui/CardExpanded'

export default async function FuelComsumptionPerMonth ({ originUrl }: { originUrl?: string }) {
  const { index, data, categories, years } = await getFuelConsumptionPerMonth()

  return (
        <CardExpanded originUrl={originUrl}>
          <ChartWithYearSelector
              categories={categories}
              data={data}
              index={index}
              years={years}
            />
        </CardExpanded>
  )
}
