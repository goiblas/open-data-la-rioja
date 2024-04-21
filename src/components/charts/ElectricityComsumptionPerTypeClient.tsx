'use client'
import { LineChart } from '@tremor/react'
import { formatLargeNumber } from '@/lib/shared/formatters'

interface ElectricityComsumptionPerTypeClientProps {
  data: number[]
  index: string
  categories: string[]
}

export default function ElectricityComsumptionPerTypeClient(
  props: ElectricityComsumptionPerTypeClientProps
) {
  const { index, data, categories } = props

  return (
    <LineChart
      className="mt-6"
      data={data}
      index={index}
      categories={categories}
      valueFormatter={formatLargeNumber}
      onValueChange={() => {}}
      yAxisWidth={52}
    />
  )
}
