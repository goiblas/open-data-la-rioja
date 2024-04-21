'use client'
import {
  AreaChart,
  Select,
  type AreaChartProps,
  SelectItem
} from '@tremor/react'
import { formatLargeNumber } from '@/lib/shared/formatters'
import { useState } from 'react'

interface ParentingPerAgeGroupClientProps {
  data: AreaChartProps['data']
  index: AreaChartProps['index']
  categories: AreaChartProps['categories']
  groupNames: string[]
  label: string
}

export default function ParentingPerAgeGroupClient(
  props: ParentingPerAgeGroupClientProps
) {
  const { data, index, categories, groupNames, label } = props

  const [groupSelected, setGroupSelected] = useState<string>(groupNames.at(-1))

  const filteredCategories =
    groupSelected === 'Ambos'
      ? categories
      : categories.filter(c => c.startsWith(groupSelected))

  return (
    <div className="mt-6">
      <div className="flex justify-end items-center gap-2">
        <div className="text-slate-500 font-bold text-sm">{label}:</div>
        <div>
          <Select
            className="max-w-44"
            enableClear={false}
            value={groupSelected}
            onValueChange={setGroupSelected}
          >
            {groupNames.map(groupName => (
              <SelectItem key={groupName} value={groupName}>
                {groupName}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <AreaChart
        data={data}
        index={index}
        categories={filteredCategories}
        valueFormatter={formatLargeNumber}
        onValueChange={() => {}}
        yAxisWidth={32}
        connectNulls
      />
    </div>
  )
}
