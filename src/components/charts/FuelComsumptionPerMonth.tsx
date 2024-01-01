import { getFuelConsumptionPerMonth } from "@/lib/fuel-consumption";
import { Card } from "@tremor/react";
import ChartWithYearSelector from "@/components/ui/ChartWithYearSelector";

export default async function FuelComsumptionPerMonth() {
    const { index, data, categories, years } = await getFuelConsumptionPerMonth();

    return (
        <div className="my-12 container-expanded">
            <ChartWithYearSelector
                categories={categories}
                data={data}
                index={index}
                years={years}
            />
        </div>
  );
}  