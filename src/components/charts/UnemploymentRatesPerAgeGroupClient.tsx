'use client'
import { AreaChart, type AreaChartProps } from '@tremor/react'

interface UnemploymentRatesPerAgeGroupProps {
  data: AreaChartProps['data']
  index: AreaChartProps['index']
  categories: AreaChartProps['categories']
}

export default function UnemploymentRatesPerAgeGroupClient(
  props: UnemploymentRatesPerAgeGroupProps
) {
  const { data, index, categories } = props

  return (
    <AreaChart
      data={data}
      index={index}
      categories={categories}
      valueFormatter={value => `${value}%`}
      onValueChange={() => {}}
      yAxisWidth={32}
      connectNulls
    />
  )
}
