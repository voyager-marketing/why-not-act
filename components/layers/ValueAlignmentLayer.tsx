'use client'

import {useState, useMemo, useEffect} from 'react'
import {motion} from 'framer-motion'
import type {Theme, Answer} from '@/types/form'
import type {LayeredQuestion} from '@/types/sanity'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {CheckCircle2, XCircle, Shield, AlertCircle, Loader2} from 'lucide-react'
import {Progress} from '@/components/ui/progress'
import {client} from '@/lib/sanity.client'

interface ValueQuestion {
  id: string
  text: Record<Theme, string>
}

interface Props {
  theme: Theme
  onAnswer: (answer: Answer) => void
  onComplete: () => void
  answers: Record<string, Answer>
}

// Fetcher function for questions
const fetchLayer2Questions = async (): Promise<ValueQuestion[]> => {
  const query = `*[_type == "layeredQuestion" && layer == "layer2"] | order(order asc) {
    _id,
    "id": _id,
    coreQuestion,
    farRightFraming,
    centerRightFraming,
    centerLeftFraming,
    farLeftFraming
  }`

  const sanityQuestions: LayeredQuestion[] = await client.fetch(query)

  // Transform Sanity data to match ValueQuestion interface
  return sanityQuestions.map((q) => ({
    id: q._id,
    text: {
      'far-right': q.farRightFraming?.headline || q.coreQuestion || '',
      'center-right': q.centerRightFraming?.headline || q.coreQuestion || '',
      'center-left': q.centerLeftFraming?.headline || q.coreQuestion || '',
      'far-left': q.farLeftFraming?.headline || q.coreQuestion || '',
    },
  }))
}

export default function ValueAlignmentLayer({
  theme,
  onAnswer,
  onComplete,
  answers,
}: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [localAnswers, setLocalAnswers] = useState<Record<string, Answer>>({})
  const [questions, setQuestions] = useState<ValueQuestion[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Fetch questions from Sanity CMS on mount
  useEffect(() => {
    let isMounted = true

    const loadQuestions = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchLayer2Questions()
        if (isMounted) {
          setQuestions(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load questions'))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadQuestions()

    return () => {
      isMounted = false
    }
  }, [])

  const currentQuestion = questions?.[currentQuestionIndex]
  const allAnswered = questions ? Object.keys(localAnswers).length === questions.length : false

  // Calculate yes percentage
  const yesPercentage = useMemo(() => {
    const yesCount = Object.values(localAnswers).filter((a) => a === 'yes').length
    const total = Object.keys(localAnswers).length
    return total > 0 ? Math.round((yesCount / total) * 100) : 0
  }, [localAnswers])

  const canProceed = yesPercentage >= 66 && allAnswered

  const handleAnswer = (answer: Answer) => {
    if (!currentQuestion) return

    const newAnswers = {...localAnswers, [currentQuestion.id]: answer}
    setLocalAnswers(newAnswers)
    onAnswer(answer)

    // Move to next question or show results
    if (questions && currentQuestionIndex < questions.length - 1) {
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

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
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

        <Card className="shadow-2xl">
          <CardContent className="p-12 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            <p className="text-gray-600 dark:text-gray-400">Loading questions...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
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
        </motion.div>

        <Card className="shadow-2xl border-red-200 dark:border-red-800">
          <CardContent className="p-12 flex flex-col items-center justify-center gap-4">
            <AlertCircle className="w-12 h-12 text-red-600" />
            <p className="text-red-600 dark:text-red-400 font-semibold">
              Failed to load questions
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {error.message || 'An error occurred while fetching questions from the server.'}
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="mt-4"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // No questions found
  if (!questions || questions.length === 0) {
    return (
      <div className="space-y-6">
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
        </motion.div>

        <Card className="shadow-2xl">
          <CardContent className="p-12 flex flex-col items-center justify-center gap-4">
            <AlertCircle className="w-12 h-12 text-amber-600" />
            <p className="text-gray-600 dark:text-gray-400">
              No questions available at this time.
            </p>
            <Button onClick={onComplete} className="mt-4">
              Continue Anyway
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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
      {!allAnswered && currentQuestion && (
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
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              <CardTitle className="text-2xl md:text-3xl leading-tight">
                {currentQuestion.text[theme]}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 md:p-8">
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
