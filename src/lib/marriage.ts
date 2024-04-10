import database from './shared/database'

const ageGroups: string[] = [
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 15 a 19 años]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 20 a 24 años]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 25 a 29 años]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 30 a 34 años]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 35 a 39 años]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 40 a 44 años]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 45 a 49 años]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 50 a 54 años]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 55 a 59 años]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 60 a 64 años]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 65 a 69 años]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 70 a 74 años]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 75 a 79 años]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[de 80 a 84 años]',
  '[Measures].[Matrimonios], [GRUPOS DE EDAD SEGUNDO].[85 años o más]'
]

export const getYearsWithData = (data: object[]) => {
  const yearsFiltered = data.map((el: object) => el['[AÑOS]'])
  const uniqueYears = [...new Set(yearsFiltered)]
  const onlyYears = uniqueYears.map(el => el.split('.')[1].replace('[', '').replace(']', ''))
  return onlyYears
}

export const getMarriagesByAgeGroups = () => {
}

export const groupByYear = async () => {
  const data = await database.get('evolucion_edad_matrimonio.json')
  const dataFiltered = data.reduce((acc, el) => {
    if (acc[el['[AÑOS]'].split('.')[1].replace('[', '').replace(']', '')]) {
      acc[el['[AÑOS]'].split('.')[1].replace('[', '').replace(']', '')].push(el)
    } else {
      acc[el['[AÑOS]'].split('.')[1].replace('[', '').replace(']', '')] = [el]
    }
    return acc
  }, {})
  return dataFiltered
}

export const getCountMarriagesByGroups = async () => {
  const data = await groupByYear()
  const result = Object.keys(data).map((el, index) => {
    const dataMapped = data[el].reduce((acc, each) => {
      ageGroups.forEach(ageGroup => {
        if (!acc[ageGroup]) {
          acc[ageGroup] = each[ageGroup] ?? 0
        } else {
          acc[ageGroup] = acc[ageGroup] + each[ageGroup]
        }
      })
      return acc
    }, {})
    return { año: el, ...dataMapped }
  })

  const cleanedData = result.map(el => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.entries(el).reduce((acc, [key, value]) => {
      if (key === 'año') {
        return { ...acc, [key]: value }
      }
      const cleanedElement = key.split(',')[1].split('.')[1].replace('[', '').replace(']', '')
      return { ...acc, [cleanedElement]: value }
    }, {})
  }
  )

  const categories = ageGroups.map(e => {
    return e.split(',')[1].split('.')[1].replace('[', '').replace(']', '')
  })
  return { cleanedData, categories, index: 'año' }
}
