'use client'

import {motion} from 'framer-motion'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Progress} from '@/components/ui/progress'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {HelpCircle} from 'lucide-react'
import type {ConvictionScores} from '@/types/form'

interface Props {
  scores: ConvictionScores
}

interface ScoreConfig {
  key: keyof ConvictionScores
  label: string
  description: string
  color: string
  icon: string
}

const SCORE_CONFIGS: ScoreConfig[] = [
  {
    key: 'valueAlignment',
    label: 'Value Alignment',
    description: 'How closely your answers align with progressive immigration values',
    color: 'from-purple-500 to-pink-500',
    icon: '💎',
  },
  {
    key: 'dataAwareness',
    label: 'Data Awareness',
    description: 'How deeply you explored the data layers and evidence',
    color: 'from-blue-500 to-cyan-500',
    icon: '📊',
  },
  {
    key: 'persuasionLevel',
    label: 'Persuasion Level',
    description: 'How persuaded you are by the evidence presented',
    color: 'from-green-500 to-emerald-500',
    icon: '✨',
  },
  {
    key: 'engagementDepth',
    label: 'Engagement Depth',
    description: 'How thoughtfully you engaged with the questions',
    color: 'from-orange-500 to-red-500',
    icon: '🎯',
  },
]

// Get color based on score level
function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600 dark:text-green-400'
  if (score >= 60) return 'text-blue-600 dark:text-blue-400'
  if (score >= 40) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-gray-600 dark:text-gray-400'
}

// Get border color based on score level
function getScoreBorder(score: number): string {
  if (score >= 80) return 'border-green-500/50'
  if (score >= 60) return 'border-blue-500/50'
  if (score >= 40) return 'border-yellow-500/50'
  return 'border-gray-500/50'
}

export default function ConvictionScoreDisplay({scores}: Props) {
  // Calculate overall conviction percentage
  const overallConviction = Math.round(
    (scores.valueAlignment +
      scores.dataAwareness +
      scores.persuasionLevel +
      scores.engagementDepth) /
      4
  )

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: {opacity: 0, scale: 0.8},
    visible: {opacity: 1, scale: 1},
  }

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 border-b">
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl">Your Conviction Profile</span>
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Overall Score
            </div>
            <div className={`text-4xl font-bold ${getScoreColor(overallConviction)}`}>
              {overallConviction}%
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <TooltipProvider>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {SCORE_CONFIGS.map((config) => {
              const score = scores[config.key]
              return (
                <motion.div
                  key={config.key}
                  variants={itemVariants}
                  className={`p-4 rounded-lg border-2 ${getScoreBorder(score)} bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{config.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {config.label}
                        </h3>
                        <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                          {score}%
                        </div>
                      </div>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                          <HelpCircle className="w-5 h-5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{config.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Circular Progress Visualization */}
                  <div className="relative w-full">
                    <Progress value={score} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>0</span>
                      <span>100</span>
                    </div>
                  </div>

                  {/* Visual gauge representation */}
                  <div className="mt-4 relative h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{width: 0}}
                      animate={{width: `${score}%`}}
                      transition={{duration: 1, delay: 0.5, ease: 'easeOut'}}
                      className={`h-full bg-gradient-to-r ${config.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </TooltipProvider>

        {/* Overall conviction message */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.8}}
          className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
        >
          <p className="text-center text-gray-700 dark:text-gray-300">
            {overallConviction >= 80 && (
              <>
                <span className="font-bold">Exceptional conviction!</span> You've
                deeply engaged with the data and formed strong perspectives.
              </>
            )}
            {overallConviction >= 60 && overallConviction < 80 && (
              <>
                <span className="font-bold">Strong engagement!</span> You've explored
                the evidence and are building informed convictions.
              </>
            )}
            {overallConviction >= 40 && overallConviction < 60 && (
              <>
                <span className="font-bold">Good start!</span> You're engaging with
                the data and forming your perspective.
              </>
            )}
            {overallConviction < 40 && (
              <>
                <span className="font-bold">Thanks for exploring!</span> Every
                journey starts with curiosity.
              </>
            )}
          </p>
        </motion.div>
      </CardContent>
    </Card>
  )
}
