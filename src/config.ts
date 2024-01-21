type Config = Record<string, {
  file: string
  url: string
  last_update: string
}>

export const config: Config = {
  // Work
  unemployment: {
    file: 'parados_por_edad.json',
    url: 'https://web.larioja.org/dato-abierto/datoabierto?n=opd-29',
    last_update: '2023-11-02'
  },
  unemployment_by_sex: {
    file: 'tasas_por_sexo.json',
    url: 'https://web.larioja.org/dato-abierto/datoabierto?n=opd-34',
    last_update: '2023-11-02'
  },
  work_accidents: {
    file: 'accidentes_sector.json',
    url: 'https://web.larioja.org/dato-abierto/datoabierto?n=opd-355',
    last_update: '2023-01-02'
  },
  work_occupancy: {
    file: 'ocupados_por_sector.json',
    url: 'https://web.larioja.org/dato-abierto/datoabierto?n=opd-28',
    last_update: '2023-11-02'
  },

  // Energy
  fuel: {
    file: 'combustible.json',
    url: 'https://web.larioja.org/dato-abierto/datoabierto?n=opd-102',
    last_update: '2023-11-08'
  },
  electricity: {
    file: 'electrica.json',
    url: 'https://web.larioja.org/dato-abierto/datoabierto?n=opd-101',
    last_update: '2023-12-08'
  }
}

export interface MenuItem {
  title: string
  items: Array<{
    title: string
    url: string
  }>
}

export const menuItems: MenuItem[] = [{
  title: 'Empleo',
  items: [
    {
      title: 'Desempleo',
      url: '/desempleo'
    },
    {
      title: 'Accidentes laborales',
      url: '/accidentes-laborales'
    }
  ]
}, {
  title: 'Energía',
  items: [
    {
      title: 'Consumo de combustible',
      url: '/consumo-de-combustible'
    },
    {
      title: 'Consumo eléctrico',
      url: '/consumo-electrico'
    }
  ]
}]
