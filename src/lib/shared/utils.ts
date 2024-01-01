
// "[TIEMPO].[2023].[Octubre (2023)]" -> "Octubre"
export function getMonthFromTimeDto(time: string): string {
    const month = time.split('.')[2]

    const monthRegex = /\w+/

    if(!month || !monthRegex.test(month)) {
        throw new Error(`Error getting month from ${time}`)
    }

    const monthName = monthRegex.exec(month)![0]
    return monthName
}

// 	"[TIEMPO].[2023].[Octubre (2023)]" -> 2023
export function getYearFromTimeDto(time: string): number {
    const year = time.split('.')[1]

    const yearRegex = /\d{4}/

    if (!year || !yearRegex.test(year)) {
        throw new Error(`Error getting year from ${time}`)
    }

    const yearNumber = yearRegex.exec(year)![0]
    return Number(yearNumber)
}


export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function round(value: number): number {
    return Math.round(value * 100) / 100
}