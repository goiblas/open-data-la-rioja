import { getCurrentPeriodIPCs } from '@/lib/ipc'
import CardExpanded from '@/components/ui/CardExpanded'
import IPCByProductClient from './IPCByProductClient'

export default async function IPCCurrentPeriod ({ originUrl }: { originUrl?: string }) {
  const { data, index, categories } = await getCurrentPeriodIPCs({ months: 200 })

  const dataGroupNames = data.map(d => d.groupName)
  const groupNames = Array.from(new Set(dataGroupNames))

  return (
    <CardExpanded originUrl={originUrl}>
      <IPCByProductClient
          data={data}
          index={index}
          categories={categories}
          groupNames={groupNames}
          label='Grupo ECOICOP'
      />
    </CardExpanded>
  )
}
