import type { Metadata } from 'next'
import PublicContractsSearch from '@/components/sections/PublicContractsSearch'

export const metadata: Metadata = {
  title: 'Contratos Públicos'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="pt-4">
        <div className='mb-6 md:mb-14'>
            <label>
                <div className='text-slate-400 py-2 text-sm'>
                    Buscador de contratos públicos
                </div>
                <PublicContractsSearch />
            </label>
        </div>
        <div className='text-slate-400'>
          {children}
        </div>
    </div>
  )
}
