/**
 * Test Sanity Connection
 *
 * Verifies that your Sanity configuration is correct before running migrations.
 *
 * Usage: npx tsx scripts/test-sanity-connection.ts
 */

import {config} from 'dotenv'
import {resolve} from 'path'
import {createClient} from 'next-sanity'

// Load environment variables from .env.local
config({path: resolve(process.cwd(), '.env.local')})

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-11-13',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function testConnection() {
  console.log('🔍 Testing Sanity Connection...\n')

  // Check environment variables
  console.log('Environment Variables:')
  console.log('----------------------')
  console.log(`Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '❌ MISSING'}`)
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || '❌ MISSING'}`)
  console.log(`API Version: ${process.env.NEXT_PUBLIC_SANITY_API_VERSION || '❌ MISSING'}`)
  console.log(`API Token: ${process.env.SANITY_API_TOKEN ? '✅ Present' : '❌ MISSING'}\n`)

  // Check for missing vars
  const missingVars = []
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) missingVars.push('NEXT_PUBLIC_SANITY_PROJECT_ID')
  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) missingVars.push('NEXT_PUBLIC_SANITY_DATASET')
  if (!process.env.SANITY_API_TOKEN) missingVars.push('SANITY_API_TOKEN')

  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:', missingVars.join(', '))
    console.error('\nPlease add these to your .env.local file.')
    console.error('See .env.local.example for reference.\n')
    process.exit(1)
  }

  // Test read access
  try {
    console.log('Testing read access...')
    const result = await client.fetch('count(*)')
    console.log(`✅ Read access confirmed. Found ${result} documents in dataset.\n`)
  } catch (error: any) {
    console.error('❌ Read access failed:', error.message)
    console.error('\nPlease check your Project ID and Dataset name.\n')
    process.exit(1)
  }

  // Test write access
  try {
    console.log('Testing write access...')
    const testDoc = {
      _type: 'layeredQuestion',
      _id: 'test-connection-doc',
      layer: 'layer1',
      questionType: 'awareness',
      order: 999,
      topic: 'Test Document',
      coreQuestion: 'This is a test document to verify write permissions.',
      persuasionWeight: 0,
      isGatekeeping: false,
    }

    await client.createOrReplace(testDoc)
    console.log('✅ Write access confirmed. Test document created.')

    // Clean up test document
    await client.delete('test-connection-doc')
    console.log('✅ Test document deleted.\n')
  } catch (error: any) {
    console.error('❌ Write access failed:', error.message)
    console.error('\nPlease check that your SANITY_API_TOKEN has Editor permissions.\n')
    process.exit(1)
  }

  // All tests passed
  console.log('🎉 All tests passed! Your Sanity connection is working correctly.\n')
  console.log('You can now run the migration with: npm run migrate:content\n')
}

testConnection().catch((error) => {
  console.error('Unexpected error:', error)
  process.exit(1)
})
