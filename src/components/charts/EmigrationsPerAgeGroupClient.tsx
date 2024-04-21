'use client'
import { AreaChart, type AreaChartProps } from '@tremor/react'
import { formatLargeNumber } from '@/lib/shared/formatters'

interface EmigrationsPerAgeGroupClientProps {
  data: AreaChartProps['data']
  index: AreaChartProps['index']
  categories: AreaChartProps['categories']
}

export default function EmigrationsPerAgeGroupClient(
  props: EmigrationsPerAgeGroupClientProps
) {
  const { data, index, categories } = props

  return (
    <AreaChart
      data={data}
      index={index}
      categories={categories}
      valueFormatter={formatLargeNumber}
      onValueChange={() => {}}
      yAxisWidth={32}
      connectNulls
    />
  )
}
