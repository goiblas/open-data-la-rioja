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