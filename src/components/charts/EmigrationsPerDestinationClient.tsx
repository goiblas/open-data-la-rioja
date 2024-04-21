'use client'
import { type BarChartProps, BarChart } from '@tremor/react'
import { formatLargeNumber } from '@/lib/shared/formatters'

interface EmigrationsPerDestinationClientProps {
  data: BarChartProps['data']
  index: BarChartProps['index']
  categories: BarChartProps['categories']
}

export default function EmigrationsPerDestinationClient(
  props: EmigrationsPerDestinationClientProps
) {
  const { data, index, categories } = props

  return (
    <BarChart
      className="mt-6"
      data={data}
      index={index}
      categories={categories}
      valueFormatter={formatLargeNumber}
      onValueChange={() => {}}
      yAxisWidth={40}
      stack
    />
  )
}
