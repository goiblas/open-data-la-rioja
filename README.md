# Visualización de Datos Abiertos del Gobierno de La Rioja

## Configuración del Entorno

Para configurar el entorno de desarrollo, necesitarás tener instalado NodeJS instalado en tu sistema. Puedes descargarlo en [nodejs.org](https://nodejs.org/).

Una vez que tengas NodeJS instalado, puedes clonar el repositorio y ejecutar el siguiente comando para instalar las dependencias del proyecto:

```bash
npm install
```

## Ejecución del Proyecto
  
Para ejecutar el proyecto, puedes utilizar el siguiente comando:

```bash
npm run dev
```

Este comando ejecutará el proyecto en modo de desarrollo. Abre [http://localhost:3000](http://localhost:3000) para verlo en tu navegador.

## Cómo crear un nueva página

Para crear una nueva página, puedes crear una carpeta en `src/app/(pages)`  el nombre de la carpeta será el *slug* de la página, dentro de la carpeta añadir un archivo `page.mdx`. Por ejemplo, si quieres crear una página en la ruta `/poblacion`, puedes crear la siguiente estructura:

```bash
src/app/pages/poblacion/page.mdx
```

Dentro del archivo `page.mdx` puedes escribir contenido en formato Markdown, con componentes de React. 

Puedes definir el título y la descripción de la página exportando un objeto *metadata* con las propiedades `title` y `description`. Por ejemplo:

```jsx
export const metadata = {
  title: 'Población',
  description: 'Información sobre la población de La Rioja'
}
```

### Cómo añadir una página al menú de navegación

Para añadir una página al menú de navegación, puedes añadir un objeto al array `menuItems` en el archivo `src/app/config.ts`. puedes añadirlo dentro de una categoría exitente o crear una nueva categoría, por ejemplo:

```jsx
export const menuItems = [{
  title: 'Demografía',
  items: [
    {
      title: 'Población',
      url: '/poblacion'
    }, {
      title: 'Emigración',
      url: '/emigracion'
    }
  ]
}
]
```

## Cómo añadir un nuevo dataset

Busca la fuente de datos que quieres añadir en la [web de datos abiertos del Gobierno de La Rioja](https://web.larioja.org/dato-abierto). Una vez que hayas encontrado el dataset que quieres añadir, descarga el archivo JSON y guárdalo en la carpeta `data`.

Para mantener los datos actualizados, añade el archivo JSON a la lista de archivos a descargar en el archivo `data.config.json`. Por ejemplo:

```json
{
    "population": {
        "fileName": "padron_distrito.json",
        "url": "https://web.larioja.org/dato-abierto/datoabierto?n=opd-66"
    },
}
```

La clave `population` es el nombre del dataset, y el valor es un objeto con las propiedades `fileName` y `url`. `fileName` es el nombre del archivo JSON que has descargado, y `url` es la URL de la fuente de datos.

Una vez que hayas añadido el archivo JSON a la lista de archivos a descargar, puedes ejecutar el siguiente comando para confirmar que los datos se descargan correctamente:

```bash
npm run update-data
```

En algunos datasets antigüos, es posible que la descarga falle, en ese caso, puedes añadir la url de descarga directamente en el archivo `data.config.json` con la propiedad `downloadUrl`. Por ejemplo:

```json
{
    "population": {
        "fileName": "padron_distrito.json",
        "url": "https://web.larioja.org/dato-abierto/datoabierto?n=opd-66",
        "downloadUrl": "https://ias1.larioja.org/opendata/download?r=Y2Q9MzU1fGNmPTA0"
    },
}
```

## Cómo formatear los datos

Para hacer uso de un dataset, es necesario hacer un normalizado y formateo previo de los datos. Para ello puedes crear un archivo en la carpeta `src/lib` con el nombre del dataset, por ejemplo, si quieres formatear los datos del dataset `population`, puedes crear el archivo `src/lib/population.ts`.

Dentro del archivo, utiliza `src/lib/shared/database` para importar los datos del dataset. puedes obtener el nombre del dataset de `src/congig` Por ejemplo:

```typescript 
import database from './shared/database'
import { config } from '@/config'

async function getPopulation () {
    const reponse = await database.get(config.population.fileName)

    // Formatear los datos

    return response
}
```

## Cómo añadir types a los datos

Para crear los types de los datos, puedes utilizar la herramienta [JSON to TS](https://transform.tools/json-to-typescript). Copia la interface generada y utilizala al obtener los datos del dataset. Por ejemplo:

```typescript
interface PopulationDto {
  '[AÑOS]': string
  '[SECCIÓN CENSAL]': string
  '[Measures].[Habitante]': number
}

async function getPopulation () {
    const reponse = await database.get<PopulationDto>(config.population.fileName)
```

## Cómo añadir un gráfico

Para crear un gráfico, añade un nuevo fichero en la carpeta `src/components/charts` con el nombre de la visualización. Por ejemplo, si quieres visualizar la evolución de la población por año, puedes ser algo así `src/components/charts/PopulationPerYear.tsx`.

Para cargar los datos, puedes utilizar la función que has creado en `src/lib/population.ts`. al utilizar server components podemos hacer la llamada en el cuerpo del component, ejemplo:

```jsx
import { getPopulationTotalPerYear } from '@/lib/population'

export default async function PopulationPerYear () {
  const { index, data, categories } = await getPopulationTotalPerYear()

  return (
    // ...
  )
}
```

Para renderizar el gráfico, puedes utilizar la biblioteca [tremor](https://www.tremor.so/docs/visualizations/area-chart). Por ejemplo:

```jsx
import { AreaChart } from 'tremor'

export default async function PopulationPerYear () {
  const { index, data, categories } = await getPopulationTotalPerYear()

  return (
    <AreaChart
      data={data}
      index={index}
      categories={categories}
    />
  )
}
```

## Cómo importar un gráfico en una página

Para importar un gráfico en una página, puedes importar el componente en el archivo `page.mdx`. Por ejemplo:

```mdx
import PopulationPerYear from '@/components/charts/PopulationPerYear'

# Población

<PopulationPerYear />
```