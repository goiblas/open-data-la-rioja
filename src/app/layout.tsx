import type { Metadata } from 'next'
import { IBM_Plex_Sans, Mulish } from 'next/font/google'
import './globals.css'
import clsx from 'clsx'
import { Analytics } from '@vercel/analytics/react'

const incosolata = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish',
  display: 'swap'
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
  weight: ['400', '600'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Open Data La Rioja',
  description: 'Visualización de los datos abiertos del Gobierno de La Rioja'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className='dark'>
      <body className={clsx(incosolata.variable, ibmPlexSans.variable, 'bg-white dark:bg-slate-950')}>
          {children}
          <Analytics />
      </body>
    </html>
  )
}
