'use client'

import {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import type {Theme, Answer} from '@/types/form'
import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Heart, Sparkles, ArrowRight} from 'lucide-react'

interface JourneySummary {
  totalAnswers: number
  yesCount: number
  maybeCount: number
  noCount: number
  persuasionScore: number
}

function calculateSummary(answers: Record<string, Answer>): JourneySummary {
  const values = Object.values(answers)
  const totalAnswers = values.length
  const yesCount = values.filter((a) => a === 'yes').length
  const maybeCount = values.filter((a) => a === 'maybe').length
  const noCount = values.filter((a) => a === 'no').length

  // Calculate persuasion score (yes = 2 points, maybe = 1 point, no = 0 points)
  const persuasionScore = totalAnswers > 0
    ? Math.round(((yesCount * 2 + maybeCount) / (totalAnswers * 2)) * 100)
    : 0

  return {
    totalAnswers,
    yesCount,
    maybeCount,
    noCount,
    persuasionScore,
  }
}

interface Props {
  theme: Theme
  answers: Record<string, Answer>
  onAnswer: (answer: Answer) => void
  onComplete: () => void
}

export default function ReflectionPersuasionLayer({
  theme,
  answers,
  onAnswer,
  onComplete,
}: Props) {
  const [showNarrative, setShowNarrative] = useState(false)
  const [readyForAction, setReadyForAction] = useState(false)
  const summary = calculateSummary(answers)

  useEffect(() => {
    // Delay narrative appearance for dramatic effect
    const timer = setTimeout(() => {
      setShowNarrative(true)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const handleReadyForAction = () => {
    setReadyForAction(true)
    setTimeout(() => {
      onComplete()
    }, 500)
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4">
      {/* Journey Summary Header */}
      <motion.div
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6}}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <Heart className="w-10 h-10 text-pink-500 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            A Moment of Reflection
          </h2>
        </div>
      </motion.div>


      {/* Universal Bipartisan Narrative */}
      <AnimatePresence>
        {showNarrative && (
          <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.4}}
          >
            <Card className="shadow-2xl border-2 border-blue-200 dark:border-blue-800">
              <CardContent className="p-8 md:p-12 space-y-6">
                {/* Opening Statement */}
                <motion.h3
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 0.6}}
                  className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 text-center leading-tight"
                >
                  Our immigration system is broken because we've stopped listening to each other.
                </motion.h3>

                <motion.p
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 0.8}}
                  className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  This idea doesn't belong to the far-right or the far-left. It doesn't fit neatly into Republican or Democratic talking points. That's exactly why it might work.
                </motion.p>

                {/* Conservative Perspective */}
                <motion.div
                  initial={{opacity: 0, x: -20}}
                  animate={{opacity: 1, x: 0}}
                  transition={{delay: 1.0}}
                  className="p-6 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg border-l-4 border-red-500"
                >
                  <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">
                    If you lean conservative
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    This plan ensures consequences, accountability, and billions in funding for border security. It's not amnesty—it's enforcement with a price tag.
                  </p>
                </motion.div>

                {/* Progressive Perspective */}
                <motion.div
                  initial={{opacity: 0, x: 20}}
                  animate={{opacity: 1, x: 0}}
                  transition={{delay: 1.2}}
                  className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-l-4 border-blue-500"
                >
                  <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">
                    If you lean progressive
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    This plan keeps families together, grows the economy, and treats people with dignity. It's not mass deportation—it's a pathway that respects both the rule of law and human rights.
                  </p>
                </motion.div>

                {/* The Truth Section */}
                <motion.div
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 1.4}}
                  className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg border-2 border-purple-300 dark:border-purple-700"
                >
                  <p className="text-gray-800 dark:text-gray-200 font-bold text-xl mb-3">
                    Here's the truth:
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    Most Americans—regardless of politics—want a solution that's tough, fair, and realistic. We want border security AND compassion. We want rule of law AND economic growth.
                  </p>
                  <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                    The $30,000 fine plan gives us both.
                  </p>
                </motion.div>

                {/* Closing Question */}
                <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 1.6}}
                  className="pt-6 space-y-4"
                >
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    The question isn't whether you agree with every detail. The question is: Are you tired of decades of political gridlock? Are you ready to try something new?
                  </p>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                  initial={{opacity: 0, scale: 0.95}}
                  animate={{opacity: 1, scale: 1}}
                  transition={{delay: 1.8}}
                  className="pt-8"
                >
                  <div className="text-center mb-6">
                    <p className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Are you ready to take action?
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Let's explore what you can do next.
                    </p>
                  </div>

                  <Button
                    onClick={handleReadyForAction}
                    size="lg"
                    disabled={readyForAction}
                    className="w-full h-16 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {readyForAction ? (
                      <span>Loading...</span>
                    ) : (
                      <>
                        <span>I'm Ready</span>
                        <ArrowRight className="w-6 h-6 ml-2" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
