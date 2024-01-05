import { getWorkAccidentsPerYear } from "@/lib/work-accidents";
import { Card, BarChart } from "@tremor/react";
import ChartWithYearSelector from "@/components/ui/ChartWithYearSelector";

export default async function WorkAccidents() {
    const { index, data, categories } = await getWorkAccidentsPerYear();

    return (
        <div className="my-12 container-expanded">
            <Card>
                <BarChart
                    className="mt-6"
                    data={data}
                    index={index}
                    categories={categories}
                />
            </Card>
        </div>
  );
}  