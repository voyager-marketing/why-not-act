/**
 * Migration Script: Populate Sanity with Layer 2 & 3 Immigration Content
 *
 * This script migrates hardcoded content from ValueAlignmentLayer.tsx and
 * DataRealityLayer.tsx into Sanity CMS.
 *
 * Usage: npm run migrate:content
 */

import {config} from 'dotenv'
import {resolve} from 'path'
import {createClient} from 'next-sanity'

// Load environment variables from .env.local
config({path: resolve(process.cwd(), '.env.local')})

// Initialize Sanity client with write token
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-11-13',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Write token required for mutations
})

// Layer 2: Value Alignment Questions
const VALUE_QUESTIONS = [
  {
    id: 'immigration-q1',
    text: {
      'far-right': 'Do you believe that people who break our immigration laws should face real consequences?',
      'center-right': 'Should undocumented immigrants be required to pay a significant fine if they want to stay in the U.S. legally?',
      'center-left': 'Should families who have been in the U.S. for years, working and contributing to their communities, have a chance to earn legal status?',
      'far-left': 'Do you believe that all people, regardless of immigration status, deserve to be treated with dignity and respect?',
    },
  },
  {
    id: 'immigration-q2',
    text: {
      'far-right': 'Should we prioritize deporting undocumented immigrants with criminal records before focusing on families who have been here for years?',
      'center-right': 'Do you believe immigrants should learn English and understand U.S. civics before gaining legal status?',
      'center-left': 'Do you think deporting millions of people who are otherwise law-abiding would harm local economies and communities?',
      'far-left': 'Should we create pathways for undocumented immigrants to gain legal status without punitive measures that separate families?',
    },
  },
  {
    id: 'immigration-q3',
    text: {
      'far-right': 'Do you think it\'s fair that undocumented immigrants can live here without following the same rules citizens and legal immigrants follow?',
      'center-right': 'Should any path to legal status require immigrants to contribute financially—like paying back taxes or funding border security?',
      'center-left': 'Should we create a system that allows undocumented immigrants to come forward, get right with the law, and stay legally?',
      'far-left': 'Do you think immigrants contribute positively to our economy and communities?',
    },
  },
]

// Layer 3: Data Reality Facts
const IMMIGRATION_FACTS = [
  {
    id: 'deportation-cost',
    question: 'Did you know? Mass deportation of 11 million people would cost between $315 billion and $960 billion—more than the entire annual budget of the Department of Defense.',
    lensSpecificFacts: {
      'far-right': 'Mass deportation of 11 million people would cost between $315 billion and $960 billion—more than the entire annual budget of the Department of Defense.',
      'center-right': 'Undocumented immigrants paid an estimated $580 billion in taxes over the past decade, including Social Security and Medicare taxes they can\'t claim.',
      'center-left': 'More than 5 million U.S. citizen children live in mixed-status households. Deporting their parents would devastate these American families.',
      'far-left': 'The U.S. immigration system has a backlog of over 3 million cases, with some people waiting more than a decade for their day in court.',
    },
  },
  {
    id: 'criminal-record',
    question: 'Did you know? About 90-95% of undocumented immigrants have no criminal record beyond their immigration status.',
    lensSpecificFacts: {
      'far-right': 'About 90-95% of undocumented immigrants have no criminal record beyond their immigration status.',
      'center-right': 'Mass deportation would shrink the U.S. economy by $1.6 trillion over 10 years, according to non-partisan economic analyses.',
      'center-left': 'Undocumented immigrants own more than 815,000 businesses in the U.S., employing millions of American workers and contributing billions to the economy.',
      'far-left': 'Many undocumented immigrants fled violence, poverty, or persecution—situations often worsened by U.S. foreign policy.',
    },
  },
  {
    id: 'fine-revenue',
    question: 'Did you know? A $30,000-per-person fine on undocumented immigrants could generate $330 billion—enough to fully fund a border wall, increase ICE enforcement, and hire thousands more Border Patrol agents.',
    lensSpecificFacts: {
      'far-right': 'A $30,000-per-person fine on undocumented immigrants could generate $330 billion—enough to fully fund a border wall, increase ICE enforcement, and hire thousands more Border Patrol agents.',
      'center-right': 'A $30,000 fine per person would generate $330 billion in revenue—more than enough to offset any costs and fund stronger border security.',
      'center-left': 'Undocumented immigrants are significantly less likely to commit crimes than native-born Americans, according to decades of research.',
      'far-left': 'Providing a pathway to legal status would increase tax revenue by billions annually and grow the economy for everyone.',
    },
  },
]

/**
 * Create Layer 2 (Value Alignment) questions in Sanity
 */
