import { searchContract } from '@/lib/public-contracts'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (request: NextRequest): Promise<Response> {
  const query = request.nextUrl.searchParams.get('q')

  if (!query) {
    return NextResponse.json([])
  }

  const contracts = await searchContract(query)
  return NextResponse.json(contracts)
}
