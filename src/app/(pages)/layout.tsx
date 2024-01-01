import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Interna',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <div className='grid grid-cols-[280px_1fr] gap-6 min-h-[100vh]'>
            <div className="pr-6 border-r border-r-slate-800">
              <Navbar />
            </div>

            <div className='grow py-4 flex flex-col'>
              <main className='content-layout grow'>
                {children}
              </main>

              <Footer />
            </div>
        </div>
    )
}
