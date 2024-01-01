import { getFuelConsumptionTotalPerYear } from "@/lib/fuel-consumption";
import { BarChart, Card, Title } from "@tremor/react";

export default async function FuelComsumptionPerYear() {
    const { index, data, categories } = await getFuelConsumptionTotalPerYear();

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
  );
}  