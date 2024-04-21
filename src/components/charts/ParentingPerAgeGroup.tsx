import { getParentingPerAgeGroup } from '@/lib/parenting-age'
import ParentingPerAgeGroupClient from './ParentingPerAgeGroupClient'
import CardExpanded from '@/components/ui/CardExpanded'

export default async function ParentingPerAgeGroup({
  originUrl
}: {
  originUrl: string
}) {
  const { index, data, categories } = await getParentingPerAgeGroup()

  const groupNames = ['Mujeres', 'Hombres', 'Ambos']

  return (
    <CardExpanded originUrl={originUrl}>
      <ParentingPerAgeGroupClient
        data={data}
        index={index}
        categories={categories}
        groupNames={groupNames}
        label="Sexo"
      />
    </CardExpanded>
  )
}
