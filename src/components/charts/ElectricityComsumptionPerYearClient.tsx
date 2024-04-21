'use client'
import { BarChart } from '@tremor/react'
import { formatLargeNumber } from '@/lib/shared/formatters'

interface ElectricityComsumptionPerYearClientProps {
  data: number[]
  index: string
  categories: string[]
}

export default function ElectricityComsumptionPerYearClient(
  props: ElectricityComsumptionPerYearClientProps
) {
  const { index, data, categories } = props

  return (
    <BarChart
      className="mt-6"
      data={data}
      index={index}
      categories={categories}
      showLegend={false}
      valueFormatter={formatLargeNumber}
      yAxisWidth={52}
    />
  )
}
