import Link from 'next/link'
import { Fragment } from 'react'

const contributors = [
  {
    name: 'Jesús Olazagoitia',
    url: 'https://goiblas.com/'
  },
  {
    name: 'Gabriel Romero',
    url: 'https://www.gabrielromero.dev/'
  },
  {
    name: 'Ibai Alberdi',
    url: 'https://github.com/ibaiway'
  },
  {
    name: 'mpigagr',
    url: 'https://github.com/mpigagr'
  }
]

export default function Footer() {
  return (
    <footer className="text-slate-300 text-xs py-8 px-2 w-full max-w-[900px] mx-auto text-center md:text-left flex flex-col md:flex-row justify-between gap-4">
      <div>
        <div className="mb-1">Desarrollado con ♥ por:</div>
        <div>
          {contributors.map((contributor, index) => (
            <Fragment key={contributor.url}>
              <Link
                href={contributor.url}
                className="underline-offset-2 decoration-slate-600 underline hover:decoration-transparent"
              >
                {contributor.name}
              </Link>
              {index < contributors.length - 2 && ', '}
              {index === contributors.length - 2 && ' y '}
            </Fragment>
          ))}
        </div>
      </div>

      <div>
        Código disponible en{' '}
        <Link
          className="underline-offset-2 decoration-slate-600 underline hover:decoration-transparent"
          href="https://github.com/goiblas/open-data-la-rioja"
        >
          GitHub
        </Link>
      </div>
    </footer>
  )
}
