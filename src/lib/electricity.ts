import database from "./shared/database";
import { config } from "@/config";
import { getMonthFromTimeDto, getYearFromTimeDto } from "./shared/utils";
import { MONTHS } from "./shared/constants";
import { ChartData, ChartDataPerYear } from "@/types";

const ALL_SECTORS = "[ACTIVIDAD DE CONSUMO ].[Todas las actividades]"

type ElectricityDto = {
    "[ACTIVIDAD DE CONSUMO ]": string
    "[Measures].[Var (%) anual]": number
    "[Measures].[Var (%) en lo que va de año]": number
    "[Measures].[Consumo (kWH)]": number
    "[TIEMPO]": string
    "[Measures].[Var (%) mensual]": number
}

type Electricity = {
    year: number
    month: string
    measure: number
}

type ElectricityWithSector = Electricity & { sector: string }

// "[ACTIVIDAD DE CONSUMO ].[Agricultura]" -> "Agricultura"
function getSector(activity: string): string {
    const sector = activity.split('.')[1]
    return sector.replace('[', '').replace(']', '').trim()
}

async function getElectricity(): Electricity[] {
    const reponse = await database.get<ElectricityDto>(config.electricity.file)

    return reponse
        .filter(dto => dto["[ACTIVIDAD DE CONSUMO ]"] === ALL_SECTORS)
        .map(dto => {
            return {
                month: getMonthFromTimeDto(dto["[TIEMPO]"]),
                year: getYearFromTimeDto(dto["[TIEMPO]"]),
                measure: dto["[Measures].[Consumo (kWH)]"],
            }
        })
}

async function getElectricityWithSector(): ElectricityWithSector[] {
    const reponse = await  database.get<ElectricityDto>(config.electricity.file)

    return reponse
        .filter(dto => dto["[ACTIVIDAD DE CONSUMO ]"] !== ALL_SECTORS)
        .map(dto => {
            return {
                month: getMonthFromTimeDto(dto["[TIEMPO]"]),
                year: getYearFromTimeDto(dto["[TIEMPO]"]),
                measure: dto["[Measures].[Consumo (kWH)]"],
                sector: getSector(dto["[ACTIVIDAD DE CONSUMO ]"])
            }
        })
}

export async function getElectricityTotalPerYear(): Promise<ChartData> {
    const electricity = await getElectricity()

    const years = [...new Set(electricity.map(e => e.year))].sort()
    const data = years.map(year => {
        const electricityOfYear = electricity.filter(e => e.year === year)

        const total = electricityOfYear.reduce((acc, e) => {
            acc += e.measure
            return acc
        }, 0)

        return {
            year,
            total: Math.round(total)
        }
    })

    return {
        index: "year",
        categories: ["total"],
        data
    }
}

export async function getElectricityConsumptionPerType(): Promise<ChartData> {
    const electricity = await getElectricityWithSector()

    const years = [...new Set(electricity.map(e => e.year))].sort()
    const sectors = [...new Set(electricity.map(e => e.sector))]

    const data = years.map(year => {
        const electricityOfYear = electricity.filter(e => e.year === year)

        const groups = electricityOfYear.reduce((acc, { sector, measure }) => {            
            if (acc[sector]) {
                acc[sector] += measure
            } else {
                acc[sector] = measure
            }

            return acc
        }, {})

        const roundedGroups = Object.keys(groups).reduce((acc, key) => {
            acc[key] = Math.round(groups[key])
            return acc
        }, {})

        return {
            year,
            ...roundedGroups
        }
    })

    return {
        index: "year",
        categories: sectors,
        data
    }
}

export async function getElectricityConsumptionPerMonth(): Promise<ChartDataPerYear> {
    const electricity = await getElectricityWithSector()

    const years = [...new Set(electricity.map(e => e.year))].sort()
    const sectors = [...new Set(electricity.map(e => e.sector))]

    const data = years.reduce((acc, year) => {
        const electricityOfYear = electricity.filter(e => e.year === year)

        const data = MONTHS.map(month => {
            const electricityOfMonth = electricityOfYear.filter(e => e.month === month)
            const sectorsInMonth = [...new Set(electricityOfMonth.map(e => e.sector))]

            const measuresBySector = sectorsInMonth.reduce((acc, sector) => {
                const electricityOfSector = electricityOfMonth.filter(e => e.sector === sector)

                const total = electricityOfSector.reduce((acc, e) => {
                    acc += e.measure
                    return acc
                }, 0)

                acc[sector] = Math.round(total)
                return acc
            }, {})

            return {
                month,
                ...measuresBySector
            }
        })

        return {
            ...acc,
            [year]: data
        }
    }, {} as any)


    return {
        years,
        index: "month",
        categories: sectors,
        data
    }
}