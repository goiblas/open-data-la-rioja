import { getContractsByCompany, getCompanies } from '@/lib/public-contracts'
import { notFound } from 'next/navigation'
import { formatCurrency } from '@/lib/shared/formatters'

interface CompanyPageProps {
  params: {
    uid: string
  }
}

export async function generateStaticParams () {
  const companies = await getCompanies()

  return companies.map((company) => ({
    uid: company.identifier
  }))
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
            <h1 className="text-3xl text-slate-100 font-bold font-display mb-2">
                {company.name}
            </h1>
            <p>
                {company.identifier}
            </p>
        </div>

        <div className='border-b border-slate-800 pt-4 mb-4' />

        {contracts.map((contract, index) => (
            <div key={`${contract.id}-${index}`} className="py-4 md:py-6">
                <div className="text-slate-100">
                    {contract.year} - {contract.description}
                </div>
                <ul className="py-2 text-sm">
                    <li>Duración: {contract.durationMonths} meses</li>
                    <li>Cantidad: {formatCurrency(contract.amount)}</li>
                </ul>
            </div>
        ))}
        </>
  )
}
