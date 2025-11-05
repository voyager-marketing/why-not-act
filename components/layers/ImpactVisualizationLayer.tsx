'use client'

import {useState, useRef} from 'react'
import {motion, useInView} from 'framer-motion'
import type {Theme} from '@/types/form'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {TrendingUp, DollarSign, Users, Building2, Heart, ArrowRight, CheckCircle2} from 'lucide-react'

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
  microCTA: string
}

const IMPACT_CATEGORIES: ImpactCategory[] = [
  {
    id: 'worker-protection',
    icon: Users,
    title: 'Worker Protection',
    before: {
      label: 'Current Recovery Rate',
      value: '15%',
      color: 'text-red-600',
    },
    after: {
      label: 'With $30K Fine',
      value: '85%',
      color: 'text-green-600',
    },
    description: 'Strong penalties mean workers actually get their stolen wages back.',
    microCTA: 'Workers deserve to be paid',
  },
  {
    id: 'business-fairness',
    icon: Building2,
    title: 'Fair Competition',
    before: {
      label: 'Honest Businesses Undercut',
      value: 'Daily',
      color: 'text-red-600',
    },
    after: {
      label: 'Level Playing Field',
      value: 'Protected',
      color: 'text-green-600',
    },
    description: 'Companies that follow the law won\'t be undercut by wage thieves.',
    microCTA: 'Reward honest businesses',
  },
  {
    id: 'deterrence',
    icon: TrendingUp,
    title: 'Crime Deterrence',
    before: {
      label: 'Violations Per Year',
      value: '2.4M',
      color: 'text-red-600',
    },
    after: {
      label: 'Projected Reduction',
      value: '75%',
      color: 'text-green-600',
    },
    description: 'Real consequences mean fewer employers will risk stealing wages.',
    microCTA: 'Stop wage theft before it starts',
  },
  {
    id: 'economic-impact',
    icon: DollarSign,
    title: 'Economic Recovery',
    before: {
      label: 'Lost Annually',
      value: '$50B',
      color: 'text-red-600',
    },
    after: {
      label: 'Returned to Workers',
      value: '$40B+',
      color: 'text-green-600',
    },
    description: 'Money goes back into communities instead of into corporate profits.',
    microCTA: 'Strengthen local economies',
  },
  {
    id: 'family-stability',
    icon: Heart,
    title: 'Family Stability',
    before: {
      label: 'Families in Crisis',
      value: 'Millions',
      color: 'text-red-600',
    },
    after: {
      label: 'Protected Families',
      value: 'Secured',
      color: 'text-green-600',
    },
    description: 'Families can count on the wages they earned to pay rent and buy food.',
    microCTA: 'Protect working families',
  },
]

interface Props {
  theme: Theme
  onComplete: () => void
}

function ImpactCard({category, index}: {category: ImpactCategory; index: number}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true, margin: '-100px'})
  const [showCTA, setShowCTA] = useState(false)
  const Icon = category.icon

  return (
    <motion.div
      ref={ref}
      initial={{opacity: 0, y: 50}}
      animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 50}}
      transition={{duration: 0.6, delay: index * 0.15}}
      onViewportEnter={() => setShowCTA(true)}
    >
      <Card className="shadow-xl hover:shadow-2xl transition-shadow overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
              <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
            <ArrowRight className="w-12 h-12 text-purple-600 dark:text-purple-400" />
          </motion.div>

          {/* Description */}
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
            {category.description}
          </p>

          {/* Micro CTA */}
          {showCTA && (
            <motion.div
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.9}}
              className="flex items-center justify-center gap-2 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border-2 border-purple-200 dark:border-purple-700"
            >
              <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="font-medium text-purple-900 dark:text-purple-100">
                {category.microCTA}
              </span>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ImpactVisualizationLayer({theme, onComplete}: Props) {
  const [viewedCount, setViewedCount] = useState(0)
  const allViewed = viewedCount >= IMPACT_CATEGORIES.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          The Real-World Impact
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          See how a $30,000 fine changes everything for workers, businesses, and communities.
        </p>
      </motion.div>

      {/* Impact Categories */}
      <div className="space-y-8 mb-12">
        {IMPACT_CATEGORIES.map((category, index) => (
          <div
            key={category.id}
            onMouseEnter={() => {
              if (index >= viewedCount) {
                setViewedCount(index + 1)
              }
            }}
          >
            <ImpactCard category={category} index={index} />
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: allViewed ? 1 : 0.5}}
        className="flex justify-center sticky bottom-8"
      >
        <Button
          onClick={onComplete}
          size="lg"
          disabled={!allViewed}
          className="px-12 py-6 text-xl font-bold shadow-2xl"
        >
          Continue Your Journey
          <ArrowRight className="ml-2 w-6 h-6" />
        </Button>
      </motion.div>
    </div>
  )
}
