import Link from 'next/link'
import { menuItems } from '@/config'
import Footer from '@/components/layout/Footer'
import GridMenu from '@/components/layout/GridMenu'

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col justify-center'>
      <main className="py-24 text-slate-50">

        <div className='mb-16 text-center'>
          <h1 className='logo text-4xl mb-2'>Open data <span className='logo-text-gradient'>La Rioja</span></h1>
          <p className="text-lg text-slate-400">Visualización de los datos abiertos del Gobierno de La Rioja</p>
        </div>

        <GridMenu items={menuItems} />
      </main>

      <Footer />
    </div>
  )
}
