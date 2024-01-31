'use client'
import { AreaChart } from '@tremor/react'

interface WorkAccidentsPerYearClientProps {
  data: number[]
  index: string
  categories: string[]
}

// 2000 => 2K
const formatNumber = (value: number): string => {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value)
}

export default function WorkAccidentsPerYearClient (props: WorkAccidentsPerYearClientProps) {
  const { index, data, categories } = props

  return (
        <AreaChart
            className="mt-6"
            data={data}
            index={index}
            categories={categories}
            valueFormatter={value => formatNumber(value)}
            onValueChange={() => {}}
            yAxisWidth={40}
        />
  )
}
