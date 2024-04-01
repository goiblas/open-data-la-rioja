import Link from 'next/link'

export default function Footer () {
  return (
    <footer className='text-slate-300 text-xs py-8 px-2 w-full max-w-[900px] mx-auto text-center md:text-left flex flex-col md:flex-row justify-between gap-4'>
      <div>
        <div className='mb-1'>Desarrollado con ♥ por:</div>
        <div>
          <Link className="underline-offset-2 decoration-slate-600 underline hover:decoration-transparent" href="https://goiblas.com/">Jesús Olazagoitia</Link>, {' '}
          <Link className="underline-offset-2 decoration-slate-600 underline hover:decoration-transparent" href="https://www.gabrielromero.dev/">Gabriel Romero</Link>
        </div>
      </div>

      <div>
        Código disponible en <Link className="underline-offset-2 decoration-slate-600 underline hover:decoration-transparent" href="https://github.com/goiblas/open-data-la-rioja">GitHub</Link>
      </div>
    </footer >
  )
}
