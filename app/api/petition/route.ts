import {NextRequest, NextResponse} from 'next/server'
import {client} from '@/lib/sanity.client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const {name, email, zipcode, consent, theme} = body
    if (!name || !email || !zipcode || !consent) {
      return NextResponse.json({error: 'Missing required fields'}, {status: 400})
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({error: 'Invalid email address'}, {status: 400})
    }

    // Validate zipcode format
    const zipcodeRegex = /^\d{5}$/
    if (!zipcodeRegex.test(zipcode)) {
      return NextResponse.json({error: 'Invalid zipcode'}, {status: 400})
    }

    // Create petition signature document in Sanity
    const signature = await client.create({
      _type: 'petitionSignature',
      name,
      email,
      zipcode,
      phone: body.phone || null,
      reason: body.reason || null,
      theme: theme || 'default',
      consent,
      signedAt: new Date().toISOString(),
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    })

    // In production, you would also:
    // 1. Send confirmation email via SendGrid/Mailgun
    // 2. Add to email marketing list (if consented)
    // 3. Track conversion event in analytics
    // 4. Trigger webhook for integration systems

    console.log('Petition signature created:', signature._id)

    // Simulate email sending (replace with real email service)
    if (process.env.NODE_ENV === 'production') {
      // await sendConfirmationEmail(email, name)
      console.log('Would send confirmation email to:', email)
    }

    return NextResponse.json(
      {
        success: true,
        signatureId: signature._id,
        message: 'Petition signed successfully',
      },
      {status: 201}
    )
  } catch (error) {
    console.error('Petition submission error:', error)
    return NextResponse.json(
      {error: 'Failed to process petition signature', details: error instanceof Error ? error.message : 'Unknown error'},
      {status: 500}
    )
  }
}

// Optional: GET endpoint to retrieve signature count
export async function GET(request: NextRequest) {
  try {
    const {searchParams} = new URL(request.url)
    const theme = searchParams.get('theme')

    const query = theme
      ? `count(*[_type == "petitionSignature" && theme == $theme])`
      : `count(*[_type == "petitionSignature"])`

    const count = await client.fetch(query, theme ? {theme} : {})

    return NextResponse.json({count}, {status: 200})
  } catch (error) {
    console.error('Error fetching signature count:', error)
    return NextResponse.json({error: 'Failed to fetch signature count'}, {status: 500})
  }
}
