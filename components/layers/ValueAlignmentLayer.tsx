'use client'

import {useState, useMemo} from 'react'
import {motion} from 'framer-motion'
import type {Theme, Answer} from '@/types/form'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {CheckCircle2, XCircle, Shield, AlertCircle} from 'lucide-react'
import {Progress} from '@/components/ui/progress'

interface ValueQuestion {
  id: string
  text: string
  themedFraming: Record<Theme, string>
}

const VALUE_QUESTIONS: ValueQuestion[] = [
  {
    id: 'fair-compensation',
    text: 'Should workers be fairly compensated for their labor?',
    themedFraming: {
      'far-left': 'Workers deserve dignity and fair wages - not exploitation by corporate greed.',
      'mid-left': 'Fair compensation creates a stronger economy and healthier communities.',
      'mid-right': 'People who work hard should be rewarded - that\'s the American way.',
      'far-right': 'Those who contribute to society deserve to keep what they earn without government interference.',
    },
  },
  {
    id: 'rule-of-law',
    text: 'Should there be consequences when companies break the law?',
    themedFraming: {
      'far-left': 'Corporations must be held accountable when they exploit workers and communities.',
      'mid-left': 'A fair system requires enforcement of labor protections for everyone.',
      'mid-right': 'The rule of law matters - even for big businesses.',
      'far-right': 'No one should be above the law. Lawbreakers must face real consequences.',
    },
  },
  {
    id: 'community-protection',
    text: 'Should we protect American communities from exploitation?',
    themedFraming: {
      'far-left': 'We must defend vulnerable communities from predatory business practices.',
      'mid-left': 'Strong communities are built on protecting workers and their families.',
      'mid-right': 'American towns and families deserve protection from exploitation.',
      'far-right': 'Our communities and sovereignty must be defended from those who take advantage.',
    },
  },
]

interface Props {
  theme: Theme
  onAnswer: (answer: Answer) => void
  onComplete: () => void
  answers: Record<string, Answer>
}

export default function ValueAlignmentLayer({
  theme,
  onAnswer,
  onComplete,
  answers,
}: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [localAnswers, setLocalAnswers] = useState<Record<string, Answer>>({})

  const currentQuestion = VALUE_QUESTIONS[currentQuestionIndex]
  const allAnswered = Object.keys(localAnswers).length === VALUE_QUESTIONS.length

  // Calculate yes percentage
  const yesPercentage = useMemo(() => {
    const yesCount = Object.values(localAnswers).filter((a) => a === 'yes').length
    const total = Object.keys(localAnswers).length
    return total > 0 ? Math.round((yesCount / total) * 100) : 0
  }, [localAnswers])

  const canProceed = yesPercentage >= 66 && allAnswered

  const handleAnswer = (answer: Answer) => {
    const newAnswers = {...localAnswers, [currentQuestion.id]: answer}
    setLocalAnswers(newAnswers)
    onAnswer(answer)

    // Move to next question or show results
    if (currentQuestionIndex < VALUE_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }, 300)
    }
  }

  const handleContinue = () => {
    if (canProceed) {
      onComplete()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="w-10 h-10 text-purple-600" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Building Trust
          </h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Before we dive into the details, let's align on some core values.
        </p>
      </motion.div>

      {/* Progress Indicator */}
      {allAnswered && (
        <motion.div
          initial={{opacity: 0, scale: 0.9}}
          animate={{opacity: 1, scale: 1}}
          className="mb-6"
        >
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Value Alignment Score
                </span>
                <span className="text-2xl font-bold text-purple-600">
                  {yesPercentage}%
                </span>
              </div>
              <Progress value={yesPercentage} className="h-3" />
              {yesPercentage >= 66 ? (
                <p className="text-sm text-green-600 dark:text-green-400 mt-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Great! We share common ground. Let's continue.
                </p>
              ) : (
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  We need at least 66% alignment to continue this journey together.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Question Card */}
      {!allAnswered && (
        <motion.div
          key={currentQuestion.id}
          initial={{opacity: 0, x: 50}}
          animate={{opacity: 1, x: 0}}
          exit={{opacity: 0, x: -50}}
          transition={{duration: 0.3}}
        >
          <Card className="shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 pb-6">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Question {currentQuestionIndex + 1} of {VALUE_QUESTIONS.length}
              </div>
              <CardTitle className="text-2xl md:text-3xl leading-tight">
                {currentQuestion.text}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 md:p-8">
              {/* Themed Framing */}
              <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border-l-4 border-purple-500">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {currentQuestion.themedFraming[theme]}
                </p>
              </div>

              {/* Large Yes/No Buttons */}
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  whileHover={{scale: 1.02}}
                  whileTap={{scale: 0.98}}
                >
                  <Button
                    onClick={() => handleAnswer('yes')}
                    size="lg"
                    className="w-full h-32 flex flex-col gap-3 bg-green-500 hover:bg-green-600 text-white border-0 shadow-lg"
                  >
                    <CheckCircle2 className="w-16 h-16" />
                    <span className="text-2xl font-bold">Yes</span>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{scale: 1.02}}
                  whileTap={{scale: 0.98}}
                >
                  <Button
                    onClick={() => handleAnswer('no')}
                    size="lg"
                    className="w-full h-32 flex flex-col gap-3 bg-red-500 hover:bg-red-600 text-white border-0 shadow-lg"
                  >
                    <XCircle className="w-16 h-16" />
                    <span className="text-2xl font-bold">No</span>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Continue Button */}
      {allAnswered && (
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          className="flex justify-center"
        >
          <Button
            onClick={handleContinue}
            disabled={!canProceed}
            size="lg"
            className="px-12 py-6 text-xl font-bold"
          >
            {canProceed ? 'Continue Journey' : 'Alignment Required to Continue'}
          </Button>
        </motion.div>
      )}
    </div>
  )
}
