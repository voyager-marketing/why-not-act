import {NextResponse} from 'next/server'
import {client} from '@/lib/sanity.client'

/**
 * API Route: GET /api/impact-points?lens=center-right
 *
 * Fetches impact points from Sanity CMS for the Impact Visualization Layer.
 * Server-side fetch avoids CORS issues with direct browser-to-Sanity calls.
 */

const impactPointsQuery = `*[_type == "impactPoint" && lens == $lens] | order(order asc) {
  _id,
  emoji,
  title,
  description,
  reflectionQuestion,
  order
}`

export async function GET(request: Request) {
  try {
    const {searchParams} = new URL(request.url)
    const lens = searchParams.get('lens')

    if (!lens) {
      return NextResponse.json(
        {error: 'Missing required "lens" query parameter', impactPoints: []},
        {status: 400}
      )
    }

    const impactPoints = await client.fetch(impactPointsQuery, {lens})

    return NextResponse.json({impactPoints})
  } catch (error) {
    console.error('Error fetching impact points from Sanity:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch impact points',
        details: error instanceof Error ? error.message : 'Unknown error',
        impactPoints: [],
      },
      {status: 500}
    )
  }
}
