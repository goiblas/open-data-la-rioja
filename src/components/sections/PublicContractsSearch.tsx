'use client'
import { type Contract } from '@/lib/public-contracts'
import { useState, useEffect } from 'react'
import Autocomplete from '../ui/Autocomplente'
import { useDebounceValue } from 'usehooks-ts'
import { useRouter } from 'next/navigation'

type ContractWithUrl = Contract & {
  url: string
}

export default function Search() {
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounceValue(search, 500)
  const [results, setResults] = useState<ContractWithUrl[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(!!search)
  }, [search])

  useEffect(() => {
    if (debouncedSearch) {
      fetch(`/api/public-contracts?q=${debouncedSearch}`)
        .then(async response => await response.json())
        .then(data => {
          const contracts = data.map((contract: Contract) => ({
            ...contract,
            url: `/contratos-publicos/${contract.company.identifier.toLocaleLowerCase()}`
          }))
          setLoading(false)
          setResults(contracts as ContractWithUrl[])
        })
    } else {
      setLoading(false)
      setResults([])
    }
  }, [debouncedSearch])

  return (
    <Autocomplete
      placeholder="Buscar..."
      onChange={value => {
        setSearch(value)
      }}
      notMatchText="No se encontraron resultados"
      loading={loading}
      options={results}
      renderOption={contract => (
        <div>
          <div>{contract.description}</div>
          <div className="opacity-50">{contract.company.name}</div>
        </div>
      )}
      onSelect={contract => {
        router.push(contract.url)
      }}
    />
  )
}
