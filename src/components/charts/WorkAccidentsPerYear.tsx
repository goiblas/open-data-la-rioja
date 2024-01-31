import { getWorkAccidentsPerYear } from '@/lib/work-accidents'
import CardExpanded from '@/components/ui/CardExpanded'
import WorkAccidentsPerYearClient from './WorkAccidentsPerYearClient'

export default async function WorkAccidents ({ originUrl }: { originUrl?: string }) {
  const { index, data, categories } = await getWorkAccidentsPerYear()

  return (
        <div className="my-12 container-expanded">
            <CardExpanded originUrl={originUrl}>
                <WorkAccidentsPerYearClient
                    data={data}
                    index={index}
                    categories={categories}
                />
            </CardExpanded>
        </div>
  )
}
