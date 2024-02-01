import { XMLParser } from 'fast-xml-parser'
import fs from 'node:fs'
import https from 'node:https'

const parser = new XMLParser({
  ignoreAttributes: false,
  removeNSPrefix: true,
  attributeNamePrefix: '@_'
})

const url = 'https://ias1.larioja.org/opendata/datosRDF'
const destFolder = 'data'

const files = [{
  fileName: 'parados_por_edad.json',
  url: 'https://web.larioja.org/dato-abierto/datoabierto?n=opd-29',
},
{
  fileName: 'tasas_por_sexo.json',
  url: 'https://web.larioja.org/dato-abierto/datoabierto?n=opd-34',
},
{
  fileName: 'accidentes_sector.json',
  url: 'https://web.larioja.org/dato-abierto/datoabierto?n=opd-355',
},
{
  fileName: 'ocupados_por_sector.json',
  url: 'https://web.larioja.org/dato-abierto/datoabierto?n=opd-28',
},
{
  fileName: 'combustible.json',
  url: 'https://web.larioja.org/dato-abierto/datoabierto?n=opd-102',
},
{
  fileName: 'electrica.json',
  url: 'https://web.larioja.org/dato-abierto/datoabierto?n=opd-101',
}, {
  fileName: 'gas.json',
  url: 'https://web.larioja.org/dato-abierto/datoabierto?n=opd-100999',
}]

async function getXML() {
  const response = await fetch(url)
  return await response.text()
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)

    https.get(url, function (response) {
      response.pipe(file)
      file.on('finish', function () {
        file.close(resolve(true)) // close() is async, call cb after close completes.
      })
    }).on('error', function (err) { // Handle errors
      fs.unlink(dest) // Delete the file async. (But we don't check the result)
      reject(err.message)
    })
  })
}

async function main() {
  const xml = await getXML()
  const json = parser.parse(xml)

  const datasets = json.RDF.Catalog.dataset
  // save json

  for (const file of files) {
    const dataset = datasets.find(d => d.Dataset?.['@_about'] === file.url)

    if (!dataset) {
      console.error(`Dataset not found for ${file.fileName}`)
      continue;
    }

    const jsonDistribution = dataset.Dataset.distribution.find(d => d.Distribution?.mediaType === 'application/json')
    if (!jsonDistribution) {
      console.error(`Distribution not found for ${file.fileName}`)
      continue;
    }

    const jsonUrl = jsonDistribution.Distribution.downloadURL['@_resource']
    try {
      await download(jsonUrl, `${destFolder}/${file.fileName}`)
      console.log(`Downloaded ${file.fileName}`)
    } catch (error) {
      console.error(error)
    }
  }

}

main()
