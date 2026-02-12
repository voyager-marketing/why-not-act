import {NextResponse} from 'next/server'
import {client} from '@/lib/sanity.client'

/**
 * API Route: GET /api/questions?layer=layer2
 *
 * Fetches layered questions from Sanity CMS for the Value Alignment Layer.
 * Server-side fetch avoids CORS issues with direct browser-to-Sanity calls.
 */

const questionsQuery = `*[_type == "layeredQuestion" && layer == $layer] | order(order asc) {
  _id,
  "id": _id,
  coreQuestion,
  farRightFraming,
  centerRightFraming,
  centerLeftFraming,
  farLeftFraming
}`

export async function GET(request: Request) {
  try {
    const {searchParams} = new URL(request.url)
    const layer = searchParams.get('layer') || 'layer2'

    const questions = await client.fetch(questionsQuery, {layer})

    return NextResponse.json({questions})
  } catch (error) {
    console.error('Error fetching questions from Sanity:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch questions',
        details: error instanceof Error ? error.message : 'Unknown error',
        questions: [],
      },
      {status: 500}
    )
  }
}
