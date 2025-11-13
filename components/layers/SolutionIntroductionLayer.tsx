'use client'

import {useState} from 'react'
import {motion} from 'framer-motion'
import type {Theme, Answer} from '@/types/form'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Lightbulb, CheckCircle2, XCircle, DollarSign, Shield, GraduationCap, Target, Users} from 'lucide-react'
import {useTheme} from '@/hooks/useTheme'

interface SolutionComponent {
  icon: any
  label: string
  description: string
}

const SOLUTION_COMPONENTS: SolutionComponent[] = [
  {
    icon: DollarSign,
    label: '$30,000 Fine to Self-Identify',
    description: 'Undocumented immigrants pay a fine to come forward and begin the legalization process',
  },
  {
    icon: Shield,
    label: 'Deport Those with Criminal Records',
    description: 'Anyone with a serious criminal record is deported. No exceptions',
  },
  {
    icon: GraduationCap,
    label: 'English and Civics Training',
    description: 'Participants must learn English and pass a U.S. civics test to earn legal status',
  },
  {
    icon: Target,
    label: 'ICE Focuses on Criminals',
    description: 'Immigration enforcement prioritizes criminals, not families',
  },
  {
    icon: Users,
    label: 'Optional Service Pathway',
    description: 'Those who can\'t afford the fine can serve in AmeriCorps or the U.S. military to earn legal status',
  },
]

interface ThemedFraming {
  headline: string
  benefits: string[]
}

const THEMED_FRAMING: Record<Theme, ThemedFraming> = {
  'far-right': {
    headline: 'Secure Our Border, Protect American Citizens',
    benefits: [
      'Criminals face immediate deportation - zero tolerance for lawbreakers',
      'Every illegal immigrant pays a steep price ($30,000) to come forward',
      'English and civics requirements defend American culture and values',
      'ICE resources focused on dangerous criminals threatening our communities',
      'Military service option ensures those who stay serve America first',
    ],
  },
  'mid-right': {
    headline: 'A Fiscally Responsible Immigration Solution',
    benefits: [
      'Generates $30,000 per immigrant - funds border security and enforcement',
      'Criminal deportations reduce taxpayer burden on corrections system',
      'English requirement improves economic productivity and integration',
      'Efficient use of ICE resources targeting high-priority threats',
      'Service pathway creates value while reducing financial burden',
    ],
  },
  'mid-left': {
    headline: 'Fair Accountability with Pathways to Belonging',
    benefits: [
      'Keeps families together while ensuring public safety through criminal deportations',
      'Fine structure balances accountability with realistic opportunity',
      'English and civics training strengthens community integration',
      'Focuses enforcement on genuine threats, not productive families',
      'Service option provides dignity and contribution for those without means',
    ],
  },
  'far-left': {
    headline: 'Transform a Broken System into Dignified Pathways',
    benefits: [
      'Stops mass deportations by focusing only on serious criminals',
      'Creates accessible pathway while acknowledging fine burden through service option',
      'Education requirements empower immigrants rather than exclude them',
      'Redirects enforcement away from exploited workers toward exploitation',
      'Service pathway honors contribution and builds solidarity',
    ],
  },
}

interface Props {
  theme: Theme
  onAnswer: (answer: Answer) => void
  onComplete: () => void
}

export default function SolutionIntroductionLayer({theme, onAnswer, onComplete}: Props) {
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0)
  const [showAllComponents, setShowAllComponents] = useState(false)
  const [answered, setAnswered] = useState(false)
  const {language} = useTheme()

  const handleNextComponent = () => {
    if (currentComponentIndex < SOLUTION_COMPONENTS.length - 1) {
      setCurrentComponentIndex(currentComponentIndex + 1)
    } else {
      setShowAllComponents(true)
    }
  }

  const handleAnswer = (answer: Answer) => {
    setAnswered(true)
    onAnswer(answer)
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  const themedContent = THEMED_FRAMING[theme]

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
            The $30,000 Fine Pathway
          </h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          A comprehensive solution with five core components
        </p>
      </motion.div>

      {/* Component-by-Component Introduction */}
      {!showAllComponents && (
        <motion.div
          key={currentComponentIndex}
          initial={{opacity: 0, x: 50}}
          animate={{opacity: 1, x: 0}}
          exit={{opacity: 0, x: -50}}
          transition={{duration: 0.5}}
        >
          <Card className="shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Icon */}
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 p-6 rounded-full">
                  {(() => {
                    const Icon = SOLUTION_COMPONENTS[currentComponentIndex].icon
                    return <Icon className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                  })()}
                </div>

                {/* Label */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {SOLUTION_COMPONENTS[currentComponentIndex].label}
                </h3>

                {/* Description */}
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  {SOLUTION_COMPONENTS[currentComponentIndex].description}
                </p>
              </div>

              <div className="flex justify-between items-center mt-8">
                <span className="text-sm text-gray-500">
                  Component {currentComponentIndex + 1} of {SOLUTION_COMPONENTS.length}
                </span>
                <Button onClick={handleNextComponent} size="lg">
                  {currentComponentIndex < SOLUTION_COMPONENTS.length - 1 ? 'Next Component' : 'See Full Solution'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* All Components Overview */}
      {showAllComponents && (
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
                Five Core Components
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SOLUTION_COMPONENTS.map((component, idx) => {
                  const Icon = component.icon
                  return (
                    <motion.div
                      key={component.label}
                      initial={{opacity: 0, y: 20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{delay: idx * 0.1}}
                      className="flex flex-col items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                    >
                      <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                        <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                          {component.label}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {component.description}
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
