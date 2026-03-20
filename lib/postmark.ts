import {ServerClient} from 'postmark'

let client: ServerClient | null = null

function getClient(): ServerClient {
  if (!client) {
    const token = process.env.POSTMARK_SERVER_TOKEN
    if (!token) {
      throw new Error('POSTMARK_SERVER_TOKEN is not set')
    }
    client = new ServerClient(token)
  }
  return client
}

const PROD_RECIPIENTS = 'whynotact.neighbors@gmail.com, jim@focusingforwardconsult.com, info@abbadesigncompany.com, alex@voyagermark.com'
const DEV_RECIPIENTS = 'ben@voyagermark.com'
const NOTIFY_RECIPIENTS = process.env.POSTMARK_NOTIFY_EMAILS || (process.env.NODE_ENV === 'production' ? PROD_RECIPIENTS : DEV_RECIPIENTS)
const FROM_EMAIL = process.env.POSTMARK_FROM_EMAIL || 'Why Not Act <form@whynotact.org>'

interface EmailOptions {
  subject: string
  htmlBody: string
  textBody: string
  tag?: string
}

export async function sendNotification({subject, htmlBody, textBody, tag}: EmailOptions) {
  const postmark = getClient()

  return postmark.sendEmail({
    From: FROM_EMAIL,
    To: NOTIFY_RECIPIENTS,
    Subject: subject,
    HtmlBody: htmlBody,
    TextBody: textBody,
    Tag: tag,
    MessageStream: 'outbound',
  })
}

export function buildStayInformedEmail(email: string) {
  const subject = '[WhyNotAct] New Stay Informed Signup'
  const textBody = `New Stay Informed signup:\n\nEmail: ${email}\nDate: ${new Date().toISOString()}`
  const htmlBody = `
    <h2>New Stay Informed Signup</h2>
    <table style="border-collapse:collapse;">
      <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${escapeHtml(email)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Date:</td><td style="padding:8px;">${new Date().toISOString()}</td></tr>
    </table>
  `
  return {subject, htmlBody, textBody, tag: 'stay-informed'}
}

export function buildOrganizeEmail(data: {
  email: string
  name: string
  state: string
  message: string
}) {
  const subject = '[WhyNotAct] New Community Organizer Volunteer'
  const textBody = [
    'New Community Organizer volunteer:',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `State/Territory: ${data.state}`,
    `Message: ${data.message || '(none)'}`,
    `Date: ${new Date().toISOString()}`,
  ].join('\n')

  const htmlBody = `
    <h2>New Community Organizer Volunteer</h2>
    <table style="border-collapse:collapse;">
      <tr><td style="padding:8px;font-weight:bold;">Name:</td><td style="padding:8px;">${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${escapeHtml(data.email)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">State/Territory:</td><td style="padding:8px;">${escapeHtml(data.state)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Message:</td><td style="padding:8px;">${escapeHtml(data.message || '(none)')}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Date:</td><td style="padding:8px;">${new Date().toISOString()}</td></tr>
    </table>
  `
  return {subject, htmlBody, textBody, tag: 'community-organizer'}
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
