'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useFormStore} from '@/lib/formStore'
import {getResultType} from '@/lib/resultRouter'
import QuestionStep from './QuestionStep'
import type {Question, Theme} from '@/types/form'
import {motion, AnimatePresence} from 'framer-motion'
import {Progress} from '@/components/ui/progress'
import {Badge} from '@/components/ui/badge'
import {Card} from '@/components/ui/card'
import {ChevronLeft, Home} from 'lucide-react'

interface Props {
  questions: Question[]
  theme: string
}

export default function FormWizard({questions, theme}: Props) {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(0)
  const router = useRouter()
  const {setAnswer, calculateScore, score} = useFormStore()

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleAnswer = (answer: 'yes' | 'no' | 'maybe') => {
    setAnswer(currentQuestion.order, answer)
    setDirection(1)

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Final question - calculate score and route
      calculateScore()
      setTimeout(() => {
        const currentScore = useFormStore.getState().score
        const resultType = getResultType(currentScore, theme as Theme)
        router.push(`/result/${resultType}`)
      }, 0)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep(currentStep - 1)
    }
  }

  const themeColors = {
    'far-left': 'from-blue-600 to-blue-700',
    'mid-left': 'from-blue-400 to-blue-500',
    'mid-right': 'from-red-400 to-red-500',
    'far-right': 'from-red-600 to-red-700',
  }

  const themeGradient = themeColors[theme as Theme] || 'from-purple-600 to-blue-600'

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900" />

      {/* Animated Background Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 max-w-4xl min-h-screen flex flex-col justify-center">
        {/* Header */}
        <motion.div
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            {currentStep === 0 ? (
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              >
                <Home className="w-4 h-4" />
                Start Over
              </button>
            ) : (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <Badge variant="secondary" className="capitalize">
              {theme.replace('-', ' ')}
            </Badge>
          </div>

          <Card className="p-6 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Question {currentStep + 1} of {questions.length}
              </span>
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </Card>
        </motion.div>

        {/* Question */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{
              opacity: 0,
              x: direction > 0 ? 100 : -100,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: direction > 0 ? -100 : 100,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
          >
            <QuestionStep
              question={currentQuestion}
              theme={theme as Theme}
              onAnswer={handleAnswer}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
