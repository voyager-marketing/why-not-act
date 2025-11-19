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
  const [selectedSystem, setSelectedSystem] = useState<'legacy' | 'layered' | null>(null)
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
      id: 'center-right',
      label: 'Balanced Approach',
      statement: 'We need fair enforcement and practical solutions.',
      description: 'Combine rule of law with compassionate reform',
      icon: Scale,
      gradient: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-200 hover:border-orange-400',
      iconColor: 'text-orange-600',
    },
    {
      id: 'center-left',
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

  const handleLensSelect = (lens: Theme) => {
    setSelectedLens(lens)
    setTheme(lens)
  }

  const handleSystemSelect = async (system: 'legacy' | 'layered') => {
    if (!selectedLens) return

    setSelectedSystem(system)
    setIsTransitioning(true)

    // Wait for animation to complete before navigating
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Route based on selected system
    if (system === 'legacy') {
      router.push(`/form/${selectedLens}`)
    } else {
      router.push(`/journey/${selectedLens}`)
    }
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
                    onClick={() => !isTransitioning && handleLensSelect(option.id)}
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
                        !isTransitioning && handleLensSelect(option.id)
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

        {/* System Selection - Shows after lens is selected */}
        <AnimatePresence>
          {selectedLens && !isTransitioning && (
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -20}}
              transition={{duration: 0.5}}
              className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Choose Your Experience
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We have two versions available for testing
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {/* Legacy System */}
                <Card
                  onClick={() => handleSystemSelect('legacy')}
                  className="cursor-pointer p-6 border-2 border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300"
                  role="button"
                  tabIndex={0}
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 mb-4">
                      <span className="text-2xl">📋</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Classic Quiz
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Simple 5-question format with immediate results
                    </p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>✓ Quick completion (2-3 min)</div>
                      <div>✓ Straightforward scoring</div>
                      <div>✓ Original experience</div>
                    </div>
                  </div>
                </Card>

                {/* New Layered System */}
                <Card
                  onClick={() => handleSystemSelect('layered')}
                  className="cursor-pointer p-6 border-2 border-purple-300 hover:border-purple-500 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-blue-50"
                  role="button"
                  tabIndex={0}
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-4">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div className="inline-block px-2 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full mb-2">
                      NEW
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      7-Layer Journey
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Deep engagement with progressive persuasion layers
                    </p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>✓ Multi-dimensional scoring</div>
                      <div>✓ Data-driven insights</div>
                      <div>✓ Personalized narrative</div>
                    </div>
                  </div>
                </Card>
              </div>

              <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
                Both experiences use your selected perspective: <span className="font-semibold capitalize">{selectedLens.replace('-', ' ')}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Helper Text */}
        {!selectedLens && (
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
        )}
      </div>
    </section>
  )
}
