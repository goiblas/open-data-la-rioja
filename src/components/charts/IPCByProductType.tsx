import { getAllProducts } from '@/lib/ipc'
import CardExpanded from '@/components/ui/CardExpanded'
import IPCByProductClient from './IPCByProductClient'

export default async function IPCByProductType ({ originUrl }: { originUrl?: string }) {
  const { data, index, categories } = await getAllProducts()

  const dataGroupNames = data.map(d => d.groupName)
  const groupNames = Array.from(new Set(dataGroupNames))

  return (
    <CardExpanded originUrl={originUrl}>
      <IPCByProductClient
          data={data}
          index={index}
          categories={categories}
          groupNames={groupNames}
      />
    </CardExpanded>
  )
}
