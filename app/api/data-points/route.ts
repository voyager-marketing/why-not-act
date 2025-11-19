import {NextResponse} from 'next/server'
import {groq} from 'next-sanity'
import {client} from '@/lib/sanity.client'

/**
 * API Route: GET /api/data-points
 *
 * Fetches data points from Sanity CMS for the Data Reality Layer
 * Returns up to 3 data points from economic, security, or demographic categories
 */

const dataPointsQuery = groq`
  *[_type == "dataPoint" && category in ["economic", "security", "demographic"]] | order(_createdAt asc) [0...3] {
    _id,
    "id": _id,
    statistic,
    neutralContext,
    farRightInterpretation {
      headline,
      explanation,
      implication
    },
    centerRightInterpretation {
      headline,
      explanation,
      implication
    },
    centerLeftInterpretation {
      headline,
      explanation,
      implication
    },
    farLeftInterpretation {
      headline,
      explanation,
      implication
    },
    source,
    sourceUrl,
    yearCollected,
    isVerified,
    visualization {
      type,
      animationStyle,
      colorScheme
    }
  }
`

export async function GET() {
  try {
    const dataPoints = await client.fetch(dataPointsQuery)

    return NextResponse.json({
      dataPoints,
      count: dataPoints.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching data points from Sanity:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch data points',
        details: error instanceof Error ? error.message : 'Unknown error',
        dataPoints: [],
        count: 0,
      },
      {status: 500}
    )
  }
}

/**
 * Optional: POST endpoint for fetching data points with filters
 *
 * Body parameters:
 * - categories: string[] - Filter by specific categories
 * - limit: number - Max number of results (default: 3)
 * - ideology: string - Pre-filter by specific ideology interpretation
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {categories = ['economic', 'security', 'demographic'], limit = 3, ideology} = body

    const categoryFilter = categories.map((c: string) => `"${c}"`).join(', ')

    const customQuery = groq`
      *[_type == "dataPoint" && category in [${categoryFilter}]] | order(_createdAt asc) [0...${limit}] {
        _id,
        "id": _id,
        statistic,
        neutralContext,
        farRightInterpretation {
          headline,
          explanation,
          implication
        },
        centerRightInterpretation {
          headline,
          explanation,
          implication
        },
        centerLeftInterpretation {
          headline,
          explanation,
          implication
        },
        farLeftInterpretation {
          headline,
          explanation,
          implication
        },
        source,
        sourceUrl,
        yearCollected,
        isVerified,
        visualization {
          type,
          animationStyle,
          colorScheme
        }
      }
    `

    const dataPoints = await client.fetch(customQuery)

    return NextResponse.json({
      dataPoints,
      count: dataPoints.length,
      filters: {categories, limit, ideology},
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching filtered data points from Sanity:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch filtered data points',
        details: error instanceof Error ? error.message : 'Unknown error',
        dataPoints: [],
        count: 0,
      },
      {status: 500}
    )
  }
}
