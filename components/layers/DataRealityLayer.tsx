'use client'

import {useState, useEffect, useRef} from 'react'
import {motion, useInView} from 'framer-motion'
import type {Theme} from '@/types/form'
import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {CheckCircle, XCircle, AlertCircle, Loader2} from 'lucide-react'
import {useJourneyStore} from '@/lib/journeyStore'

interface ImmigrationFact {
  id: string
  question: string
  lensSpecificFacts: Record<Theme, string>
}

// Theme mapping: component Theme type to Sanity IdeologyType
const themeToIdeology = (theme: Theme): string => {
  const mapping: Record<Theme, string> = {
    'far-left': 'farLeft',
    'center-left': 'centerLeft',
    'center-right': 'centerRight',
    'far-right': 'farRight',
  }
  return mapping[theme] || 'centerRight'
}

interface Props {
  theme: Theme
  onComplete: () => void
  initialFacts?: ImmigrationFact[]
}

// Sanity data transformation helper
function transformSanityDataToFacts(sanityData: any[]): ImmigrationFact[] {
  return sanityData.map((item) => {
    // Fallback to neutralContext if interpretation headline is not available
    const getFact = (interpretation: any) => {
      return interpretation?.headline || item.neutralContext || item.statistic || 'Did you know?'
    }

    return {
      id: item._id,
      question: item.neutralContext || item.statistic || 'Did you know?',
      lensSpecificFacts: {
        'far-left': getFact(item.farLeftInterpretation),
        'center-left': getFact(item.centerLeftInterpretation),
        'center-right': getFact(item.centerRightInterpretation),
        'far-right': getFact(item.farRightInterpretation),
      },
    }
  })
}

