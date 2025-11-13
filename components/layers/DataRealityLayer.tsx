'use client'

import {useState, useEffect, useRef} from 'react'
import {motion, useInView} from 'framer-motion'
import type {Theme} from '@/types/form'
import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {CheckCircle, XCircle, AlertCircle} from 'lucide-react'
import {useJourneyStore} from '@/lib/journeyStore'

interface ImmigrationFact {
  id: string
  question: string
  lensSpecificFacts: Record<Theme, string>
}

const IMMIGRATION_FACTS: ImmigrationFact[] = [
  {
    id: 'deportation-cost',
    question: 'Did you know? Mass deportation of 11 million people would cost between $315 billion and $960 billion—more than the entire annual budget of the Department of Defense.',
    lensSpecificFacts: {
      'far-right': 'Mass deportation of 11 million people would cost between $315 billion and $960 billion—more than the entire annual budget of the Department of Defense.',
      'mid-right': 'Undocumented immigrants paid an estimated $580 billion in taxes over the past decade, including Social Security and Medicare taxes they can\'t claim.',
      'mid-left': 'More than 5 million U.S. citizen children live in mixed-status households. Deporting their parents would devastate these American families.',
      'far-left': 'The U.S. immigration system has a backlog of over 3 million cases, with some people waiting more than a decade for their day in court.',
    },
  },
  {
    id: 'criminal-record',
    question: 'Did you know? About 90-95% of undocumented immigrants have no criminal record beyond their immigration status.',
    lensSpecificFacts: {
      'far-right': 'About 90-95% of undocumented immigrants have no criminal record beyond their immigration status.',
      'mid-right': 'Mass deportation would shrink the U.S. economy by $1.6 trillion over 10 years, according to non-partisan economic analyses.',
      'mid-left': 'Undocumented immigrants own more than 815,000 businesses in the U.S., employing millions of American workers and contributing billions to the economy.',
      'far-left': 'Many undocumented immigrants fled violence, poverty, or persecution—situations often worsened by U.S. foreign policy.',
    },
  },
  {
    id: 'fine-revenue',
    question: 'Did you know? A $30,000-per-person fine on undocumented immigrants could generate $330 billion—enough to fully fund a border wall, increase ICE enforcement, and hire thousands more Border Patrol agents.',
    lensSpecificFacts: {
      'far-right': 'A $30,000-per-person fine on undocumented immigrants could generate $330 billion—enough to fully fund a border wall, increase ICE enforcement, and hire thousands more Border Patrol agents.',
      'mid-right': 'A $30,000 fine per person would generate $330 billion in revenue—more than enough to offset any costs and fund stronger border security.',
      'mid-left': 'Undocumented immigrants are significantly less likely to commit crimes than native-born Americans, according to decades of research.',
      'far-left': 'Providing a pathway to legal status would increase tax revenue by billions annually and grow the economy for everyone.',
    },
  },
]

interface Props {
  theme: Theme
  onComplete: () => void
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
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
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
                <p className="text-green-600 dark:text-green-400 font-medium">
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

export default function DataRealityLayer({theme, onComplete}: Props) {
  const {markDataPointViewed, recordResponse} = useJourneyStore()
  const [answeredFacts, setAnsweredFacts] = useState<Set<string>>(new Set())
  const allAnswered = answeredFacts.size >= IMMIGRATION_FACTS.length

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

      {/* Immigration Facts */}
      <div className="space-y-8 mb-12">
        {IMMIGRATION_FACTS.map((fact, index) => (
          <FactCard
            key={fact.id}
            fact={fact}
            theme={theme}
            index={index}
            onAnswer={handleAnswer}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        className="text-center mb-8"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {answeredFacts.size} of {IMMIGRATION_FACTS.length} facts explored
        </p>
        <div className="w-full max-w-md mx-auto mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-600 dark:bg-blue-400"
            initial={{width: 0}}
            animate={{width: `${(answeredFacts.size / IMMIGRATION_FACTS.length) * 100}%`}}
            transition={{duration: 0.5}}
          />
        </div>
      </motion.div>

      {/* Transition Text */}
      {allAnswered && (
        <motion.div
          initial={{opacity: 0, y: 30}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.3}}
          className="max-w-3xl mx-auto mb-12"
        >
          <Card className="shadow-xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 border-2 border-blue-200 dark:border-blue-800">
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
