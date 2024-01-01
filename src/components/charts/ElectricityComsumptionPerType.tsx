import { getElectricityConsumptionPerType } from "@/lib/electricity";
import { LineChart, Card } from "@tremor/react";

export default async function ElectricityComsumptionPerType() {
    const { index, data, categories } = await getElectricityConsumptionPerType();

    return (
        <div className="my-12 container-expanded">
            <Card>
                <LineChart
                    className="mt-6"
                    data={data}
                    index={index}
                    categories={categories}
                />
            </Card>
        </div>
  );
}  