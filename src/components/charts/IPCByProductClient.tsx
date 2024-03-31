'use client'
import { BarChart, Select, SelectItem, type BarChartProps } from '@tremor/react'
import { useState } from 'react'

interface IPCByProductClientProps {
  data: BarChartProps['data']
  index: BarChartProps['index']
  categories: BarChartProps['categories']
  groupNames: string[]
  label: string
}

export default function IPCByProductClient (props: IPCByProductClientProps) {
  const { index, data, categories, groupNames, label } = props
  const [groupSelected, setGroupSelected] = useState<string>(groupNames.at(-1))

  const filteredData = data.filter(d => d.groupName === groupSelected)

  return (
    <div className="mt-6">
      <div className="flex justify-end items-center gap-2">
        <div className='text-slate-500 font-bold text-sm'>
          {label}:
        </div>
        <div>
          <Select className='max-w-44' enableClear={false} value={groupSelected} onValueChange={setGroupSelected}>
            {groupNames.map((groupName) => (
              <SelectItem key={groupName} value={groupName}>{groupName}</SelectItem>
            ))}
          </Select>
        </div>
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
