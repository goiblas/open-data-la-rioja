'use client'
import { AreaChart } from '@tremor/react'
import { formatLargeNumber } from '@/lib/shared/formatters'

interface WorkAccidentsPerYearClientProps {
  data: number[]
  index: string
  categories: string[]
}

export default function WorkAccidentsPerYearClient(
  props: WorkAccidentsPerYearClientProps
) {
  const { index, data, categories } = props

  return (
    <AreaChart
      className="mt-6"
      data={data}
      index={index}
      categories={categories}
      valueFormatter={formatLargeNumber}
      onValueChange={() => {}}
      yAxisWidth={40}
    />
  )
}
