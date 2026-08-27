import { NextResponse } from 'next/server'
import { searchContent } from '../../../lib/search-data'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  
  if (!query) {
    return NextResponse.json({ results: [] })
  }

  const results = searchContent(query)

  return NextResponse.json({ results })
}