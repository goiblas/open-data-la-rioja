import { getUnemploymentRateBySex } from "@/lib/unemployment-rate";
import { BarChart, Card } from "@tremor/react";

export default async function FuelComsumptionPerType() {
    const { index, data, categories } = await getUnemploymentRateBySex();

    return (
        <div className="my-12 container-expanded">
            <Card>
                <BarChart
                    className="mt-6"
                    data={data}
                    index={index}
                    categories={["Mujeres", "Hombres"]}
                />
            </Card>
        </div>
  );
}  