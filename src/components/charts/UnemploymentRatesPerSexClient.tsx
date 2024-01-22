'use client'
import { BarChart } from '@tremor/react'

interface UnemploymentRatesPerSexClientProps {
  data: number[]
  index: string
  categories: string[]
}

export default function UnemploymentRatesPerSexClient (props: UnemploymentRatesPerSexClientProps) {
  const { index, data, categories } = props

  return (
        <BarChart
            className="mt-6"
            data={data}
            index={index}
            categories={categories}
            valueFormatter={value => `${value}%`}
            onValueChange={() => {}}
            yAxisWidth={32}
        />
  )
}
