'use client'
import { type BarChartProps, BarChart } from '@tremor/react'
import { formatLargeNumber } from '@/lib/shared/formatters'

interface ExpensesIncomesClientProps {
  data: BarChartProps['data']
  index: BarChartProps['index']
  categories: BarChartProps['categories']
}

export default function ExpensesIncomesClient (props: ExpensesIncomesClientProps) {
  const { index, data, categories } = props

  return (
        <BarChart
            className='mt-6'
            data={data}
            index={index}
            categories={categories}
            valueFormatter={formatLargeNumber}
            yAxisWidth={40}
        />
  )
}
