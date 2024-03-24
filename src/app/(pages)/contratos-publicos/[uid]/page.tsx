import { getContractsByCompany } from '@/lib/public-contracts'
import { notFound } from 'next/navigation'
import { formatCurrency } from '@/lib/shared/formatters'

interface CompanyPageProps {
  params: {
    uid: string
  }
}

export default async function CompanyPage (context: CompanyPageProps) {
  const { uid } = context.params
  const contracts = await getContractsByCompany(uid)

  if (contracts.length === 0) {
    notFound()
  }

  const { company } = contracts[0]

  return (
        <>
        <div className="py-4">
            <h1 className="text-3xl font-bold">
                {company.name}
            </h1>
            <p className="opacity-60">
                {company.identifier}
            </p>
        </div>

        <div className='border-b border-slate-600 pt-4 mb-4' />

        {contracts.map((contract, index) => (
            <div key={`${contract.id}-${index}`} className="py-10">
                <div className="text-xl">
                    {contract.year} - {contract.description}
                </div>
                <ul className="py-2 opacity-60">
                    <li>Duración: {contract.durationMonths} meses</li>
                    <li>Cantidad: {formatCurrency(contract.amount)}</li>
                </ul>
            </div>
        ))}
        </>
  )
}
