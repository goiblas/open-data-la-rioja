import { expect, test, afterEach, vi, describe } from 'vitest'
import { getFuelConsumptionPerType } from './fuel-consumption'
import database from './shared/database'

describe('getFuelConsumptions', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should return fuel consumptions', async () => {
        const databaseMock = vi.spyOn(database, 'get')
        const databaseDtos = [{
            "[TIEMPO]": "[Mes].[2021].[Enero]",
            "[Measures].[Consumo en La Rioja (Toneladas)]": 1,
            "[TIPO DE COMBUSTIBLE]": "[Tipo de combustible].[Gasolina]",
        }]
        
        const expected = [{
            year: 2021,
            Gasolina: 1
        }]

        databaseMock.mockResolvedValue(databaseDtos)

        const { data } = await getFuelConsumptionPerType()

        expect(data).toEqual(expected)
    })

    test('should return categories by year and type', async () => {
        const databaseMock = vi.spyOn(database, 'get')
        const databaseDtos = [{
            "[Measures].[Var (%) en lo que va de año (La Rioja)]": 12.397074813162963,
            "[Measures].[Var (%) anual (La Rioja)]": 24.824999999999996,
            "[Measures].[Var (%) mensual (La Rioja)]": 19.08699177942789,
            "[TIPO DE COMBUSTIBLE]":"[TIPO DE COMBUSTIBLE].[Gasolina].[Gasolina 98 I.O.]",
            "[Measures].[Consumo en La Rioja (Toneladas)]":	2246.85,
            "[TIEMPO]": "[TIEMPO].[2022].[Marzo (2022)]"
        },{
            "[Measures].[Var (%) en lo que va de año (La Rioja)]": 12.397074813162963,
            "[Measures].[Var (%) anual (La Rioja)]": 24.824999999999996,
            "[Measures].[Var (%) mensual (La Rioja)]": 19.08699177942789,
            "[TIPO DE COMBUSTIBLE]":"[TIPO DE COMBUSTIBLE].[Gasolina].[Gasolina 98 I.O.]",
            "[Measures].[Consumo en La Rioja (Toneladas)]":	22,
            "[TIEMPO]": "[TIEMPO].[2023].[Marzo (2023)]"
        }, {
            "[Measures].[Var (%) en lo que va de año (La Rioja)]": 12.397074813162963,
            "[Measures].[Var (%) anual (La Rioja)]": 24.824999999999996,
            "[Measures].[Var (%) mensual (La Rioja)]": 19.08699177942789,
            "[TIPO DE COMBUSTIBLE]": "[TIPO DE COMBUSTIBLE].[Fuelóleo BIA]",
            "[Measures].[Consumo en La Rioja (Toneladas)]":	2246.85,
            "[TIEMPO]": "[TIEMPO].[2023].[Abril (2023)]"
        }, {
            "[Measures].[Var (%) en lo que va de año (La Rioja)]": 12.397074813162963,
            "[Measures].[Var (%) anual (La Rioja)]": 24.824999999999996,
            "[Measures].[Var (%) mensual (La Rioja)]": 19.08699177942789,
            "[TIPO DE COMBUSTIBLE]": "[TIPO DE COMBUSTIBLE].[Fuelóleo BIA]",
            "[Measures].[Consumo en La Rioja (Toneladas)]":	2246.85,
            "[TIEMPO]": "[TIEMPO].[2023].[Mayo (2023)]"
        }]
        
        const expected = [{
            "Gasolina": 2246.85,
            "year": 2022,
        }, {
            "Fuelóleo BIA": 4493.7,
            "Gasolina": 22,
            "year": 2023,
        }]

        databaseMock.mockResolvedValue(databaseDtos)

        const { data, index, categories } = await getFuelConsumptionPerType()

        expect(data).toEqual(expected)
        expect(categories).toEqual(expect.arrayContaining(["Gasolina", "Fuelóleo BIA"]))
        expect(index).toEqual("year")
    })
})