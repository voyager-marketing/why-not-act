import {google} from 'googleapis'

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || '19RegxM4jhWE6qVZb7EP-Pq2BdJYE4S0LiFIsdddbfWs'

function getAuth() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY

  if (!clientEmail || !privateKey) {
    throw new Error('GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY must be set')
  }

  // Next.js can strip newlines from PEM keys - rebuild the proper format
  const stripped = privateKey
    .replace(/^"|"$/g, '')
    .replace(/\\n/g, '')
    .replace(/\n/g, '')
    .replace(/\r/g, '')
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s/g, '')

  // Rebuild PEM with proper 64-char line wrapping
  const base64Lines = stripped.match(/.{1,64}/g) || []
  const formattedKey = [
    '-----BEGIN PRIVATE KEY-----',
    ...base64Lines,
    '-----END PRIVATE KEY-----',
    '',
  ].join('\n')

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: formattedKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

async function getSheets() {
  const auth = getAuth()
  return google.sheets({version: 'v4', auth})
}

async function ensureSheet(sheetName: string, headers: string[]) {
  const sheets = await getSheets()

  // Check if the tab exists
  const spreadsheet = await sheets.spreadsheets.get({spreadsheetId: SPREADSHEET_ID})
  const existing = spreadsheet.data.sheets?.find(
    (s) => s.properties?.title === sheetName
  )

  if (!existing) {
    // Create the tab
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{addSheet: {properties: {title: sheetName}}}],
      },
    })

    // Add headers
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A1`,
      valueInputOption: 'RAW',
      requestBody: {values: [headers]},
    })
  }
}

export async function appendStayInformed(email: string) {
  const sheetName = 'Stay Informed'
  const headers = ['Date', 'Email']

  await ensureSheet(sheetName, headers)

  const sheets = await getSheets()
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A:B`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[new Date().toISOString(), email]],
    },
  })
}

export async function appendOrganizeVolunteer(data: {
  email: string
  name: string
  state: string
  message: string
}) {
  const sheetName = 'Community Organizers'
  const headers = ['Date', 'Name', 'Email', 'State/Territory', 'Message']

  await ensureSheet(sheetName, headers)

  const sheets = await getSheets()
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A:E`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        new Date().toISOString(),
        data.name,
        data.email,
        data.state,
        data.message || '',
      ]],
    },
  })
}
