import { menuItems } from '@/config'
import Footer from '@/components/layout/Footer'
import GridMenu from '@/components/layout/GridMenu'

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col justify-center">
      <main className="text-slate-50 mb-[2vh]">
        <div className="text-center mb-[5vh] pt-4">
          <h1 className="logo text-4xl mb-3">
            Open data <span className="logo-text-gradient">La Rioja</span>
          </h1>
          <p className="text-lg text-slate-400">
            Visualización de los datos abiertos <br />
            del Gobierno de La Rioja
          </p>
        </div>

        <GridMenu items={menuItems} />
      </main>

      <Footer />
    </div>
  )
}
