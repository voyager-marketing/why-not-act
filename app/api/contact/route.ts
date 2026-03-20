import {NextRequest, NextResponse} from 'next/server'
import {sendNotification, buildStayInformedEmail, buildOrganizeEmail} from '@/lib/postmark'
import {appendStayInformed, appendOrganizeVolunteer} from '@/lib/google-sheets'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {type} = body

    if (type === 'stay-informed') {
      const {email} = body
      if (!email || typeof email !== 'string') {
        return NextResponse.json({error: 'Email is required'}, {status: 400})
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json({error: 'Invalid email address'}, {status: 400})
      }

      await Promise.all([
        sendNotification(buildStayInformedEmail(email)),
        appendStayInformed(email),
      ])

      return NextResponse.json({success: true, message: 'Thank you for signing up!'}, {status: 200})
    }

    if (type === 'organize') {
      const {email, name, state, message} = body
      if (!email || !name || !state) {
        return NextResponse.json({error: 'Name, email, and state are required'}, {status: 400})
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json({error: 'Invalid email address'}, {status: 400})
      }

      const formData = {email, name, state, message: message || ''}

      await Promise.all([
        sendNotification(buildOrganizeEmail(formData)),
        appendOrganizeVolunteer(formData),
      ])

      return NextResponse.json({success: true, message: 'Thank you for volunteering!'}, {status: 200})
    }

    return NextResponse.json({error: 'Invalid form type'}, {status: 400})
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {error: 'Failed to process submission. Please try again.'},
      {status: 500}
    )
  }
}
