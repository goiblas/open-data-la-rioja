import Link from 'next/link'

export default function NotFound () {
  return (
    <div className='h-[100dvh] grid place-content-center'>
      <div className='text-center p-5'>
        <div className='mb-10'>
          <Link href="/" className='logo'>
            <img src="open-data-la-rioja.svg" alt="Open Data La Rioja" className="size-40 md:size-52 mx-auto" />
          </Link>
          <h2 className='text-3xl text-slate-100 font-bold font-display mb-3'>Página no encontrada</h2>
          <p className="text-lg text-slate-400">La página que estás intentando acceder no está disponible.</p>
        </div>
        <Link href="/" className='button'>Ir a Inicio</Link>
      </div>
    </div>
  )
}
