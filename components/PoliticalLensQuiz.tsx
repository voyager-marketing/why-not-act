'use client'

import {useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {useRouter} from 'next/navigation'
import {useFormStore} from '@/lib/formStore'
import type {Theme} from '@/types/form'
import {Card} from '@/components/ui/card'
import {Shield, Scale, Heart, Globe, Check} from 'lucide-react'

interface LensOption {
  id: Theme
  label: string
  statement: string
  description: string
  icon: React.ElementType
  gradient: string
  borderColor: string
  iconColor: string
}

export function PoliticalLensQuiz() {
  const router = useRouter()
  const setTheme = useFormStore((state) => state.setTheme)
  const [selectedLens, setSelectedLens] = useState<Theme | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const options: LensOption[] = [
    {
      id: 'far-right',
      label: 'Security First',
      statement: 'We must secure the border first.',
      description: 'Priority on national security and border enforcement',
      icon: Shield,
      gradient: 'from-red-50 to-orange-50',
      borderColor: 'border-red-200 hover:border-red-400',
      iconColor: 'text-red-600',
    },
    {
      id: 'mid-right',
      label: 'Balanced Approach',
      statement: 'We need fair enforcement and practical solutions.',
      description: 'Combine rule of law with compassionate reform',
      icon: Scale,
      gradient: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-200 hover:border-orange-400',
      iconColor: 'text-orange-600',
    },
    {
      id: 'mid-left',
      label: 'Opportunity Focus',
      statement: 'Immigration makes America stronger.',
      description: 'Recognize economic and cultural benefits',
      icon: Heart,
      gradient: 'from-blue-50 to-sky-50',
      borderColor: 'border-blue-200 hover:border-blue-400',
      iconColor: 'text-blue-600',
    },
    {
      id: 'far-left',
      label: 'Inclusive Vision',
      statement: 'Everyone deserves a path to citizenship.',
      description: 'Prioritize human rights and dignity',
      icon: Globe,
      gradient: 'from-indigo-50 to-purple-50',
      borderColor: 'border-indigo-200 hover:border-indigo-400',
      iconColor: 'text-indigo-600',
    },
  ]

  const handleSelect = async (lens: Theme) => {
    setSelectedLens(lens)
    setIsTransitioning(true)

    // Set the theme in the store
    setTheme(lens)

    // Wait for animation to complete before navigating
    await new Promise((resolve) => setTimeout(resolve, 800))
    router.push(`/form/${lens}`)
  }

  return (
    <section className="relative py-16 px-4 w-full">
      <div className="mx-auto max-w-5xl w-full">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Let's start with your perspective
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Which statement best describes your views on immigration?
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Don't worry—there are no wrong answers. This helps us personalize your experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <AnimatePresence mode="wait">
            {options.map((option, index) => {
              const Icon = option.icon
              const isSelected = selectedLens === option.id

              return (
                <motion.div
                  key={option.id}
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.5, delay: index * 0.1}}
                  whileHover={!isTransitioning ? {scale: 1.02, y: -4} : {}}
                  whileTap={!isTransitioning ? {scale: 0.98} : {}}
                >
                  <Card
                    onClick={() => !isTransitioning && handleSelect(option.id)}
                    className={`
                      relative cursor-pointer p-6 border-2 transition-all duration-300
                      ${isSelected ? 'ring-4 ring-purple-500/50 border-purple-500' : option.borderColor}
                      ${isTransitioning && !isSelected ? 'opacity-50' : ''}
                      bg-gradient-to-br ${option.gradient}
                      hover:shadow-xl
                    `}
                    role="button"
                    aria-label={`Select ${option.label}: ${option.statement}`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        !isTransitioning && handleSelect(option.id)
                      }
                    }}
                  >
                    {/* Selection Indicator */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{scale: 0, opacity: 0}}
                          animate={{scale: 1, opacity: 1}}
                          exit={{scale: 0, opacity: 0}}
                          className="absolute top-4 right-4 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center"
                        >
                          <Check className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Icon */}
                    <div className="mb-4">
                      <div className={`inline-flex p-3 rounded-xl bg-white/80 ${option.iconColor}`}>
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                    </div>

                    {/* Label */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {option.label}
                    </h3>

                    {/* Statement */}
                    <p className="text-base font-medium text-gray-800 dark:text-gray-200 mb-2">
                      "{option.statement}"
                    </p>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {option.description}
                    </p>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Helper Text */}
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.6, delay: 0.5}}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your selection helps us frame questions in a way that resonates with your values
          </p>
        </motion.div>
      </div>
    </section>
  )
}
