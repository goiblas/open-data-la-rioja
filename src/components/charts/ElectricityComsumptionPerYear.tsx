import { getElectricityTotalPerYear } from '@/lib/electricity'
import { BarChart, Card } from '@tremor/react'

export default async function ElectricityComsumptionPerYear () {
  const { index, data, categories } = await getElectricityTotalPerYear()

  return (
        <div className="my-12 container-expanded">
            <Card>
                <BarChart
                    className="mt-6"
                    data={data}
                    index={index}
                    categories={categories}
                    showLegend={false}
                />
            </Card>
        </div>
  )
}
