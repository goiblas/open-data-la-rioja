import { Card, Title } from "@tremor/react";
import { getUnemploymentRateByAgeGroup } from "@/lib/unemployment-rate";
import UnemploymentRatesPerAgeGroupClient from "./UnemploymentRatesPerAgeGroupClient";

export default async function UnemploymentRatesPerAgeGroupWomen() {
    const { index, data, categories } = await getUnemploymentRateByAgeGroup({ groupName: "women" });
    return (
        <div className="my-12 container-expanded">
            <Card>
                <UnemploymentRatesPerAgeGroupClient
                    data={data}
                    index={index}
                    categories={categories}
                />
            </Card>
        </div>
  );
}