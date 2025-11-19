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

// Impact data from ImpactVisualizationLayer.tsx
const IMPACT_DATA = [
  // CENTER-RIGHT LENS
  {
    lens: 'center-right',
    order: 1,
    emoji: '💰',
    title: 'Saves $315–$960 Billion',
    description:
      'No mass deportation means avoiding one of the most expensive federal operations in U.S. history.',
    reflectionQuestion:
      'If a solution strengthens the economy and enforces the law at the same time, is it worth serious consideration?',
  },
  {
    lens: 'center-right',
    order: 2,
    emoji: '📈',
    title: 'Stabilizes Key Industry Workforces',
    description:
      'Construction, agriculture, logistics, and elder care avoid catastrophic labor shortages.',
  },
  {
    lens: 'center-right',
    order: 3,
    emoji: '🏘️',
    title: 'Protects Trillions in Property & Business Value',
    description:
      'Avoids the collapse of 815,000+ immigrant-owned businesses and 3.4 million properties.',
  },
  {
    lens: 'center-right',
    order: 4,
    emoji: '📊',
    title: 'Turns a Cost Center Into Revenue',
    description: '$30K x ~11 million = ~$330 billion in new federal revenue.',
  },

  // FAR-RIGHT LENS
  {
    lens: 'far-right',
    order: 1,
    emoji: '🛡️',
    title: 'Stronger Border Security',
    description:
      'Revenue from fines helps fund border security infrastructure, staffing, and technology, without raising taxes.',
    reflectionQuestion:
      'Would a safer, more controlled immigration system that strengthens sovereignty feel like a step in the right direction?',
  },
  {
    lens: 'far-right',
    order: 2,
    emoji: '🚔',
    title: 'ICE Focused Only on Criminals',
    description:
      'Instead of chasing millions, ICE concentrates solely on deporting lawbreakers, making the mission faster and safer.',
  },
  {
    lens: 'far-right',
    order: 3,
    emoji: '⚖️',
    title: 'Law and Order Restored',
    description:
      'Millions transition from "illegal" to "accountable applicants," restoring respect for the process.',
  },
  {
    lens: 'far-right',
    order: 4,
    emoji: '💵',
    title: 'Zero Cost to Taxpayers',
    description: 'The program pays for itself — massively.',
  },

  // CENTER-LEFT LENS
  {
    lens: 'center-left',
    order: 1,
    emoji: '❤️',
    title: 'Keeps Families Together',
    description: 'No mass deportations tearing apart homes, schools, and communities.',
    reflectionQuestion:
      'If reform protects families, communities, and public services while saving billions, does that feel like the right direction?',
  },
  {
    lens: 'center-left',
    order: 2,
    emoji: '🏥',
    title: 'Improves Healthcare Stability',
    description:
      'Legal integration and insurance access reduce hospital strain and save ~$18B annually.',
  },
  {
    lens: 'center-left',
    order: 3,
    emoji: '🏡',
    title: 'Strengthens Towns and Cities',
    description:
      'More people paying taxes and investing locally → rural towns and aging cities stabilize.',
  },
  {
    lens: 'center-left',
    order: 4,
    emoji: '📚',
    title: 'Supports Schools & Services',
    description:
      'More insured, documented families = stronger public systems without extra taxes.',
  },

  // FAR-LEFT LENS
  {
    lens: 'far-left',
    order: 1,
    emoji: '✋',
    title: 'Reduces Exploitation',
    description:
      'Legal status protects undocumented immigrants from wage theft, abuse, and unsafe working conditions.',
    reflectionQuestion:
      "If a policy reduces harm, protects families, and brings people out of the shadows, is that the kind of justice you'd want to see?",
  },
  {
    lens: 'far-left',
    order: 2,
    emoji: '👨‍👩‍👧',
    title: 'Preserves Families & Community Bonds',
    description:
      'People stay with their children, partners, and support networks instead of facing forced removal.',
  },
  {
    lens: 'far-left',
    order: 3,
    emoji: '🗳️',
    title: 'Gives People a Voice',
    description:
      'Legal standing shifts immigrants from fear to participation, in schools, workplaces, unions, and community life.',
  },
  {
    lens: 'far-left',
    order: 4,
    emoji: '🌎',
    title: 'Acknowledges Human Worth',
    description:
      'Recognizes the contributions of millions who have lived, worked, and raised families in the U.S. for 15+ years.',
  },
]

async function migrateImpactPoints() {
  console.log('🚀 Starting impact points migration...\n')

  try {
    // Migrate all impact points
    for (const impact of IMPACT_DATA) {
      const impactDoc = {
        _type: 'impactPoint',
        _id: `impact-${impact.lens}-${impact.order}`,
        lens: impact.lens,
        order: impact.order,
        emoji: impact.emoji,
        title: impact.title,
        description: impact.description,
        reflectionQuestion: impact.reflectionQuestion || null,
        tags: ['immigration', 'layer5', 'real-impact', impact.lens],
      }

      const result = await client.createOrReplace(impactDoc)
      console.log(
        `✅ Created/Updated: ${impact.emoji} ${impact.title} (${impact.lens} - #${impact.order})`,
      )
    }

    console.log(`\n✨ Successfully migrated ${IMPACT_DATA.length} impact points!`)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateImpactPoints()
