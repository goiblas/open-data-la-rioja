'use client'
import { BarChart } from '@tremor/react'

interface WorkAccidentsPerSectorClientProps {
  data: number[]
  index: string
  categories: string[]
}

export default function WorkAccidentsPerSectorClient (props: WorkAccidentsPerSectorClientProps) {
  const { index, data, categories } = props

  return (
        <BarChart
            className="mt-6"
            data={data}
            index={index}
            categories={categories}
            onValueChange={() => {}}
            yAxisWidth={40}
            layout="vertical"
            stack
        />
  )
}
