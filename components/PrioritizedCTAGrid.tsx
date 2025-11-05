'use client'

import {motion} from 'framer-motion'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {
  ExternalLink,
  Share2,
  FileText,
  DollarSign,
  Phone,
  TrendingUp,
} from 'lucide-react'
import type {UserJourney} from '@/types/form'
import {prioritizeCTAs, type CTAPriority} from '@/lib/narrativeGenerator'
import {useMemo} from 'react'

interface Props {
  journey: UserJourney
  onCTAClick?: (ctaId: string, priority: number) => void
}

// CTA configuration with icons and descriptions
const CTA_CONFIG = {
  'spread-word': {
    label: 'Spread the Word',
    description: 'Share your journey and inspire others to explore the data',
    icon: Share2,
    gradient: 'from-pink-500 to-rose-500',
    hoverGradient: 'hover:from-pink-600 hover:to-rose-600',
    buttonText: 'Share Now',
  },
  petition: {
    label: 'Sign the Petition',
    description: 'Add your voice to demand evidence-based immigration reform',
    icon: FileText,
    gradient: 'from-yellow-500 to-orange-500',
    hoverGradient: 'hover:from-yellow-600 hover:to-orange-600',
    buttonText: 'Sign Petition',
  },
  donation: {
    label: 'Support the Movement',
    description: 'Fuel data-driven advocacy for humane immigration policy',
    icon: DollarSign,
    gradient: 'from-green-500 to-emerald-500',
    hoverGradient: 'hover:from-green-600 hover:to-emerald-600',
    buttonText: 'Donate',
  },
  'contact-reps': {
    label: 'Contact Your Representatives',
    description: 'Tell lawmakers what you learned and demand action',
    icon: Phone,
    gradient: 'from-blue-500 to-indigo-500',
    hoverGradient: 'hover:from-blue-600 hover:to-indigo-600',
    buttonText: 'Find Reps',
  },
}

// Get priority badge color
function getPriorityColor(priority: number): string {
  if (priority >= 80) return 'bg-red-500'
  if (priority >= 60) return 'bg-orange-500'
  if (priority >= 40) return 'bg-yellow-500'
  return 'bg-gray-500'
}

export default function PrioritizedCTAGrid({journey, onCTAClick}: Props) {
  // Calculate and sort CTAs by priority
  const prioritizedCTAs = useMemo(() => {
    const priorities = prioritizeCTAs(journey)
    return priorities.sort((a, b) => b.priority - a.priority)
  }, [journey])

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: {opacity: 0, scale: 0.9, y: 20},
    visible: {opacity: 1, scale: 1, y: 0},
  }

  const handleCTAClick = (ctaId: string, priority: number) => {
    // Track click event
    if (onCTAClick) {
      onCTAClick(ctaId, priority)
    }

    // TODO: Implement actual CTA actions
    console.log(`CTA clicked: ${ctaId} (priority: ${priority})`)

    // For now, log to analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cta_click', {
        cta_id: ctaId,
        priority: priority,
        journey_score: journey.score,
        result_type: journey.resultType,
      })
    }
  }

  return (
    <div>
      {/* Section header */}
      <motion.div
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Your Next Steps
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Based on your journey, here are the actions that will make the biggest
          impact. Each is prioritized to match your conviction level and perspective.
        </p>
      </motion.div>

      {/* CTA Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {prioritizedCTAs.map((ctaPriority, index) => {
          const cta = CTA_CONFIG[ctaPriority.ctaId as keyof typeof CTA_CONFIG]
          if (!cta) return null

          const Icon = cta.icon
          const isTopPriority = index === 0

          return (
            <motion.div
              key={ctaPriority.ctaId}
              variants={itemVariants}
              whileHover={{scale: 1.03}}
              whileTap={{scale: 0.98}}
            >
              <Card
                onClick={() => handleCTAClick(ctaPriority.ctaId, ctaPriority.priority)}
                className={`cursor-pointer overflow-hidden group hover:shadow-2xl transition-all h-full border-2 ${
                  isTopPriority ? 'border-purple-400 dark:border-purple-600' : ''
                }`}
              >
                {/* Priority indicator */}
                {isTopPriority && (
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-purple-600 text-white flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Top Priority
                    </Badge>
                  </div>
                )}

                {/* Gradient header */}
                <div
                  className={`bg-gradient-to-br ${cta.gradient} ${cta.hoverGradient} p-6 transition-all relative`}
                >
                  <CardHeader className="p-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <Icon className="w-10 h-10 text-white" />
                      <div className="flex flex-col items-end gap-1">
                        <Badge className={`${getPriorityColor(ctaPriority.priority)} text-white text-xs`}>
                          {ctaPriority.priority}% Match
                        </Badge>
                        <ExternalLink className="w-5 h-5 text-white/80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                    <CardTitle className="text-white text-2xl">
                      {cta.label}
                    </CardTitle>
                    <CardDescription className="text-white/90 text-base">
                      {cta.description}
                    </CardDescription>
                  </CardHeader>
                </div>

                {/* Card body */}
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Reasoning */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                      "{ctaPriority.reasoning}"
                    </p>

                    {/* Action button */}
                    <Button
                      variant="default"
                      size="lg"
                      className="w-full group-hover:shadow-lg transition-all"
                    >
                      {cta.buttonText}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Personalization note */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.6}}
        className="mt-8 text-center"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          These actions are prioritized based on your conviction scores, engagement
          depth, and persuasion level. The higher the match percentage, the more
          impact you're likely to make.
        </p>
      </motion.div>
    </div>
  )
}
