/* eslint-disable @typescript-eslint/no-unused-vars */
import database from './shared/database'
import { config } from '@/config'

export interface CarRegistrationDto {
  '[Measures].[Var (%) anual], [NUEVO / USADO].[Todos los vehículos]': number
  '[Measures].[Var (%) mensual], [NUEVO / USADO].[Vehículo nuevo]': any
  '[Measures].[Var (%) anual], [NUEVO / USADO].[Vehículo usado]': number
  '[Measures].[Var (%) en lo que va de año], [NUEVO / USADO].[Vehículo nuevo]': number
  '[Measures].[Var (%) en lo que va de año], [NUEVO / USADO].[Vehículo usado]': number
  '[Measures].[Var (%) mensual], [NUEVO / USADO].[Vehículo usado]': any
  '[Measures].[Var (%) mensual], [NUEVO / USADO].[Todos los vehículos]': any
  '[Measures].[Matriculaciones en La Rioja], [NUEVO / USADO].[Todos los vehículos]': number
  '[Measures].[Matriculaciones en La Rioja], [NUEVO / USADO].[Vehículo nuevo]': number
  '[Measures].[Matriculaciones en La Rioja], [NUEVO / USADO].[Vehículo usado]': number
  '[Measures].[Var (%) anual], [NUEVO / USADO].[Vehículo nuevo]': number
  '[Measures].[Var (%) en lo que va de año], [NUEVO / USADO].[Todos los vehículos]': number
  '[TIEMPO]': string
}

export interface CarRegistration {
  year: number
  month: string
  'Vehículo nuevo': number
  'Vehículo usado': number
}

export async function getCarRegistrations(): Promise<CarRegistration[]> {
  const response = await database.get<CarRegistrationDto>(
    config.car_registrations.fileName
  )

  return []
}
