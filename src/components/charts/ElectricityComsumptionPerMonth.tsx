import { getElectricityConsumptionPerMonth } from "@/lib/electricity";
import { Card } from "@tremor/react";
import ChartWithYearSelector from "@/components/ui/ChartWithYearSelector";

export default async function ElectricityComsumptionPerMonth() {
    const { index, data, categories, years } = await getElectricityConsumptionPerMonth();

    return (
        <div className="my-12 container-expanded">
            <Card>
                <ChartWithYearSelector
                    categories={categories}
                    data={data}
                    index={index}
                    years={years}
                />
            </Card>
        </div>
  );
}  