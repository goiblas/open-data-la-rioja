import { getElectricityConsumptionPerType } from '@/lib/electricity'
import CardExpanded from '@/components/ui/CardExpanded'
import ElectricityComsumptionPerTypeClient from './ElectricityComsumptionPerTypeClient'

export default async function ElectricityComsumptionPerType ({ originUrl }: { originUrl?: string }) {
  const { index, data, categories } = await getElectricityConsumptionPerType()

  return (
        <CardExpanded originUrl={originUrl}>
            <ElectricityComsumptionPerTypeClient
                data={data}
                index={index}
                categories={categories}
            />
        </CardExpanded>
  )
}
