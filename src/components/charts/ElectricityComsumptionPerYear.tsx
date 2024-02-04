import { getElectricityTotalPerYear } from '@/lib/electricity'
import CardExpanded from '@/components/ui/CardExpanded'
import ElectricityComsumptionPerYearClient from './ElectricityComsumptionPerYearClient'

export default async function ElectricityComsumptionPerYear ({ originUrl }: { originUrl?: string }) {
  const { index, data, categories } = await getElectricityTotalPerYear()

  return (
        <CardExpanded originUrl={originUrl}>
            <ElectricityComsumptionPerYearClient
                data={data}
                index={index}
                categories={categories}
            />
        </CardExpanded>
  )
}
