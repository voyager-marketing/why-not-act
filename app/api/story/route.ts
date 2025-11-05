import {NextRequest, NextResponse} from 'next/server'
import {client} from '@/lib/sanity.client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const {email, story, allowPublish, allowContact, theme} = body
    if (!email || !story) {
      return NextResponse.json({error: 'Missing required fields'}, {status: 400})
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({error: 'Invalid email address'}, {status: 400})
    }

    // Validate story length
    if (story.length < 50) {
      return NextResponse.json({error: 'Story must be at least 50 characters'}, {status: 400})
    }
    if (story.length > 2000) {
      return NextResponse.json({error: 'Story must not exceed 2000 characters'}, {status: 400})
    }

    // Create story document in Sanity as a draft
    const storyDoc = await client.create({
      _type: 'story',
      name: body.name || 'Anonymous',
      email,
      content: story,
      allowPublish: allowPublish || false,
      allowContact: allowContact || false,
      theme: theme || 'default',
      status: 'pending', // Will be reviewed before publishing
      submittedAt: new Date().toISOString(),
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    })

    // In production, you would also:
    // 1. Send confirmation email to submitter
    // 2. Send notification to admin/moderator team
    // 3. Run content moderation checks (profanity, spam detection)
    // 4. Track submission in analytics

    console.log('Story submitted:', storyDoc._id)

    // Simulate admin notification (replace with real email service)
    if (process.env.NODE_ENV === 'production') {
      // await sendAdminNotification(storyDoc._id, story.substring(0, 100))
      console.log('Would send admin notification for story:', storyDoc._id)
    }

    // Simulate submitter confirmation email
    if (process.env.NODE_ENV === 'production') {
      // await sendSubmitterConfirmation(email, body.name || 'Anonymous')
      console.log('Would send confirmation email to:', email)
    }

    return NextResponse.json(
      {
        success: true,
        storyId: storyDoc._id,
        message: 'Story submitted successfully and is pending review',
      },
      {status: 201}
    )
  } catch (error) {
    console.error('Story submission error:', error)
    return NextResponse.json(
      {
        error: 'Failed to process story submission',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      {status: 500}
    )
  }
}

// Optional: GET endpoint to retrieve published stories
export async function GET(request: NextRequest) {
  try {
    const {searchParams} = new URL(request.url)
    const theme = searchParams.get('theme')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const query = theme
      ? `*[_type == "story" && status == "published" && theme == $theme] | order(submittedAt desc) [$offset...$end]`
      : `*[_type == "story" && status == "published"] | order(submittedAt desc) [$offset...$end]`

    const stories = await client.fetch(query, {
      theme,
      offset,
      end: offset + limit,
    })

    // Remove sensitive information before sending to client
    const sanitizedStories = stories.map((story: any) => ({
      _id: story._id,
      name: story.name,
      content: story.content,
      theme: story.theme,
      submittedAt: story.submittedAt,
    }))

    return NextResponse.json({stories: sanitizedStories}, {status: 200})
  } catch (error) {
    console.error('Error fetching stories:', error)
    return NextResponse.json({error: 'Failed to fetch stories'}, {status: 500})
  }
}
