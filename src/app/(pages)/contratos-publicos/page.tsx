import { getContracts } from '@/lib/public-contracts'
import { formatCurrency } from '@/lib/shared/formatters'
import Link from 'next/link'

interface CompanyTop {
  name: string
  amount: number
  identifier: string
  url: string
}

async function getTopCompanies (): Promise<CompanyTop[]> {
  const data = await getContracts()

  const companies = data.reduce<Record<string, CompanyTop>>((acc, contract) => {
    const { company, amount } = contract
    if (company.name in acc) {
      const currentMaxAmount = acc[company.name].amount
      if (amount > currentMaxAmount) {
        acc[company.name].amount = amount
      }
    } else {
      acc[company.name] = {
        name: company.name,
        amount,
        identifier: company.identifier,
        url: `/contratos-publicos/${company.identifier.toLocaleLowerCase()}`
      }
    }
    return acc
  }, {})

  return Object.values(companies).sort((a, b) => b.amount - a.amount).slice(0, 10)
}

export default async function Page () {
  const topCompanies = await getTopCompanies()

  return (
        <>
        <h1 className="text-3xl text-slate-100 font-bold font-display mb-8 mt-3 md:mt-8">
            Top 10 empresas con adjudicaciones de mayor importe
        </h1>

        {topCompanies.map((company) => (
            <div className="py-4" key={company.url}>
                <Link href={company.url}>
                    <div className="text-lg text-slate-100 font-bold font-display mb-1">{company.name}</div>
                    <div>{formatCurrency(company.amount)}</div>
                </Link>
            </div>
        ))}
        </>
  )
}
