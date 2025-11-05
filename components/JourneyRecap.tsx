'use client'

import {motion} from 'framer-motion'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {CheckCircle2, Circle, Sparkles} from 'lucide-react'
import type {UserJourney, Answer, Theme} from '@/types/form'

interface Props {
  journey: UserJourney
}

// Theme display names
const THEME_NAMES: Record<Theme, string> = {
  'far-left': 'Progressive',
  'mid-left': 'Liberal',
  'mid-right': 'Conservative',
  'far-right': 'Traditionalist',
}

// Theme colors
const THEME_COLORS: Record<Theme, string> = {
  'far-left': 'bg-red-500',
  'mid-left': 'bg-blue-500',
  'mid-right': 'bg-purple-500',
  'far-right': 'bg-indigo-500',
}

// Answer display
const ANSWER_LABELS: Record<Answer, {label: string; color: string; icon: string}> = {
  yes: {label: 'Engaged', color: 'text-green-600 dark:text-green-400', icon: '✓'},
  maybe: {label: 'Curious', color: 'text-yellow-600 dark:text-yellow-400', icon: '~'},
  no: {label: 'Skeptical', color: 'text-gray-600 dark:text-gray-400', icon: '○'},
}

export default function JourneyRecap({journey}: Props) {
  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const pathVariants = {
    hidden: {pathLength: 0, opacity: 0},
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [0.42, 0, 0.58, 1] as any,
      },
    },
  }

  const itemVariants = {
    hidden: {opacity: 0, x: -20},
    visible: {opacity: 1, x: 0},
  }

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 border-b">
        <CardTitle className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <span className="text-2xl">Your Journey</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {/* Journey metadata */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Badge className={`${THEME_COLORS[journey.theme]} text-white px-3 py-1`}>
            {THEME_NAMES[journey.theme]} Lens
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            {journey.layersCompleted} Layers Explored
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            Score: {journey.score}
          </Badge>
        </div>

        {/* Visual timeline with SVG path */}
        <div className="mb-6 relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
          <motion.svg
            className="absolute left-6 top-0 bottom-0 w-0.5"
            style={{height: '100%', overflow: 'visible'}}
          >
            <motion.line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              stroke="url(#gradient)"
              strokeWidth="2"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </motion.svg>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 relative"
          >
            {journey.keyAnswers.map((answer, index) => {
              const answerConfig = ANSWER_LABELS[answer.answer]
              const isLast = index === journey.keyAnswers.length - 1

              return (
                <motion.div
                  key={`${answer.questionOrder}-${index}`}
                  variants={itemVariants}
                  className="flex items-start gap-4 relative"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{delay: index * 0.1 + 0.5}}
                    className="relative z-10 flex-shrink-0"
                  >
                    {answer.answer === 'yes' ? (
                      <CheckCircle2 className="w-12 h-12 text-green-500 bg-white dark:bg-gray-900 rounded-full" />
                    ) : (
                      <Circle className={`w-12 h-12 ${answerConfig.color} bg-white dark:bg-gray-900 rounded-full`} />
                    )}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                          Layer {answer.questionOrder}: {answer.topic}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`${answerConfig.color} border-current flex-shrink-0`}
                        >
                          {answerConfig.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className={`text-lg font-bold ${answerConfig.color}`}>
                          {answerConfig.icon}
                        </span>
                        <span>
                          You responded:{' '}
                          <span className="font-medium capitalize">{answer.answer}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Your unique perspective framing */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 1}}
          className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                Your Unique Perspective
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Through your {THEME_NAMES[journey.theme].toLowerCase()} lens, you
                explored {journey.layersCompleted} layers of data and formed your own
                understanding. This journey is uniquely yours - shaped by your values,
                curiosity, and willingness to engage with complex issues.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Data points remembered */}
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 1.2}}
          className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <p>
            Journey completed on{' '}
            {new Date(journey.completedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </motion.div>
      </CardContent>
    </Card>
  )
}
