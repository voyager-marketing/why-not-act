'use client'

import {useState} from 'react'
import {motion} from 'framer-motion'
import type {Theme, Answer} from '@/types/form'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Heart, CheckCircle2, XCircle, Sparkles, Users} from 'lucide-react'

interface PersonalPrompt {
  id: string
  question: string
  themedNarrative: Record<Theme, string[]>
}

const REFLECTION_PROMPTS: PersonalPrompt[] = [
  {
    id: 'personal-connection',
    question: 'Have you or someone you know ever been cheated out of wages?',
    themedNarrative: {
      'far-left': [
        'This isn\'t just statistics - it\'s about real people and real harm.',
        'Every worker deserves dignity, respect, and fair compensation.',
        'When we stand together, we can create real change.',
      ],
      'mid-left': [
        'Behind every number is a family struggling to make ends meet.',
        'Strong communities are built on fairness and accountability.',
        'Your voice can help create a better system for everyone.',
      ],
      'mid-right': [
        'Hard-working Americans deserve to keep what they earn.',
        'This is about basic fairness and the rule of law.',
        'Together, we can protect workers and honest businesses.',
      ],
      'far-right': [
        'American workers built this country and deserve respect.',
        'No one should get away with stealing from those who work hard.',
        'It\'s time to stand up for what\'s right.',
      ],
    },
  },
  {
    id: 'future-vision',
    question: 'Can you imagine a world where wage theft is rare because the consequences are real?',
    themedNarrative: {
      'far-left': [
        'A world where workers have real power and protection.',
        'Where corporations can\'t exploit people without consequences.',
        'Where justice isn\'t just for those who can afford it.',
      ],
      'mid-left': [
        'A fairer economy where everyone plays by the same rules.',
        'Where families can count on receiving the wages they earned.',
        'Where honest businesses thrive without unfair competition.',
      ],
      'mid-right': [
        'A market that rewards those who do the right thing.',
        'Where the law actually protects American workers.',
        'Where integrity matters more than cutting corners.',
      ],
      'far-right': [
        'A nation that defends its workers from exploitation.',
        'Where lawbreakers face real consequences.',
        'Where American values of hard work are respected.',
      ],
    },
  },
]

interface JourneySummary {
  totalAnswers: number
  yesCount: number
  maybeCount: number
  noCount: number
}

function calculateSummary(answers: Record<string, Answer>): JourneySummary {
  const values = Object.values(answers)
  return {
    totalAnswers: values.length,
    yesCount: values.filter((a) => a === 'yes').length,
    maybeCount: values.filter((a) => a === 'maybe').length,
    noCount: values.filter((a) => a === 'no').length,
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
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [showSummary, setShowSummary] = useState(true)
  const [promptAnswers, setPromptAnswers] = useState<Record<string, Answer>>({})

  const currentPrompt = REFLECTION_PROMPTS[currentPromptIndex]
  const allAnswered = Object.keys(promptAnswers).length === REFLECTION_PROMPTS.length
  const summary = calculateSummary(answers)

  const handleAnswer = (answer: Answer) => {
    const newAnswers = {...promptAnswers, [currentPrompt.id]: answer}
    setPromptAnswers(newAnswers)
    onAnswer(answer)

    if (currentPromptIndex < REFLECTION_PROMPTS.length - 1) {
      setTimeout(() => {
        setShowSummary(false)
        setCurrentPromptIndex(currentPromptIndex + 1)
        setTimeout(() => setShowSummary(true), 100)
      }, 500)
    } else {
      setTimeout(() => {
        onComplete()
      }, 1000)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="w-10 h-10 text-pink-500" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Your Journey So Far
          </h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Let's reflect on what we've discovered together.
        </p>
      </motion.div>

      {/* Journey Summary */}
      <motion.div
        initial={{opacity: 0, scale: 0.95}}
        animate={{opacity: 1, scale: 1}}
        className="mb-12"
      >
        <Card className="shadow-xl bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                You've Been Engaged
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {summary.yesCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Yes</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600 mb-1">
                  {summary.maybeCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Maybe</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-3xl font-bold text-red-600 mb-1">
                  {summary.noCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">No</div>
              </div>
            </div>

            <p className="text-center text-gray-700 dark:text-gray-300 text-lg">
              You've engaged with {summary.totalAnswers} questions on this journey.
              Thank you for taking the time to consider this important issue.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Emotional Prompt */}
      {!allAnswered && showSummary && (
        <motion.div
          key={currentPrompt.id}
          initial={{opacity: 0, x: 50}}
          animate={{opacity: 1, x: 0}}
          exit={{opacity: 0, x: -50}}
          transition={{duration: 0.5}}
        >
          <Card className="shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800">
              <CardTitle className="text-2xl md:text-3xl leading-tight">
                {currentPrompt.question}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-8 md:p-10">
              {/* Themed Narrative */}
              <div className="space-y-4 mb-8">
                {currentPrompt.themedNarrative[theme].map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: idx * 0.2}}
                    className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Personal Connection */}
              <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg border-l-4 border-pink-500 mb-8">
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    Real change happens when people like you decide to act. Your voice matters.
                  </p>
                </div>
              </div>

              {/* Answer Buttons */}
              <div className="space-y-3">
                <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                  Would you help make this change happen?
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <motion.div whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>
                    <Button
                      onClick={() => handleAnswer('yes')}
                      size="lg"
                      className="w-full h-24 flex flex-col gap-2 bg-green-500 hover:bg-green-600 text-white"
                    >
                      <CheckCircle2 className="w-12 h-12" />
                      <span className="text-xl font-bold">Yes, I Would Help</span>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>
                    <Button
                      onClick={() => handleAnswer('no')}
                      size="lg"
                      className="w-full h-24 flex flex-col gap-2 bg-gray-500 hover:bg-gray-600 text-white"
                    >
                      <XCircle className="w-12 h-12" />
                      <span className="text-xl font-bold">Not Sure Yet</span>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Completion Message */}
      {allAnswered && (
        <motion.div
          initial={{opacity: 0, scale: 0.9}}
          animate={{opacity: 1, scale: 1}}
        >
          <Card className="shadow-2xl bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900">
            <CardContent className="p-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Thank You for Your Thoughtfulness
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                You've completed this journey of understanding. Now let's talk about what you can do next.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
