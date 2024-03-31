'use client'
import { BarChart, Select, SelectItem, type BarChartProps } from '@tremor/react'
import { useState } from 'react'
import { GENERAL_GROUP } from '@/lib/ipc'

interface IPCCurrentPeriodClientProps {
  data: BarChartProps['data']
  index: BarChartProps['index']
  categories: BarChartProps['categories']
  groupNames: string[]
}

export default function IPCCurrentPeriodClient (props: IPCCurrentPeriodClientProps) {
  const { index, data, categories, groupNames } = props
  const [groupSelected, setGroupSelected] = useState<string>(GENERAL_GROUP)

  const filteredData = data.filter(d => d.groupName === groupSelected)

  return (
    <div className="mt-6">
      <div className="ml-auto max-w-fit">
        <Select className='max-w-44' enableClear={false} value={groupSelected} onValueChange={setGroupSelected}>
          {groupNames.map((groupName) => (
              <SelectItem key={groupName} value={groupName}>{groupName}</SelectItem>
          ))}
        </Select>
      </div>

      <BarChart
            className='mt-6'
            data={filteredData}
            index={index}
            categories={categories}
            yAxisWidth={40}
            showLegend={false}
        />
    </div>
  )
}
