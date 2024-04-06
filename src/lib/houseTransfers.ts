/* eslint-disable @typescript-eslint/no-unused-vars */
import database from './shared/database'
import { config } from '@/config'

export interface HouseTransferDTO {
  '[Measures].[Número de transmisiones (La Rioja)]': number
  '[Measures].[Var (%) en lo que va de año (La Rioja)]': number
  '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO]': string
  '[Measures].[Var (%) anual (La Rioja)]': number
  '[Measures].[Var (%) mensual (La Rioja)]': number
  '[TIEMPO]': string
}

export interface HouseTransfer {
  year: number
  month: string
  'Vivienda usada': number
  'Vivienda nueva': number
}

const PRE_OWNED_HOUSING_TYPE = '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO].[Compraventa].[Compraventa vivienda usada]' as const
const NEW_BUILD_HOUSING_TYPE = '[VIVIENDA Y COMPRAVENTA SEGÚN ESTADO].[Compraventa].[Compraventa vivienda nueva]' as const

export async function getHouseTransfers (): Promise<HouseTransfer[]> {
  const reponse = await database.get<HouseTransferDTO>(config.house_transfer.fileName)

  // TODO: Implement this function
  return []
}
