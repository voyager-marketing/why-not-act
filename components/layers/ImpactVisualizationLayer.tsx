'use client'

import {useState, useRef} from 'react'
import {motion, useInView} from 'framer-motion'
import type {Theme} from '@/types/form'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Shield, TrendingUp, Users, HeartPulse, Building2, ArrowRight, CheckCircle2, AlertCircle, HelpCircle} from 'lucide-react'
import {useJourneyStore} from '@/lib/journeyStore'
import {useTheme} from '@/hooks/useTheme'

interface ImpactCategory {
  id: string
  icon: typeof TrendingUp
  title: string
  before: {
    label: string
    value: string
    color: string
  }
  after: {
    label: string
    value: string
    color: string
  }
  description: string
}

const IMPACT_CATEGORIES: ImpactCategory[] = [
  {
    id: 'border-security',
    icon: Shield,
    title: 'Border Security Funding',
    before: {
      label: 'Current Border Budget',
      value: 'Limited',
      color: 'text-orange-600',
    },
    after: {
      label: 'With $330B in Fines',
      value: 'Fully Funded',
      color: 'text-green-600',
    },
    description: '$330 billion in fines would fully fund border wall completion, hire 10,000+ new Border Patrol agents, and deploy advanced surveillance technology.',
  },
  {
    id: 'tax-revenue',
    icon: TrendingUp,
    title: 'Increased Tax Revenue',
    before: {
      label: 'Underground Economy',
      value: '$0/year',
      color: 'text-red-600',
    },
    after: {
      label: 'New Federal Revenue',
      value: '$80B+',
      color: 'text-green-600',
    },
    description: 'Legalizing 11 million workers would increase federal tax revenue by $80+ billion over 10 years.',
  },
  {
    id: 'population-stability',
    icon: Users,
    title: 'Population Stabilization',
    before: {
      label: 'Undocumented Population',
      value: '11M+',
      color: 'text-red-600',
    },
    after: {
      label: 'Projected by 2033',
      value: 'Declining',
      color: 'text-green-600',
    },
    description: 'By offering a one-time pathway with strict requirements, the undocumented population would stabilize and decline naturally by 2033.',
  },
  {
    id: 'community-safety',
    icon: Building2,
    title: 'Community Safety',
    before: {
      label: 'Crime Reporting',
      value: 'Suppressed',
      color: 'text-red-600',
    },
    after: {
      label: 'Community Trust',
      value: 'Enhanced',
      color: 'text-green-600',
    },
    description: 'ICE focuses exclusively on criminals. Families can report crimes without fear, making communities safer for everyone.',
  },
  {
    id: 'healthcare-savings',
    icon: HeartPulse,
    title: 'Healthcare Savings',
    before: {
      label: 'Annual ER Costs',
      value: '$18B',
      color: 'text-red-600',
    },
    after: {
      label: 'Regular Healthcare',
      value: 'Reduced',
      color: 'text-green-600',
    },
    description: 'Undocumented immigrants currently cost emergency rooms $18 billion annually. Legal status means they can get regular healthcare and reduce ER overuse.',
  },
]

interface Props {
  theme: Theme
  onComplete: () => void
}

interface ImpactResponse {
  impactId: string
  response: 'yes' | 'maybe' | 'no'
  timestamp: Date
}

