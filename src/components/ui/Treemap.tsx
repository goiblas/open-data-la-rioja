import { useMemo } from 'react'
import {
  ResponsiveContainer,
  Tooltip,
  Treemap as RechartsTreemap
} from 'recharts'
import colors from 'tailwindcss/colors'
import ChartTooltip from './ChartTooltip'
import clsx from 'clsx'

interface TreemapProps {
  data: Record<string, number>
  className?: string
  valueFormatter?: (value: number) => string
  color?: keyof typeof colors
}

export default function Treemap({
  data,
  className,
  color = 'cyan',
  valueFormatter
}: TreemapProps) {
  const formattedData = Object.entries(data)
    .map(([name, size]) => ({
      name,
      size
    }))
    .sort((a, b) => {
      return b.size - a.size
    })

  return (
    <div className={clsx('h-96 w-full py-4', className)}>
      <ResponsiveContainer className="h-full w-full">
        <RechartsTreemap
          data={formattedData}
          dataKey="size"
          aspectRatio={4 / 3}
          animationDuration={0}
          content={<CustomizedContent color={color} />}
        >
          <Tooltip
            wrapperStyle={{ outline: 'none' }}
            isAnimationActive={false}
            cursor={{ fill: '#d1d5db', opacity: '0.15' }}
            content={({ active, payload }) => (
              <ChartTooltip
                active={active}
                payload={payload?.map((payloadItem: any) => ({
                  ...payloadItem,
                  name: payloadItem.payload.name
                }))}
                valueFormatter={valueFormatter}
              />
            )}
          />
        </RechartsTreemap>
      </ResponsiveContainer>
    </div>
  )
}

function CustomizedContent(props) {
  const { x, y, width, height, name, index, color } = props

  const fill = useMemo(() => {
    switch (index) {
      case 0:
        return colors[color][500]
      case 1:
        return colors[color][600]
      case 2:
        return colors[color][700]
      case 3:
        return colors[color][800]
      case 4:
        return colors[color][900]
      default:
        return colors[color][950]
    }
  }, [index])

  return (
    <g className="hover:opacity-40">
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill,
          stroke: colors.gray[900],
          strokeWidth: 2,
          strokeOpacity: 1
        }}
        rx="3"
      />

      <foreignObject x={x} y={y} width={width} height={height}>
        <div className="flex h-full p-2 justify-center items-center text-center">
          <div className="text-white text-xs text-center leading-4 line-clamp-2">
            {name}
          </div>
        </div>
      </foreignObject>
    </g>
  )
}
