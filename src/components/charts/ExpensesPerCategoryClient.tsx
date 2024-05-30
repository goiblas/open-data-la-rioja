'use client'
import ChartWithYearSelector from '@/components/ui/ChartWithYearSelector'
import Treemap from '@/components/ui/Treemap'
import { formatLargeNumber } from '@/lib/shared/formatters'
import { type ChartDataPerYear } from '@/types'

type ExpensesPerCategoryClientProps = ChartDataPerYear & {
  index: string
  categories: string[]
}

export default function ExpensesPerCategoryClient({
  index,
  data,
  categories,
  years
}: ExpensesPerCategoryClientProps) {
  return (
    <ChartWithYearSelector
      className="mt-6"
      data={data}
      index={index}
      years={years}
      categories={categories}
      Chart={Treemap}
      valueFormatter={formatLargeNumber}
    />
  )
}
