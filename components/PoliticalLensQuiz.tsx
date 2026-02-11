'use client'

import {useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {useRouter} from 'next/navigation'
import {usePostHog} from 'posthog-js/react'
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
}

export function PoliticalLensQuiz() {
  const router = useRouter()
  const posthog = usePostHog()
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
    },
    {
      id: 'center-right',
      label: 'Balanced Approach',
      statement: 'We need fair enforcement and practical solutions.',
      description: 'Combine rule of law with compassionate reform',
      icon: Scale,
    },
    {
      id: 'center-left',
      label: 'Opportunity Focus',
      statement: 'Immigration makes America stronger.',
      description: 'Recognize economic and cultural benefits',
      icon: Heart,
    },
    {
      id: 'far-left',
      label: 'Inclusive Vision',
      statement: 'Everyone deserves a path to citizenship.',
      description: 'Prioritize human rights and dignity',
      icon: Globe,
    },
  ]

  const handleLensSelect = async (lens: Theme) => {
    setSelectedLens(lens)
    setTheme(lens)
    setIsTransitioning(true)

    posthog.capture('ideology_selected', {
      political_lens: lens,
    })
    posthog.setPersonProperties({political_lens: lens})

    await new Promise((resolve) => setTimeout(resolve, 600))

    router.push(`/journey/${lens}`)
  }

  return (
    <section className="relative px-4 w-full -mt-8">
      <div className="mx-auto max-w-5xl w-full">
        <p className="text-center text-sm text-stone-500 dark:text-stone-400 mb-6 mt-12">
          There are no wrong answers. This helps us personalize your experience.
        </p>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {options.map((option, index) => {
            const Icon = option.icon
            const isSelected = selectedLens === option.id

            return (
              <motion.div
                key={option.id}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3, delay: 0.1 + index * 0.08}}
              >
                <Card
                  onClick={() => !isTransitioning && handleLensSelect(option.id)}
                  className={`
                    relative cursor-pointer p-6 border-l-4 border transition-all duration-200
                    ${isSelected ? 'border-l-rose-700 ring-2 ring-slate-700 border-slate-700 bg-slate-50 dark:ring-slate-400 dark:border-slate-400 dark:border-l-rose-500 dark:bg-slate-800' : 'border-l-slate-700 border-stone-200 dark:border-stone-700 dark:border-l-slate-500 bg-white dark:bg-stone-900 hover:border-stone-300 hover:shadow-md'}
                    ${isTransitioning && !isSelected ? 'opacity-40' : ''}
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
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="absolute top-4 right-4 w-7 h-7 bg-rose-700 dark:bg-rose-600 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Icon */}
                  <div className="mb-4">
                    <div className="inline-flex p-2.5 rounded-lg bg-slate-800 text-white dark:bg-slate-700">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-stone-100 mb-1.5">
                    {option.label}
                  </h3>

                  {/* Statement */}
                  <p className="text-base text-stone-700 dark:text-stone-200 mb-1.5">
                    "{option.statement}"
                  </p>

                  {/* Description */}
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    {option.description}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Helper Text */}
        {!selectedLens && (
          <motion.p
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.3, delay: 0.5}}
            className="text-center mt-8 text-sm text-stone-500 dark:text-stone-400"
          >
            Your selection helps us frame questions in a way that resonates with your values
          </motion.p>
        )}
      </div>
    </section>
  )
}
