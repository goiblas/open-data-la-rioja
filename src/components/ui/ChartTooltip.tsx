export interface ChartTooltipRowProps {
  value: string
  name: string
}

export const ChartTooltipRow = ({ value, name }: ChartTooltipRowProps) => (
  <div className="flex items-center justify-between space-x-8 max-w-[300px]">
    <p className="dark:text-dark-tremor-content">{name}</p>
    <p className="font-medium tabular-nums text-left whitespace-nowrap dark:text-dark-tremor-content-emphasis">
      {value}
    </p>
  </div>
)

export interface ChartTooltipProps {
  active: boolean | undefined
  payload: any[]
  valueFormatter: (value: number) => string
}

const ChartTooltip = ({
  active,
  payload,
  valueFormatter
}: ChartTooltipProps) => {
  if (active && payload) {
    return (
      <div className="rounded-tremor-default text-tremor-default border dark:bg-dark-tremor-background dark:shadow-dark-tremor-dropdown dark:border-dark-tremor-border">
        <div className="px-4 py-2 space-y-1">
          {payload.map(
            ({ value, name }: { value: number; name: string }, idx: number) => (
              <ChartTooltipRow
                key={`id-${idx}`}
                value={valueFormatter(value)}
                name={name}
              />
            )
          )}
        </div>
      </div>
    )
  }
  return null
}

export default ChartTooltip
