export type ChartData = {
    index: string
    data: any[]
    categories: (string | number)[]
}

export type ChartDataPerYear = ChartData & {
    years: number[]
    data: {
        [year: number]: ChartData["data"]
    }
}
