'use client';
import { AreaChart, AreaChartProps } from "@tremor/react";

type UnemploymentRatesPerAgeGroupProps = {
    data: AreaChartProps["data"];
    index: AreaChartProps["index"];
    categories: AreaChartProps["categories"];
};

export default function UnemploymentRatesPerAgeGroupClient(props: UnemploymentRatesPerAgeGroupProps) {
    const { data, index, categories } = props;
    
    return (
        <AreaChart
            data={data}
            index={index}
            categories={categories}
            valueFormatter={value => `${value}%`}
            onValueChange={() => {}}
            connectNulls
        />
  );
}