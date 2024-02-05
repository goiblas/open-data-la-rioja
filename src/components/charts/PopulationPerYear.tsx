import { getPopulationTotalPerYear } from '@/lib/population'
import CardExpanded from '@/components/ui/CardExpanded'
import PopulationPerYearClient from './PopulationPerYearClient'

export default async function ElectricityComsumptionPerYear ({ originUrl }: { originUrl?: string }) {
  const { index, data, categories } = await getPopulationTotalPerYear()

  return (
        <CardExpanded originUrl={originUrl}>
            <PopulationPerYearClient
                data={data}
                index={index}
                categories={categories}
            />
        </CardExpanded>
  )
}
