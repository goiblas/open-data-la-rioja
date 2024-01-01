import database from "./shared/database";
import { WorkAccidentDto, WorkAccident } from "../types";
import { config } from "@/config";

// [GRADO DE LA LESIÓN].[Leve] -> Leve
function getInjury(injury: string) {
    const match = injury.match(/\[*\]\.\[(.+)\]/)

    if (!match) {
        throw new Error(`Invalid injury ${injury}`)
    }

    return match[1]
}

// "[CICLO].[Enero-octubre 2020]" -> 2020
function getYear(cycle: string): number {
    const match = cycle.match(/\d{4}/)
    return match ? parseInt(match[0]) : 0
}

type Result = {
    [year: number]: {
        [injury: string]: number
    }
}

export async function getWorkAccidents(): Promise<Result[]> {
    const databaseDtos = await database.get<WorkAccidentDto>(config.work_accidents.file)

    return databaseDtos.reduce((acc, dto) => {
        const year = getYear(dto["[CICLO]"])
        const injury = getInjury(dto["[GRADO DE LA LESIÓN]"])
        const accidents = dto["[Measures].[Accidentes]"]

        if (!acc[year]) {
            acc[year] = {}
        }

        if (!acc[year][injury]) {
            acc[year][injury] = 0
        }

        acc[year][injury] += accidents

        return acc
    }, {})
}

function normalizeKey(key: string) {
    return key.replace(/ /g, "_").replaceAll(".", "_").replaceAll("[", "").replaceAll("]", "")
}

// '[CNAE_09]': '[CNAE_09].[AGRICULTURA]' -> AGRICULTURA
// '[CNAE_09]': '[CNAE_09].[SERVICIOS].[H Transporte y almacenamiento]' -> SERVICIOS
function getSector(cnae: string) {
    const match = cnae.match(/\[CNAE_09\]\.\[(.+)\]/)

    if (!match) {
        throw new Error(`Invalid cnae ${cnae}`)
    }

    return match[1]
}

export async function getAccidentsBySector(): Promise<any[]> {
    const databaseDtos = await database.get<WorkAccidentDto>(config.work_accidents.file)
    
    return []
}
export async function getWorkAccidentsCNAE(): Promise<any[]> {
    const databaseDtos = await database.get<WorkAccidentDto>(config.work_accidents.file)

    return databaseDtos.reduce((acc, dto) => {
        const year = getYear(dto["[CICLO]"])
        const injury = getInjury(dto["[GRADO DE LA LESIÓN]"])
        const accidents = dto["[Measures].[Accidentes]"]
        const cnae =  normalizeKey(dto["[CNAE_09]"])
        const sector = getSector(dto["[CNAE_09]"])

        if(injury === "TOTAL")   return acc
        if(!acc[cnae]){
            acc[cnae] = {}
        }

        if (!acc[cnae][year]) {
            acc[cnae][year] = {}
        }

        if (!acc[cnae][year][injury]) {
            acc[cnae][year][injury] = 0
        }

        acc[cnae][year][injury] += accidents

        return acc
    }, {})
}
