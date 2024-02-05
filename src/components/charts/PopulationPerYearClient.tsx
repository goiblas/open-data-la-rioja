'use client'
import { AreaChart, type AreaChartProps } from '@tremor/react'
import { formatLargeNumber } from '@/lib/shared/formatters'

interface PopulationPerYearClientProps {
  data: AreaChartProps['data']
  index: AreaChartProps['index']
  categories: AreaChartProps['categories']
}

export default function PopulationPerYearClient (props: PopulationPerYearClientProps) {
  const { data, index, categories } = props

  return (
        <AreaChart
            data={data}
            index={index}
            categories={categories}
            valueFormatter={formatLargeNumber}
            onValueChange={() => {}}
            yAxisWidth={48}
            connectNulls
        />
  )
}