function FactCard({
  fact,
  theme,
  index,
  onAnswer,
}: {
  fact: ImmigrationFact
  theme: Theme
  index: number
  onAnswer: (factId: string, answer: 'yes' | 'no') => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true, margin: '-100px'})
  const [answered, setAnswered] = useState<'yes' | 'no' | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleAnswer = (answer: 'yes' | 'no') => {
    setAnswered(answer)
    setShowFeedback(true)
    onAnswer(fact.id, answer)

    // Hide feedback after 2 seconds
    setTimeout(() => {
      setShowFeedback(false)
    }, 2000)
  }

  const lensSpecificFact = fact.lensSpecificFacts[theme]

  return (
    <motion.div
      ref={ref}
      initial={{opacity: 0, y: 50}}
      animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 50}}
      transition={{duration: 0.6, delay: index * 0.1}}
    >
      <Card className="shadow-xl hover:shadow-2xl transition-shadow">
        <CardContent className="p-8 md:p-10">
          <div className="space-y-6">
            {/* Fact Display */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border-l-4 border-slate-600">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-slate-600 dark:text-slate-400 flex-shrink-0 mt-1" />
                <p className="text-lg md:text-xl text-gray-900 dark:text-gray-100 font-medium leading-relaxed">
                  {lensSpecificFact}
                </p>
              </div>
            </div>

            {/* Answer Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => handleAnswer('yes')}
                disabled={answered !== null}
                variant={answered === 'yes' ? 'default' : 'outline'}
                size="lg"
                className="flex-1 sm:flex-none px-8 py-6 text-lg font-semibold"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                I Knew This
              </Button>
              <Button
                onClick={() => handleAnswer('no')}
                disabled={answered !== null}
                variant={answered === 'no' ? 'default' : 'outline'}
                size="lg"
                className="flex-1 sm:flex-none px-8 py-6 text-lg font-semibold"
              >
                <XCircle className="w-5 h-5 mr-2" />
                This Is New to Me
              </Button>
            </div>

            {/* Feedback Message */}
            {showFeedback && (
              <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0}}
                className="text-center"
              >
                <p className="text-slate-700 dark:text-slate-300 font-medium">
                  {answered === 'yes'
                    ? 'Great! Knowledge is power.'
                    : 'Now you know! Keep scrolling to learn more.'}
                </p>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function DataRealityLayer({theme, onComplete, initialFacts}: Props) {
  const {markDataPointViewed, recordResponse} = useJourneyStore()
  const [answeredFacts, setAnsweredFacts] = useState<Set<string>>(new Set())
  const [facts, setFacts] = useState<ImmigrationFact[]>(initialFacts || [])
  const [isLoading, setIsLoading] = useState(!initialFacts)
  const [error, setError] = useState<string | null>(null)

  const allAnswered = answeredFacts.size >= facts.length

  // Fetch facts from Sanity if not provided as props
  useEffect(() => {
    if (initialFacts) {
      setFacts(initialFacts)
      setIsLoading(false)
      return
    }

    const fetchFacts = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/data-points')

        if (!response.ok) {
          throw new Error(`Failed to fetch data points: ${response.statusText}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        const transformedFacts = transformSanityDataToFacts(data.dataPoints || [])
        setFacts(transformedFacts)
      } catch (err) {
        console.error('Error fetching data points:', err)
        setError(err instanceof Error ? err.message : 'Failed to load data')
        // Fallback to empty array on error
        setFacts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchFacts()
  }, [initialFacts])

  const handleAnswer = (factId: string, answer: 'yes' | 'no') => {
    // Track in journey store
    markDataPointViewed(factId)
    recordResponse(
      `data-reality-${factId}`,
      answer === 'yes' ? 'yes' : 'no',
      0, // Time spent will be tracked separately if needed
      0.7 // High persuasion weight for data exposure layer
    )

    // Track locally for UI state
    setAnsweredFacts((prev) => new Set([...prev, factId]))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Did You Know?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Before we talk about solutions, let's look at some facts about immigration in America.
        </p>
      </motion.div>

      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          className="flex flex-col items-center justify-center py-20"
        >
          <Loader2 className="w-12 h-12 text-slate-700 animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading facts...</p>
        </motion.div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-red-200 dark:border-red-800">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-2">
                Unable to Load Facts
              </h3>
              <p className="text-red-700 dark:text-red-300 mb-6">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/20"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Immigration Facts */}
      {!isLoading && !error && facts.length > 0 && (
        <div className="space-y-8 mb-12">
          {facts.map((fact, index) => (
            <FactCard
              key={fact.id}
              fact={fact}
              theme={theme}
              index={index}
              onAnswer={handleAnswer}
            />
          ))}
        </div>
      )}

      {/* No Facts Available */}
      {!isLoading && !error && facts.length === 0 && (
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          className="max-w-2xl mx-auto"
        >
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No Facts Available
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't find any data points to display. Please check back later.
              </p>
              <Button onClick={onComplete} variant="outline">
                Continue
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Progress Indicator */}
      {!isLoading && !error && facts.length > 0 && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          className="text-center mb-8"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {answeredFacts.size} of {facts.length} facts explored
          </p>
          <div className="w-full max-w-md mx-auto mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-slate-700 dark:bg-slate-400"
              initial={{width: 0}}
              animate={{width: `${(answeredFacts.size / facts.length) * 100}%`}}
              transition={{duration: 0.5}}
            />
          </div>
        </motion.div>
      )}

      {/* Transition Text */}
      {allAnswered && (
        <motion.div
          initial={{opacity: 0, y: 30}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.3}}
          className="max-w-3xl mx-auto mb-12"
        >
          <Card className="shadow-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700">
            <CardContent className="p-8 md:p-12">
              <p className="text-xl md:text-2xl text-gray-900 dark:text-gray-100 leading-relaxed text-center font-medium">
                So if mass deportation costs more than it saves, what if there's a better way? Imagine a solution that rewards honesty, generates billions in revenue, and restores order, without tearing families apart.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Continue Button */}
      {allAnswered && (
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.6}}
          className="flex justify-center pb-12"
        >
          <Button
            onClick={onComplete}
            size="lg"
            className="px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            Continue to Solution
          </Button>
        </motion.div>
      )}
    </div>
  )
}
