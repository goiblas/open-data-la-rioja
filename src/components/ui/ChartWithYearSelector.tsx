'use client'
import { BarChart, Select, SelectItem } from '@tremor/react'
import React, { useState } from 'react'
import { type ChartDataPerYear } from '@/types'
import type Treemap from './Treemap'

export type ChartWithYearSelectorProps = ChartDataPerYear & {
  Chart?: typeof BarChart | typeof Treemap
  className?: string
  valueFormatter?: (value: number) => string
}

export default function ChartWithYearSelector(
  props: ChartWithYearSelectorProps
) {
  const {
    data,
    years,
    categories,
    index,
    Chart = BarChart,
    className,
    valueFormatter
  } = props
  const [year, setYear] = useState(years[years.length - 1])

  const monthData = data[year]

  return (
    <div className={className}>
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

      <Chart
        className="mt-6"
        data={monthData}
        index={index}
        categories={categories}
        valueFormatter={valueFormatter}
      />
    </div>
  )
}
