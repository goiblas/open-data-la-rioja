import CardExpanded from '@/components/ui/CardExpanded'
import BirthsPerYearClient from './BirthsPerYearClient'
import { getBirthsPerYear } from '@/lib/parenting-age'

export default async function BirthsPerYear ({ originUrl }: { originUrl?: string }) {
  const { index, data, categories } = await getBirthsPerYear()

  return (
        <CardExpanded originUrl={originUrl}>
            <BirthsPerYearClient
                data={data}
                index={index}
                categories={categories}
            />
        </CardExpanded>
  )
}
