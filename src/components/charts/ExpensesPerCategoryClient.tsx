'use client'
import { useState } from 'react'
import Treemap from '@/components/ui/Treemap'
import { formatLargeNumber } from '@/lib/shared/formatters'
import { Select, SelectItem } from '@tremor/react'

interface ExpensesPerCategoryClientProps {
  data: any
  years: number[]
}

export default function ExpensesPerCategoryClient({
  data,
  years
}: ExpensesPerCategoryClientProps) {
  const [year, setYear] = useState(years[years.length - 1])

  const monthData = data[year]

  return (
    <div>
      <div className="ml-auto max-w-fit">
        <Select
          enableClear={false}
          value={`${year}`}
          onValueChange={value => {
            setYear(Number(value))
          }}
        >
          {years.map(year => (
            <SelectItem key={year} value={`${year}`}>
              {year}
            </SelectItem>
          ))}
        </Select>
      </div>

      <Treemap
        className="mt-2"
        data={monthData}
        valueFormatter={formatLargeNumber}
      />
    </div>
  )
}
