import { XMLParser } from 'fast-xml-parser'
import fs from 'node:fs'
import https from 'node:https'
import config from '../data.config.json' assert { type: 'json' }

const parser = new XMLParser({
  ignoreAttributes: false,
  removeNSPrefix: true,
  attributeNamePrefix: '@_'
})

const ORIGIN_XML: string = 'https://ias1.larioja.org/opendata/datosRDF'
const DEST: string = 'data'

const files: Array<{ downloadUrl?: string; fileName: string; url: string }> =
  Object.values(config)

async function getXML(): Promise<string> {
  const response = await fetch(ORIGIN_XML)
  return await response.text()
}

async function download(url: string, dest: string) {
  return await new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)

    const handleResponse = (response: {
      pipe: (arg0: fs.WriteStream) => void
    }) => {
      response.pipe(file)
      file.on('finish', () => {
        file.close(resolve)
      })
    }

    const handleError = (err: { message: any }) => {
      fs.unlink(dest, () => {})
      reject(err.message)
    }

    https.get(url, handleResponse).on('error', handleError)
  })
}

async function main(): Promise<void> {
  const xml = await getXML()
  const json = parser.parse(xml)

  const datasets = json.RDF.Catalog.dataset

  for (const file of files) {
    if (file.downloadUrl) {
      try {
        await download(file.downloadUrl, `${DEST}/${file.fileName}`)
        console.log(`Downloaded ${file.fileName}`)
      } catch (error) {
        console.error(error)
      }
      continue
    }

    const dataset = datasets.find(d => d.Dataset?.['@_about'] === file.url)

    if (!dataset) {
      console.error(`Dataset not found for ${file.fileName}`)
      continue
    }

    const jsonDistribution = dataset.Dataset.distribution.find(
      d => d.Distribution?.mediaType === 'application/json'
    )
    if (!jsonDistribution) {
      console.error(`Distribution not found for ${file.fileName}`)
      continue
    }

    const jsonUrl: string =
      jsonDistribution.Distribution.downloadURL['@_resource']
    try {
      await download(jsonUrl, `${DEST}/${file.fileName}`)
      console.log(`Downloaded ${file.fileName}`)
    } catch (error) {
      console.error(error)
    }
  }
}

main()
