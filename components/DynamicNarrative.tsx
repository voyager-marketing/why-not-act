'use client'

import {motion} from 'framer-motion'
import {Card, CardContent} from '@/components/ui/card'
import {Quote} from 'lucide-react'
import type {UserJourney} from '@/types/form'
import {generateNarrative} from '@/lib/narrativeGenerator'
import {useMemo} from 'react'

interface Props {
  journey: UserJourney
}

// Get narrative style based on persuasion level
function getNarrativeStyle(score: number) {
  if (score >= 10) {
    return {
      bgGradient: 'from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30',
      borderColor: 'border-purple-300 dark:border-purple-700',
      textAccent: 'text-purple-900 dark:text-purple-100',
      icon: '🔥',
    }
  }
  if (score >= 7) {
    return {
      bgGradient: 'from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30',
      borderColor: 'border-blue-300 dark:border-blue-700',
      textAccent: 'text-blue-900 dark:text-blue-100',
      icon: '✨',
    }
  }
  if (score >= 4) {
    return {
      bgGradient: 'from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30',
      borderColor: 'border-green-300 dark:border-green-700',
      textAccent: 'text-green-900 dark:text-green-100',
      icon: '💡',
    }
  }
  return {
    bgGradient: 'from-gray-100 to-slate-100 dark:from-gray-800/30 dark:to-slate-800/30',
    borderColor: 'border-gray-300 dark:border-gray-700',
    textAccent: 'text-gray-900 dark:text-gray-100',
    icon: '🤔',
  }
}

export default function DynamicNarrative({journey}: Props) {
  // Generate narrative - memoized to avoid regenerating on every render
  const narrative = useMemo(() => generateNarrative(journey), [journey])
  const style = getNarrativeStyle(journey.score)

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.6}}
    >
      <Card
        className={`overflow-hidden shadow-lg border-2 ${style.borderColor} bg-gradient-to-br ${style.bgGradient}`}
      >
        <CardContent className="p-8">
          {/* Quote icon */}
          <motion.div
            initial={{scale: 0, rotate: -180}}
            animate={{scale: 1, rotate: 0}}
            transition={{type: 'spring', duration: 0.8}}
            className="mb-4"
          >
            <div className="flex items-center gap-3">
              <Quote className={`w-8 h-8 ${style.textAccent}`} />
              <span className="text-3xl">{style.icon}</span>
            </div>
          </motion.div>

          {/* Narrative text with typing effect simulation */}
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.3, duration: 0.8}}
          >
            <p
              className={`text-lg leading-relaxed ${style.textAccent} font-medium`}
              style={{textShadow: '0 1px 2px rgba(0,0,0,0.05)'}}
            >
              {narrative}
            </p>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            transition={{delay: 0.6}}
            className="mt-6 flex justify-end"
          >
            <div className={`text-sm ${style.textAccent} opacity-60 italic`}>
              — Your personalized perspective
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Emotional resonance indicator */}
      <motion.div
        initial={{opacity: 0, y: 10}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.8}}
        className="mt-4 text-center"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {journey.score >= 10 && (
            <>This message is crafted to ignite your passion for action.</>
          )}
          {journey.score >= 7 && journey.score < 10 && (
            <>This message reflects your growing conviction and readiness to act.</>
          )}
          {journey.score >= 4 && journey.score < 7 && (
            <>This message meets you where you are in your journey of discovery.</>
          )}
          {journey.score < 4 && (
            <>This message honors your curiosity and openness to explore.</>
          )}
        </p>
      </motion.div>
    </motion.div>
  )
}
