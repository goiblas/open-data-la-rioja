export interface WorkAccidentDto {
  '[CNAE_09]': string
  '[GRADO DE LA LESIÓN]': string
  '[CICLO]': string
  '[TIPO ACCIDENTE]': string
  '[Measures].[Accidentes]': number
}

export interface WorkAccident {
  cnae: string
  injury: string
  cycle: string
  year: number
  accidentType: string
  accidents: number
}
