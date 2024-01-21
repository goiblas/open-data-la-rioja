export interface ChartData {
  index: string
  data: any[]
  categories: string[]
}

export type ChartDataPerYear = ChartData & {
  years: number[]
  data: Record<number, ChartData['data']>
}
