'use client'
import React, { useState } from 'react'
import Treemap from '@/components/ui/Treemap'
import { formatLargeNumber } from '@/lib/shared/formatters'
import { Select, SelectItem } from '@tremor/react'

interface IncomesPerCategoryClientProps {
  data: any
  years: number[]
}

export default function IncomesPerCategoryClient({
  data,
  years
}: IncomesPerCategoryClientProps) {
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
        color="blue"
        valueFormatter={formatLargeNumber}
      />
    </div>
  )
}
