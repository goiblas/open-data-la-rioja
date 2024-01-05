import { getWorkAccidentsSeriousPerYear } from "@/lib/work-accidents";
import { Card, AreaChart } from "@tremor/react";
import ChartWithYearSelector from "@/components/ui/ChartWithYearSelector";

export default async function WorkAccidents() {
    const { index, data, categories } = await getWorkAccidentsSeriousPerYear();

    return (
        <div className="my-12 container-expanded">
            <Card>
                <AreaChart
                    className="mt-6"
                    data={data}
                    index={index}
                    categories={categories}
                />
            </Card>
        </div>
  );
}  