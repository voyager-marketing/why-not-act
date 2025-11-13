'use client'

import {useState, useRef, useEffect} from 'react'
import {motion, useInView} from 'framer-motion'
import type {PoliticalLens} from '@/lib/journeyStore'
import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {ArrowRight} from 'lucide-react'
import {useJourneyStore} from '@/lib/journeyStore'

interface Props {
  onComplete: () => void
}

interface Impact {
  emoji: string
  title: string
  description: string
}

interface LensImpacts {
  lens: PoliticalLens
  impacts: Impact[]
  reflectionQuestion: string
}

const LENS_IMPACTS: LensImpacts[] = [
  {
    lens: 'mid-right',
    impacts: [
      {
        emoji: '💰',
        title: 'Saves $315–$960 Billion',
        description:
          'No mass deportation means avoiding one of the most expensive federal operations in U.S. history.',
      },
      {
        emoji: '📈',
        title: 'Stabilizes Key Industry Workforces',
        description:
          'Construction, agriculture, logistics, and elder care avoid catastrophic labor shortages.',
      },
      {
        emoji: '🏘️',
        title: 'Protects Trillions in Property & Business Value',
        description:
          'Avoids the collapse of 815,000+ immigrant-owned businesses and 3.4 million properties.',
      },
      {
        emoji: '📊',
        title: 'Turns a Cost Center Into Revenue',
        description:
          '$30K x ~11 million = ~$330 billion in new federal revenue.',
      },
    ],
    reflectionQuestion:
      'If a solution strengthens the economy and enforces the law at the same time, is it worth serious consideration?',
  },
  {
    lens: 'far-right',
    impacts: [
      {
        emoji: '🛡️',
        title: 'Stronger Border Security',
        description:
          'Revenue from fines helps fund border security infrastructure, staffing, and technology, without raising taxes.',
      },
      {
        emoji: '🚔',
        title: 'ICE Focused Only on Criminals',
        description:
          'Instead of chasing millions, ICE concentrates solely on deporting lawbreakers, making the mission faster and safer.',
      },
      {
        emoji: '⚖️',
        title: 'Law and Order Restored',
        description:
          'Millions transition from "illegal" to "accountable applicants," restoring respect for the process.',
      },
      {
        emoji: '💵',
        title: 'Zero Cost to Taxpayers',
        description: 'The program pays for itself — massively.',
      },
    ],
    reflectionQuestion:
      'Would a safer, more controlled immigration system that strengthens sovereignty feel like a step in the right direction?',
  },
  {
    lens: 'mid-left',
    impacts: [
      {
        emoji: '❤️',
        title: 'Keeps Families Together',
        description:
          'No mass deportations tearing apart homes, schools, and communities.',
      },
      {
        emoji: '🏥',
        title: 'Improves Healthcare Stability',
        description:
          'Legal integration and insurance access reduce hospital strain and save ~$18B annually.',
      },
      {
        emoji: '🏡',
        title: 'Strengthens Towns and Cities',
        description:
          'More people paying taxes and investing locally → rural towns and aging cities stabilize.',
      },
      {
        emoji: '📚',
        title: 'Supports Schools & Services',
        description:
          'More insured, documented families = stronger public systems without extra taxes.',
      },
    ],
    reflectionQuestion:
      'If reform protects families, communities, and public services while saving billions, does that feel like the right direction?',
  },
  {
    lens: 'far-left',
    impacts: [
      {
        emoji: '✋',
        title: 'Reduces Exploitation',
        description:
          'Legal status protects undocumented immigrants from wage theft, abuse, and unsafe working conditions.',
      },
      {
        emoji: '👨‍👩‍👧',
        title: 'Preserves Families & Community Bonds',
        description:
          'People stay with their children, partners, and support networks instead of facing forced removal.',
      },
      {
        emoji: '🗳️',
        title: 'Gives People a Voice',
        description:
          'Legal standing shifts immigrants from fear to participation, in schools, workplaces, unions, and community life.',
      },
      {
        emoji: '🌎',
        title: 'Acknowledges Human Worth',
        description:
          'Recognizes the contributions of millions who have lived, worked, and raised families in the U.S. for 15+ years.',
      },
    ],
    reflectionQuestion:
      "If a policy reduces harm, protects families, and brings people out of the shadows, is that the kind of justice you'd want to see?",
  },
]

