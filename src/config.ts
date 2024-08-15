import * as configJson from '../data.config.json'

type Config = Record<
  string,
  {
    fileName: string
    url: string
    downloadUrl?: string
  }
>

export const config: Config = configJson

export interface MenuItem {
  title: string
  items: Array<{
    title: string
    url: string
  }>
}

export const menuItems: MenuItem[] = [
  {
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
  },
  {
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
  },
  {
    title: 'Demografía',
    items: [
      {
        title: 'Población',
        url: '/poblacion'
      },
      {
        title: 'Emigración',
        url: '/emigracion'
      },
      {
        title: 'Inmigración',
        url: '/inmigracion'
      },
      {
        title: 'Evolución edad en matrimonio',
        url: '/evolucion-edad-matrimonio'
      },
      {
        title: 'Natalidad',
        url: '/natalidad'
      },
      {
        title: 'Mortalidad',
        url: '/mortalidad'
      }
    ]
  },
  {
    title: 'Sector público',
    items: [
      {
        title: 'Contratos públicos',
        url: '/contratos-publicos'
      }
    ]
  },
  {
    title: 'Economía',
    items: [
      {
        title: 'Evolución del IPC',
        url: '/evolucion-del-ipc'
      },
      {
        title: 'Gastos e ingresos',
        url: '/gastos-ingresos'
      },
      {
        title: 'Sociedades creadas',
        url: '/sociedades-creadas'
      }
    ]
  }
]
