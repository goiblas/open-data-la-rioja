import { getCurrentPeriodIPCs } from '@/lib/ipc'
import CardExpanded from '@/components/ui/CardExpanded'
import IPCCurrentPeriodClient from './IPCCurrentPeriodClient'

export default async function IPCCurrentPeriod ({ originUrl }: { originUrl?: string }) {
  const { data, index, categories } = await getCurrentPeriodIPCs({ months: 20 })

  const dataGroupNames = data.map(d => d.groupName)
  const groupNames = Array.from(new Set(dataGroupNames))

  return (
    <CardExpanded originUrl={originUrl}>
      <IPCCurrentPeriodClient
          data={data}
          index={index}
          categories={categories}
          groupNames={groupNames}
      />
    </CardExpanded>
  )
}
