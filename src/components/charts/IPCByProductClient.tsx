'use client'
import { BarChart, Select, SelectItem, type BarChartProps } from '@tremor/react'
import { useState } from 'react'

interface IPCByProductClientProps {
  data: BarChartProps['data']
  index: BarChartProps['index']
  categories: BarChartProps['categories']
  groupNames: string[]
}

export default function IPCByProductClient (props: IPCByProductClientProps) {
  const { index, data, categories, groupNames } = props
  const [groupSelected, setGroupSelected] = useState<string>(groupNames[0])

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
