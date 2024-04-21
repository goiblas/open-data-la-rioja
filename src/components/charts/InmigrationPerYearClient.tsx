'use client'
import { type BarChartProps, BarChart } from '@tremor/react'
import { formatLargeNumber } from '@/lib/shared/formatters'

interface InmigrationPerYearClientProps {
  data: BarChartProps['data']
  index: BarChartProps['index']
  categories: BarChartProps['categories']
}

export default function InmigrationPerYearClient(
  props: InmigrationPerYearClientProps
) {
  const { index, data, categories } = props

  return (
    <BarChart
      className="mt-6"
      data={data}
      index={index}
      categories={categories}
      valueFormatter={formatLargeNumber}
      yAxisWidth={40}
      showLegend={false}
    />
  )
}