async function migrateLayer2Questions() {
  console.log('\n📝 Starting Layer 2 (Value Alignment) migration...\n')

  const createdDocs = []

  for (let i = 0; i < VALUE_QUESTIONS.length; i++) {
    const question = VALUE_QUESTIONS[i]
    const order = i + 1

    const sanityDoc = {
      _type: 'layeredQuestion',
      _id: `question-layer2-${question.id}`,
      layer: 'layer2',
      questionType: 'values',
      order,
      topic: `Immigration Value Question ${order}`,
      coreQuestion: question.text['center-left'], // Use center-left as neutral baseline

      // Far Right Framing
      farRightFraming: {
        headline: question.text['far-right'],
        emotionalTone: 'neutral',
      },

      // Center Right Framing
      centerRightFraming: {
        headline: question.text['center-right'],
        emotionalTone: 'neutral',
      },

      // Center Left Framing
      centerLeftFraming: {
        headline: question.text['center-left'],
        emotionalTone: 'neutral',
      },

      // Far Left Framing
      farLeftFraming: {
        headline: question.text['far-left'],
        emotionalTone: 'hope',
      },

      persuasionWeight: 70, // High weight for value alignment
      isGatekeeping: true, // All Layer 2 questions are gatekeeping
      tags: ['immigration', 'values', 'layer2'],
    }

    try {
      console.log(`Creating question ${order}/3: ${question.id}`)
      const result = await client.createOrReplace(sanityDoc)
      createdDocs.push(result)
      console.log(`✅ Created: ${result._id}`)
    } catch (error) {
      console.error(`❌ Error creating ${question.id}:`, error)
      throw error
    }
  }

  console.log(`\n✨ Successfully migrated ${createdDocs.length} Layer 2 questions\n`)
  return createdDocs
}

/**
 * Create Layer 3 (Data Reality) data points in Sanity
 */
async function migrateLayer3DataPoints() {
  console.log('\n📊 Starting Layer 3 (Data Reality) migration...\n')

  const createdDocs = []

  // Map fact IDs to categories
  const categoryMap: Record<string, string> = {
    'deportation-cost': 'economic',
    'criminal-record': 'security',
    'fine-revenue': 'economic',
  }

  for (let i = 0; i < IMMIGRATION_FACTS.length; i++) {
    const fact = IMMIGRATION_FACTS[i]
    const category = categoryMap[fact.id] || 'social'

    const sanityDoc = {
      _type: 'dataPoint',
      _id: `datapoint-layer3-${fact.id}`,
      category,
      statistic: extractStatistic(fact.question),
      neutralContext: fact.question,
      source: 'Various sources (to be updated)',
      yearCollected: 2024,
      isVerified: false, // Mark for review

      visualization: {
        type: 'text',
        animationStyle: 'fadeIn',
        colorScheme: 'info',
      },

      // Far Right Interpretation
      farRightInterpretation: {
        headline: fact.lensSpecificFacts['far-right'],
        explanation: fact.lensSpecificFacts['far-right'],
      },

      // Center Right Interpretation
      centerRightInterpretation: {
        headline: fact.lensSpecificFacts['center-right'],
        explanation: fact.lensSpecificFacts['center-right'],
      },

      // Center Left Interpretation
      centerLeftInterpretation: {
        headline: fact.lensSpecificFacts['center-left'],
        explanation: fact.lensSpecificFacts['center-left'],
      },

      // Far Left Interpretation
      farLeftInterpretation: {
        headline: fact.lensSpecificFacts['far-left'],
        explanation: fact.lensSpecificFacts['far-left'],
      },

      tags: ['immigration', 'facts', 'layer3'],
    }

    try {
      console.log(`Creating data point ${i + 1}/3: ${fact.id}`)
      const result = await client.createOrReplace(sanityDoc)
      createdDocs.push(result)
      console.log(`✅ Created: ${result._id}`)
    } catch (error) {
      console.error(`❌ Error creating ${fact.id}:`, error)
      throw error
    }
  }

  console.log(`\n✨ Successfully migrated ${createdDocs.length} Layer 3 data points\n`)
  return createdDocs
}

/**
 * Helper: Extract key statistic from question text
 */
function extractStatistic(text: string): string {
  // Extract numbers and key phrases from the question
  const matches = text.match(/\$?\d+(?:,\d{3})*(?:\.\d+)?(?:\s*(?:billion|million|trillion))?|\d+(?:-\d+)?%/gi)
  if (matches && matches.length > 0) {
    return matches[0]
  }
  return 'See context'
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('🚀 Immigration Content Migration Started')
  console.log('=========================================\n')

  // Check for required environment variables
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
  }

  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET environment variable')
  }

  if (!process.env.SANITY_API_TOKEN) {
    throw new Error('Missing SANITY_API_TOKEN environment variable. Please add a write token to your .env.local file.')
  }

  try {
    // Migrate Layer 2 questions
    const layer2Results = await migrateLayer2Questions()

    // Migrate Layer 3 data points
    const layer3Results = await migrateLayer3DataPoints()

    // Summary
    console.log('\n🎉 Migration Complete!')
    console.log('=====================\n')
    console.log(`✅ Created ${layer2Results.length} Layer 2 questions`)
    console.log(`✅ Created ${layer3Results.length} Layer 3 data points`)
    console.log(`📊 Total documents: ${layer2Results.length + layer3Results.length}`)
    console.log('\nNext steps:')
    console.log('1. Review the created documents in Sanity Studio')
    console.log('2. Update data sources and verify statistics')
    console.log('3. Add source URLs where applicable')
    console.log('4. Update frontend components to fetch from Sanity\n')

  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrate()
}

export {migrate, migrateLayer2Questions, migrateLayer3DataPoints}
