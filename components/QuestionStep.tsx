'use client'

import type {Question, Theme, Answer, ThemedFraming} from '@/types/form'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {motion} from 'framer-motion'
import {CheckCircle2, XCircle, HelpCircle, Lightbulb} from 'lucide-react'

interface Props {
  question: Question
  theme: Theme
  onAnswer: (answer: Answer) => void
}

export default function QuestionStep({question, theme, onAnswer}: Props) {
  // Convert theme from URL format to camelCase key
  const themeKeyMap: Record<Theme, 'farLeft' | 'midLeft' | 'midRight' | 'farRight'> = {
    'far-left': 'farLeft',
    'center-left': 'midLeft',
    'center-right': 'midRight',
    'far-right': 'farRight',
  }

  const themeKey = themeKeyMap[theme]
  const themedContent = question[themeKey as keyof Question] as ThemedFraming | undefined

  // Safety check
  if (!themedContent || !themedContent.headline || !Array.isArray(themedContent.bullets) || themedContent.bullets.length === 0) {
    return (
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">{question.coreIdea || 'Question'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">
            Error: Missing or incomplete themed content for {theme}. Please update this question in Sanity Studio and make sure to add bullet points.
          </p>
        </CardContent>
      </Card>
    )
  }

  const buttonVariants = {
    initial: {scale: 1},
    hover: {scale: 1.02},
    tap: {scale: 0.98},
  }

  return (
    <Card className="shadow-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 pb-6">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
          <CardTitle className="text-2xl md:text-3xl leading-tight">
            {question.coreIdea}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6 md:p-8">
        {/* Themed Content */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {themedContent.headline}
          </h3>
          <ul className="space-y-3">
            {themedContent.bullets.map((bullet, idx) => (
              <motion.li
                key={idx}
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: idx * 0.1}}
                className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
              >
                <span className="text-purple-600 dark:text-purple-400 text-lg flex-shrink-0">•</span>
                <span className="leading-relaxed">{bullet}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Answer Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={() => onAnswer('yes')}
              variant="outline"
              size="lg"
              className="w-full h-auto py-6 flex flex-col gap-2 border-2 border-green-500 hover:bg-green-50 dark:hover:bg-green-950 hover:border-green-600 group transition-all"
            >
              <CheckCircle2 className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-bold text-green-700 dark:text-green-500">Yes</span>
            </Button>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={() => onAnswer('maybe')}
              variant="outline"
              size="lg"
              className="w-full h-auto py-6 flex flex-col gap-2 border-2 border-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-950 hover:border-yellow-600 group transition-all"
            >
              <HelpCircle className="w-8 h-8 text-yellow-600 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-bold text-yellow-700 dark:text-yellow-500">Maybe</span>
            </Button>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={() => onAnswer('no')}
              variant="outline"
              size="lg"
              className="w-full h-auto py-6 flex flex-col gap-2 border-2 border-red-500 hover:bg-red-50 dark:hover:bg-red-950 hover:border-red-600 group transition-all"
            >
              <XCircle className="w-8 h-8 text-red-600 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-bold text-red-700 dark:text-red-500">No</span>
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
