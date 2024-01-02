import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Interna',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <div className='md:grid md:grid-cols-[280px_1fr] gap-6 min-h-[100vh]'>
            <div className="md:hidden">
              <div className="border-b border-b-slate-800">
                  <Header />
              </div>

              <Breadcrumbs />
            </div>

            <div className="hidden md:block pr-6 border-r border-r-slate-800">
              <Navbar />
            </div>

            <div className='grow md:py-4 flex flex-col'>
              <main className='content-layout grow'>
                {children}
              </main>

              <Footer />
            </div>
        </div>
    )
}