interface ImpactCardProps {
  impact: Impact
  index: number
}

function ImpactCard({impact, index}: ImpactCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true, margin: '-100px'})

  return (
    <motion.div
      ref={ref}
      initial={{opacity: 0, y: 50}}
      animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 50}}
      transition={{duration: 0.6, delay: index * 0.15}}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-start gap-4">
            <div className="text-5xl flex-shrink-0">{impact.emoji}</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                {impact.title}
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {impact.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ImpactVisualizationLayer({onComplete}: Props) {
  const {politicalLens, markDataPointViewed, recordResponse} = useJourneyStore()
  const [reflectionResponse, setReflectionResponse] = useState<'yes' | 'maybe' | null>(null)
  const reflectionRef = useRef(null)
  const isReflectionInView = useInView(reflectionRef, {once: true})

  // Get impacts for current lens
  const lensImpacts = LENS_IMPACTS.find((li) => li.lens === politicalLens)

  // If no lens is selected, show generic message
  if (!lensImpacts) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Please complete the political lens quiz first.
        </p>
      </div>
    )
  }

  const handleReflectionResponse = (response: 'yes' | 'maybe') => {
    setReflectionResponse(response)

    // Store in journey store
    const impactId = `impact-reflection-${politicalLens}`
    markDataPointViewed(impactId)
    recordResponse(impactId, response, 10, response === 'yes' ? 1.0 : 0.5)

    // Track each impact as viewed
    lensImpacts.impacts.forEach((impact, index) => {
      markDataPointViewed(`impact-${politicalLens}-${index}`)
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4 pb-24">
      {/* Stage 1: Universal Intro */}
      <motion.div
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Real Impact
        </h2>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          Let's look at what this approach would actually accomplish — for the country, for
          communities, and for the future.
        </p>
      </motion.div>

      {/* Stage 2: Ideology-Specific Impacts */}
      <div className="space-y-6 mb-12">
        {lensImpacts.impacts.map((impact, index) => (
          <ImpactCard key={index} impact={impact} index={index} />
        ))}
      </div>

      {/* Reflection Question - Always visible */}
      <motion.div
        ref={reflectionRef}
        initial={{opacity: 0, y: 30}}
        animate={isReflectionInView ? {opacity: 1, y: 0} : {opacity: 0, y: 30}}
        transition={{duration: 0.6}}
        className="mb-12"
      >
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 shadow-xl">
            <CardContent className="p-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                Reflection
              </h3>
              <p className="text-xl text-gray-800 dark:text-gray-200 mb-8 text-center leading-relaxed italic">
                "{lensImpacts.reflectionQuestion}"
              </p>

              {reflectionResponse === null ? (
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => handleReflectionResponse('yes')}
                    size="lg"
                    className="px-8 py-6 text-lg font-semibold bg-green-600 hover:bg-green-700"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => handleReflectionResponse('maybe')}
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg font-semibold"
                  >
                    Maybe
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{opacity: 0, scale: 0.9}}
                  animate={{opacity: 1, scale: 1}}
                  className="text-center"
                >
                  <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                    Thank you for your reflection.
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
      </motion.div>

      {/* Stage 3: Universal Closing */}
      {reflectionResponse !== null && (
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.3}}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 shadow-xl">
            <CardContent className="p-10 text-center">
              <p className="text-xl text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                Across the political spectrum, one thing becomes clear: We can't afford the cost
                of doing nothing — and we can't keep repeating policies that fail.
              </p>
              <p className="text-xl text-gray-800 dark:text-gray-200 font-semibold leading-relaxed">
                So what would a real, workable solution look like for the country's future?
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Continue Button */}
      {reflectionResponse !== null && (
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.5}}
          className="flex justify-center pb-12"
        >
          <Button
            onClick={onComplete}
            size="lg"
            className="px-12 py-6 text-xl font-bold shadow-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Continue to Reflection
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </motion.div>
      )}
    </div>
  )
}
