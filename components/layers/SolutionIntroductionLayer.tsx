'use client'

import {useState, useRef, useEffect} from 'react'
import {motion} from 'framer-motion'
import type {Theme, Answer} from '@/types/form'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {CheckCircle2, DollarSign, Shield, GraduationCap, Target, Users, ArrowRight} from 'lucide-react'
import {useJourneyStore} from '@/lib/journeyStore'
import {useTheme} from '@/hooks/useTheme'

interface UniversalPoint {
  icon: any
  text: string
}

const UNIVERSAL_POINTS: UniversalPoint[] = [
  {
    icon: DollarSign,
    text: 'A $30,000 fine to self-identify and enter the immigration system',
  },
  {
    icon: Shield,
    text: 'Immediate deportation for individuals with criminal records',
  },
  {
    icon: GraduationCap,
    text: 'Mandatory ESL and civics training to integrate successfully',
  },
  {
    icon: Target,
    text: 'ICE focuses only on criminals, reducing cost and conflict',
  },
  {
    icon: Users,
    text: 'Option to serve in AmeriCorps or the U.S. military to offset the fine',
  },
  {
    icon: CheckCircle2,
    text: 'A predictable, accountable process replacing chaos and fear',
  },
]

interface ValuesContent {
  explanation: string[]
  prompt: string
  yesLabel: string
  maybeLabel: string
}

const VALUES_CONTENT: Record<Theme, ValuesContent> = {
  'mid-right': {
    explanation: [
      'This idea delivers legal accountability while avoiding the enormous cost of mass deportation.',
      'It\'s fiscally responsible — turning a broken system into a revenue generator instead of a financial disaster.',
      'And it rewards people who come forward, follow the law, and take the steps required to earn their place.',
    ],
    prompt: 'Would a lawful, cost-effective plan that stabilizes the workforce and strengthens security make sense to explore?',
    yesLabel: 'Here\'s what the impact could be.',
    maybeLabel: 'Let\'s look at the data behind it.',
  },
  'far-right': {
    explanation: [
      'This idea restores control of our immigration system. It strengthens American sovereignty, enforces the rule of law, and generates the revenue needed to secure the border properly.',
      'By separating law-abiding immigrants from criminals, ICE can focus entirely on the threats that matter — making communities safer.',
      'And because the fine pays for the program (and potentially the border itself), there\'s no burden on taxpayers.',
    ],
    prompt: 'Does a solution that strengthens border security and pays for itself align with your values?',
    yesLabel: 'Let\'s look at what this could achieve.',
    maybeLabel: 'Let\'s examine the impact together.',
  },
  'mid-left': {
    explanation: [
      'This idea offers a humane, structured path forward — one that keeps families together and avoids the chaos of deporting millions.',
      'It saves billions in taxpayer dollars while strengthening the healthcare, education, and local economies that rely on immigrant labor.',
      'And it provides a clear, predictable process instead of confusion, fear, and political gridlock.',
    ],
    prompt: 'Does a practical, humane plan that stabilizes communities sound worth considering?',
    yesLabel: 'Let\'s see how it would work in practice.',
    maybeLabel: 'Let\'s walk through the impact.',
  },
  'far-left': {
    explanation: [
      'This idea creates a fair, realistic pathway for millions of undocumented people who already contribute to our economy and communities.',
      'It reduces exploitation by giving people legal standing, protection, and a voice.',
      'Families stay intact. Workers aren\'t preyed upon. Communities gain stability.',
    ],
    prompt: 'Would a justice-oriented pathway that protects families and ends exploitation align with the future you want to see?',
    yesLabel: 'Let\'s explore what this could achieve.',
    maybeLabel: 'Here\'s the bigger picture.',
  },
}

interface Props {
  theme: Theme
  onAnswer: (answer: Answer) => void
  onComplete: () => void
}

export default function SolutionIntroductionLayer({theme, onAnswer, onComplete}: Props) {
  const [stage, setStage] = useState<1 | 2>(1)
  const [answered, setAnswered] = useState(false)
  const startTimeRef = useRef<number>(Date.now())
  const {recordResponse} = useJourneyStore()
  const {language} = useTheme()

  const valuesContent = VALUES_CONTENT[theme]

  const handleContinueToStage2 = () => {
    setStage(2)
  }

  const handleAnswer = (answer: Answer) => {
    const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000)

    // Record the response in the journey store
    recordResponse(
      'solution-introduction',
      answer,
      timeSpent,
      1.0 // High persuasion weight for this critical layer
    )

    setAnswered(true)
    onAnswer(answer)

    // Both "yes" and "maybe" proceed to next layer
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4">
      {/* Stage 1: Universal Explanation */}
      {stage === 1 && (
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
        >
          <Card className="shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800">
              <CardTitle className="text-2xl md:text-3xl text-center">
                Universal Explanation of the Fine-Based Pathway
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6">
                {UNIVERSAL_POINTS.map((point, idx) => {
                  const Icon = point.icon
                  return (
                    <motion.div
                      key={idx}
                      initial={{opacity: 0, x: -20}}
                      animate={{opacity: 1, x: 0}}
                      transition={{delay: idx * 0.1, duration: 0.4}}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                          <Icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                        {point.text}
                      </p>
                    </motion.div>
                  )
                })}
              </div>

              {/* Transition Text */}
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.8, duration: 0.5}}
                className="mt-12 text-center"
              >
                <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 mb-8">
                  Here's how this idea speaks directly to your values...
                </p>
                <Button
                  onClick={handleContinueToStage2}
                  size="lg"
                  className="px-8 py-6 text-lg"
                >
                  Continue
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Stage 2: Values-Based Explanation */}
      {stage === 2 && (
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
        >
          <Card className="shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800">
              <CardTitle className="text-2xl md:text-3xl text-center">
                Speaking to Your Values
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 md:p-12">
              {/* Values-specific explanation */}
              <div className="space-y-6 mb-10">
                {valuesContent.explanation.map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: idx * 0.2, duration: 0.4}}
                    className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Interactive Prompt */}
              {!answered && (
                <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 0.8}}
                  className="border-t pt-8"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
                    {valuesContent.prompt}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <motion.div whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>
                      <Button
                        onClick={() => handleAnswer('yes')}
                        size="lg"
                        className="w-full h-auto py-6 px-6 flex flex-col gap-3 bg-green-500 hover:bg-green-600 text-white"
                      >
                        <CheckCircle2 className="w-10 h-10" />
                        <span className="text-lg font-bold">Yes</span>
                        <span className="text-sm font-normal opacity-90">
                          {valuesContent.yesLabel}
                        </span>
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>
                      <Button
                        onClick={() => handleAnswer('maybe')}
                        size="lg"
                        className="w-full h-auto py-6 px-6 flex flex-col gap-3 bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <ArrowRight className="w-10 h-10" />
                        <span className="text-lg font-bold">Maybe</span>
                        <span className="text-sm font-normal opacity-90">
                          {valuesContent.maybeLabel}
                        </span>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {answered && (
                <motion.div
                  initial={{opacity: 0, scale: 0.9}}
                  animate={{opacity: 1, scale: 1}}
                  className="text-center py-8"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <p className="text-xl text-green-600 dark:text-green-400 font-medium">
                    Let's explore the impact together...
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
