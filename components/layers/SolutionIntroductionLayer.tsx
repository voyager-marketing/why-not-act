'use client'

import {useState} from 'react'
import {motion} from 'framer-motion'
import type {Theme, Answer} from '@/types/form'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Lightbulb, CheckCircle2, XCircle, Scale, DollarSign, Users, TrendingUp} from 'lucide-react'

interface SolutionNarrative {
  title: string
  story: string[]
  themedFraming: Record<Theme, {
    headline: string
    benefits: string[]
  }>
}

const SOLUTION: SolutionNarrative = {
  title: 'A Simple, Powerful Solution',
  story: [
    'Imagine a construction company in your community. They hire workers, promise them fair wages, then disappear without paying - leaving families struggling to pay rent and put food on the table.',
    'This happens thousands of times every day across America. Current penalties are too weak to stop it.',
    'But what if there was a real consequence? What if employers who steal wages had to pay a $30,000 fine for each violation?',
    'Not a complex bureaucracy. Not years of legal battles. Just a clear, immediate consequence that makes wage theft too expensive to commit.',
  ],
  themedFraming: {
    'far-left': {
      headline: 'Real Accountability for Corporate Theft',
      benefits: [
        'Workers get immediate protection from exploitation',
        'Puts teeth into labor law enforcement',
        'Funds go directly to supporting affected communities',
        'Shifts power back to working people',
      ],
    },
    'mid-left': {
      headline: 'Stronger Enforcement, Fairer Markets',
      benefits: [
        'Levels the playing field for honest businesses',
        'Creates real deterrent against wage theft',
        'Funds worker protection programs',
        'Strengthens communities and local economies',
      ],
    },
    'mid-right': {
      headline: 'Defending Workers and Free Markets',
      benefits: [
        'Protects law-abiding businesses from unfair competition',
        'Rewards those who play by the rules',
        'Makes the penalty fit the crime',
        'Restores integrity to the marketplace',
      ],
    },
    'far-right': {
      headline: 'Law and Order for American Workers',
      benefits: [
        'Real consequences for those who break the law',
        'Protects American workers from exploitation',
        'No handouts - lawbreakers pay the price',
        'Defends the dignity of honest work',
      ],
    },
  },
}

const BREAKDOWN_ITEMS = [
  {
    icon: DollarSign,
    label: '$30,000 Fine',
    description: 'Per wage theft violation',
  },
  {
    icon: Scale,
    label: 'Clear Standard',
    description: 'No ambiguity, no loopholes',
  },
  {
    icon: Users,
    label: 'Immediate Impact',
    description: 'Protects workers right away',
  },
  {
    icon: TrendingUp,
    label: 'Strong Deterrent',
    description: 'Makes theft too costly',
  },
]

interface Props {
  theme: Theme
  onAnswer: (answer: Answer) => void
  onComplete: () => void
}

export default function SolutionIntroductionLayer({theme, onAnswer, onComplete}: Props) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [answered, setAnswered] = useState(false)

  const handleNextStory = () => {
    if (currentStoryIndex < SOLUTION.story.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1)
    } else {
      setShowSolution(true)
    }
  }

  const handleAnswer = (answer: Answer) => {
    setAnswered(true)
    onAnswer(answer)
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  const themedContent = SOLUTION.themedFraming[theme]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Lightbulb className="w-10 h-10 text-amber-500" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            {SOLUTION.title}
          </h2>
        </div>
      </motion.div>

      {/* Story Narrative */}
      {!showSolution && (
        <motion.div
          key={currentStoryIndex}
          initial={{opacity: 0, x: 50}}
          animate={{opacity: 1, x: 0}}
          exit={{opacity: 0, x: -50}}
          transition={{duration: 0.5}}
        >
          <Card className="shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {SOLUTION.story[currentStoryIndex]}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {currentStoryIndex + 1} of {SOLUTION.story.length}
                </span>
                <Button onClick={handleNextStory} size="lg">
                  {currentStoryIndex < SOLUTION.story.length - 1 ? 'Continue' : 'See the Solution'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Solution Details */}
      {showSolution && (
        <motion.div
          initial={{opacity: 0, scale: 0.95}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.5}}
          className="space-y-8"
        >
          {/* Visual Breakdown */}
          <Card className="shadow-2xl bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center">
                The $30,000 Solution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {BREAKDOWN_ITEMS.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.label}
                      initial={{opacity: 0, y: 20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{delay: idx * 0.1}}
                      className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                    >
                      <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                        <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                          {item.label}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Themed Benefits */}
          <Card className="shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800">
              <CardTitle className="text-2xl md:text-3xl">
                {themedContent.headline}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <ul className="space-y-4 mb-8">
                {themedContent.benefits.map((benefit, idx) => (
                  <motion.li
                    key={idx}
                    initial={{opacity: 0, x: -20}}
                    animate={{opacity: 1, x: 0}}
                    transition={{delay: idx * 0.1}}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700 dark:text-gray-300">{benefit}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Agreement Question */}
              {!answered && (
                <div className="border-t pt-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                    Would you support this approach?
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <motion.div whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>
                      <Button
                        onClick={() => handleAnswer('yes')}
                        size="lg"
                        className="w-full h-24 flex flex-col gap-2 bg-green-500 hover:bg-green-600 text-white"
                      >
                        <CheckCircle2 className="w-12 h-12" />
                        <span className="text-xl font-bold">Yes, I Support This</span>
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>
                      <Button
                        onClick={() => handleAnswer('no')}
                        size="lg"
                        className="w-full h-24 flex flex-col gap-2 bg-red-500 hover:bg-red-600 text-white"
                      >
                        <XCircle className="w-12 h-12" />
                        <span className="text-xl font-bold">No, I Don't</span>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              )}

              {answered && (
                <motion.div
                  initial={{opacity: 0, scale: 0.9}}
                  animate={{opacity: 1, scale: 1}}
                  className="text-center py-4"
                >
                  <p className="text-lg text-green-600 dark:text-green-400 font-medium">
                    Thank you for your response. Let's explore the impact...
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
