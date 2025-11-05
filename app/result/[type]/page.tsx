'use client'

import PersonalizedResultHub from '@/components/PersonalizedResultHub'
import type {ResultType} from '@/types/form'
import {constructUserJourneyFromStore} from '@/lib/journeyConstructor'
import {use, useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {motion} from 'framer-motion'
import {Button} from '@/components/ui/button'
import {Home} from 'lucide-react'
import type {UserJourney} from '@/types/form'

export default function ResultPage({params}: {params: Promise<{type: ResultType}>}) {
  const {type} = use(params)
  const router = useRouter()
  const [journey, setJourney] = useState<UserJourney | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Construct journey from store data
      const userJourney = constructUserJourneyFromStore()
      setJourney(userJourney)

      // Track page view event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'page_view', {
          page_title: 'Result Hub',
          page_location: window.location.href,
          result_type: type,
          journey_score: userJourney.score,
          conviction_overall:
            (userJourney.convictionScores.valueAlignment +
              userJourney.convictionScores.dataAwareness +
              userJourney.convictionScores.persuasionLevel +
              userJourney.convictionScores.engagementDepth) /
            4,
        })
      }
    } catch (err) {
      console.error('Failed to construct journey:', err)
      setError(err instanceof Error ? err.message : 'Failed to load journey data')
    }
  }, [type])

  // Error state
  if (error) {
    return (
      <main className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900" />

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 max-w-5xl">
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Oops! We couldn't load your results.
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {error}
            </p>
            <Button
              variant="default"
              size="lg"
              onClick={() => router.push('/')}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Start Your Journey
            </Button>
          </motion.div>
        </div>
      </main>
    )
  }

  // Loading state
  if (!journey) {
    return (
      <main className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900" />

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 max-w-5xl">
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="text-center"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading your personalized results...
            </p>
          </motion.div>
        </div>
      </main>
    )
  }

  // Success state - render PersonalizedResultHub
  return <PersonalizedResultHub journey={journey} />
}
