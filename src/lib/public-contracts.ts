import database from './shared/database'
import { config } from '@/config'

export interface Company {
  name: string
  identifier: string
  identifierType: string
}

export interface Contract {
  id: string
  description: string
  year: number
  durationMonths: number
  status: string
  adjudicationStatus: string
  amount: number
  company: Company
}

export interface ContractDTO {
  FECHA_PUBLICA_RENUNCIA?: string
  ENLACE_PERFIL_CONTRATANTE?: string
  PRESUPUESTO_LICITACION: number
  ADJUDICA_IMPORTE?: number
  ARTICULO_MOTIVO_NEGOCIADO?: string
  ADJUDICA_RESULTADO?: string
  OBJETO_CONTRATO: string
  FECHA_PUBLICA_LICITACION?: string
  ADJUDICA_TIPO_IDEN?: string
  TIPO_CONTRATO: string
  ORGANO_CONTRATACION: string
  DURACION_MESES?: number
  FECHA_PUBLICA_DESISTIMIENTO?: string
  FECHA_PUBLICA_PREVIO?: string
  ADJUDICA_NUM_LICITADORES?: number
  ANUNCIOS?: string
  FORMA_ADJUDICACION: string
  ESTADO_LICITACION: string
  IDENTIFICADOR: string
  ENLACE_LICITACION?: string
  CODIGO_EXPEDIENTE: string
  DURACION_DIAS?: number
  VALOR_ESTIMADO?: number
  UNIDAD_COMPETENTE: string
  FECHA_INICIO_EJECUCION?: string
  UNIDAD_PROPONENTE: string
  FECHA_PUBLICA_ADJUDICACION?: string
  FECHA_PUBLICA_FORMALIZACION?: string
  ADJUDICA_FECHA_RESOLUCION?: string
  CRITERIOS_VALORACION?: string
  ADJUDICA_FECHA_CONTRATO?: string
  LUGAR_EJECUCION: string
  FECHA_HORA_FIN_OFERTAS?: string
  CPVS?: string
  ADJUDICA_NUMERO_LOTE?: number
  ANO_EXPEDIENTE: string
  ADJUDICA_DESCRIPCION_LOTE?: string
  ADJUDICA_IDENTIFICADOR?: string
  ADJUDICA_NOMBRE?: string
}

function mapDtoToContract (expense: ContractDTO): Contract {
  const durationMonths = expense.DURACION_MESES ?? typeof expense.DURACION_DIAS !== 'undefined' ? Math.trunc(expense.DURACION_DIAS / 30) : 0

  return {
    id: expense.CODIGO_EXPEDIENTE,
    description: expense.OBJETO_CONTRATO,
    year: parseInt(expense.ANO_EXPEDIENTE),
    durationMonths,
    status: expense.ESTADO_LICITACION,
    adjudicationStatus: expense.ADJUDICA_RESULTADO ?? '',
    amount: expense.ADJUDICA_IMPORTE ?? 0,
    company: {
      name: expense.ADJUDICA_NOMBRE ?? '',
      identifier: expense.ADJUDICA_IDENTIFICADOR ?? '',
      identifierType: expense.ADJUDICA_TIPO_IDEN ?? ''
    }
  }
}

const INVALID_CONTRACTS = ['Desierto', 'Desistimiento', '']

function isValidCompany (company: Company) {
  return company.name !== '' && company.identifier !== '' && company.identifierType !== ''
}

export async function getContracts (): Promise<Contract[]> {
  const contracts = await database.get<ContractDTO>(config.public_contracts.fileName)

  return contracts
    .map(mapDtoToContract)
    .filter(contract => !INVALID_CONTRACTS.includes(contract.adjudicationStatus))
    .filter(contract => isValidCompany(contract.company))
    .sort((a, b) => b.year - a.year)
}

export async function getContractsByCompany (companyId: string): Promise<Contract[]> {
  const contracts = await getContracts()

  return contracts.filter(contract => contract.company.identifier.toLowerCase() === companyId)
}

export async function getCompanies (): Promise<Company[]> {
  const contracts = await getContracts()

  const companies = contracts.map(contract => contract.company)
  const uniqueCompanies = companies.filter((company, index) => companies.findIndex(c => c.identifier === company.identifier) === index)
  const sortedCompanies = uniqueCompanies.sort((a, b) => a.name.localeCompare(b.name))
  const normalizedCompanies = sortedCompanies.map(company => ({
    ...company,
    identifier: company.identifier.toLowerCase()
  }))

  return normalizedCompanies
}

export async function searchContract (query: string): Promise<Contract[]> {
  const contracts = await getContracts()

  const filterByDescription = (contract: Contract) => contract.description.toLowerCase().includes(query.toLowerCase())
  const filterByCompany = (contract: Contract) => contract.company.name.toLowerCase().includes(query.toLowerCase())

  return contracts.filter(contract => filterByDescription(contract) || filterByCompany(contract))
}