function ImpactCard({
  category,
  index,
  onResponse,
  hasResponded,
}: {
  category: ImpactCategory
  index: number
  onResponse: (response: 'yes' | 'maybe' | 'no') => void
  hasResponded: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true, margin: '-100px'})
  const [showCTA, setShowCTA] = useState(false)
  const [selectedResponse, setSelectedResponse] = useState<'yes' | 'maybe' | 'no' | null>(null)
  const Icon = category.icon
  const {themeConfig} = useTheme()

  const handleResponse = (response: 'yes' | 'maybe' | 'no') => {
    setSelectedResponse(response)
    onResponse(response)
  }

  return (
    <motion.div
      ref={ref}
      initial={{opacity: 0, y: 50}}
      animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 50}}
      transition={{duration: 0.6, delay: index * 0.15}}
      onViewportEnter={() => setShowCTA(true)}
    >
      <Card className="shadow-xl hover:shadow-2xl transition-shadow overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-2xl">{category.title}</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {/* Before/After Comparison */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {category.before.label}
              </div>
              <motion.div
                initial={{scale: 0}}
                animate={isInView ? {scale: 1} : {scale: 0}}
                transition={{delay: 0.3, type: 'spring'}}
                className={`text-4xl font-bold ${category.before.color} mb-2`}
              >
                {category.before.value}
              </motion.div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">Before</div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {category.after.label}
              </div>
              <motion.div
                initial={{scale: 0}}
                animate={isInView ? {scale: 1} : {scale: 0}}
                transition={{delay: 0.5, type: 'spring'}}
                className={`text-4xl font-bold ${category.after.color} mb-2`}
              >
                {category.after.value}
              </motion.div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">After</div>
            </div>
          </div>

          {/* Visual Arrow */}
          <motion.div
            initial={{opacity: 0, x: -20}}
            animate={isInView ? {opacity: 1, x: 0} : {opacity: 0, x: -20}}
            transition={{delay: 0.7}}
            className="flex items-center justify-center mb-6"
          >
            <ArrowRight className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </motion.div>

          {/* Description */}
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center leading-relaxed">
            {category.description}
          </p>

          {/* Micro CTAs */}
          {showCTA && (
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.9}}
              className="space-y-3"
            >
              <div className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                Do you support this outcome?
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Yes Option */}
                <Button
                  onClick={() => handleResponse('yes')}
                  disabled={hasResponded}
                  variant={selectedResponse === 'yes' ? 'default' : 'outline'}
                  className={`flex items-center justify-center gap-2 py-6 transition-all ${
                    selectedResponse === 'yes'
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg scale-105'
                      : 'hover:bg-green-50 hover:border-green-300 dark:hover:bg-green-900/20'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Yes, I support this</span>
                </Button>

                {/* Maybe Option */}
                <Button
                  onClick={() => handleResponse('maybe')}
                  disabled={hasResponded}
                  variant={selectedResponse === 'maybe' ? 'default' : 'outline'}
                  className={`flex items-center justify-center gap-2 py-6 transition-all ${
                    selectedResponse === 'maybe'
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg scale-105'
                      : 'hover:bg-yellow-50 hover:border-yellow-300 dark:hover:bg-yellow-900/20'
                  }`}
                >
                  <HelpCircle className="w-5 h-5" />
                  <span className="font-medium">Maybe, need to think</span>
                </Button>

                {/* No Option */}
                <Button
                  onClick={() => handleResponse('no')}
                  disabled={hasResponded}
                  variant={selectedResponse === 'no' ? 'default' : 'outline'}
                  className={`flex items-center justify-center gap-2 py-6 transition-all ${
                    selectedResponse === 'no'
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg scale-105'
                      : 'hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-900/20'
                  }`}
                >
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">No, I don't support this</span>
                </Button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ImpactVisualizationLayer({theme, onComplete}: Props) {
  const [responses, setResponses] = useState<ImpactResponse[]>([])
  const {markDataPointViewed, recordResponse} = useJourneyStore()
  const {themeConfig} = useTheme()

  const allResponded = responses.length >= IMPACT_CATEGORIES.length

  const handleResponse = (impactId: string, response: 'yes' | 'maybe' | 'no', index: number) => {
    // Store in local state
    const newResponse: ImpactResponse = {
      impactId,
      response,
      timestamp: new Date(),
    }
    setResponses((prev) => [...prev, newResponse])

    // Store in journey store
    markDataPointViewed(impactId)

    // Record as a response with persuasion weight
    // Yes = high persuasion, Maybe = medium, No = low but still engagement
    const persuasionWeightMap = {yes: 1.0, maybe: 0.5, no: 0.2}
    const timeSpent = 30 // Estimated time spent viewing impact

    recordResponse(impactId, response, timeSpent, persuasionWeightMap[response])
  }

  // Calculate persuasion score
  const persuasionScore = responses.reduce((total, r) => {
    if (r.response === 'yes') return total + 20
    if (r.response === 'maybe') return total + 10
    return total + 0
  }, 0)

  const hasResponded = (impactId: string) => responses.some((r) => r.impactId === impactId)

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Immigration Reform: Real-World Impact
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          See how comprehensive immigration reform creates measurable outcomes across border security, economy, and community safety.
        </p>
      </motion.div>

      {/* Impact Categories */}
      <div className="space-y-8 mb-12">
        {IMPACT_CATEGORIES.map((category, index) => (
          <div key={category.id}>
            <ImpactCard
              category={category}
              index={index}
              onResponse={(response) => handleResponse(category.id, response, index)}
              hasResponded={hasResponded(category.id)}
            />
          </div>
        ))}
      </div>

      {/* Persuasion Score Summary */}
      {allResponded && (
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 border-2 border-blue-200 dark:border-blue-700">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Your Support Level
              </h3>
              <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                {persuasionScore}%
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {persuasionScore >= 80
                  ? 'You strongly support these immigration reform outcomes!'
                  : persuasionScore >= 50
                  ? 'You see value in many of these reform outcomes.'
                  : persuasionScore >= 30
                  ? 'You have some reservations but are open to discussion.'
                  : 'You have significant concerns about these outcomes.'}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Continue Button */}
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: allResponded ? 1 : 0.5}}
        className="flex justify-center sticky bottom-8"
      >
        <Button
          onClick={onComplete}
          size="lg"
          disabled={!allResponded}
          className="px-12 py-6 text-xl font-bold shadow-2xl"
        >
          Continue Your Journey
          <ArrowRight className="ml-2 w-6 h-6" />
        </Button>
      </motion.div>
    </div>
  )
}
