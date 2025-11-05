'use client'

import {useState, useEffect} from 'react'
import {motion, useInView} from 'framer-motion'
import {useRef} from 'react'
import type {Theme} from '@/types/form'
import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {TrendingUp, DollarSign, Users, AlertTriangle, FileText, ArrowRight} from 'lucide-react'

interface DataPoint {
  id: string
  icon: typeof TrendingUp
  stat: string
  label: string
  explanation: string
  themedExplanation: Record<Theme, string>
  source: string
}

const DATA_POINTS: DataPoint[] = [
  {
    id: 'wage-theft-scale',
    icon: DollarSign,
    stat: '$50B',
    label: 'Stolen from workers annually',
    explanation: 'Wage theft exceeds all other property crimes combined in the United States.',
    themedExplanation: {
      'far-left': 'This massive theft from working families represents the worst kind of corporate greed - systematic exploitation of labor.',
      'mid-left': 'This undermines fair competition and hurts businesses that play by the rules.',
      'mid-right': 'Law-abiding businesses are undercut by companies that cheat workers and the system.',
      'far-right': 'This theft from hardworking Americans is an assault on those who built this country.',
    },
    source: 'Economic Policy Institute, 2023',
  },
  {
    id: 'affected-workers',
    icon: Users,
    stat: '2.4M',
    label: 'Workers affected annually',
    explanation: 'Millions of American workers lose wages they have earned through illegal employer practices.',
    themedExplanation: {
      'far-left': 'These are real families struggling to survive while corporations pocket their wages.',
      'mid-left': 'Communities suffer when workers can\'t afford to support local businesses.',
      'mid-right': 'Hard-working Americans are being cheated out of money they rightfully earned.',
      'far-right': 'American workers deserve every dollar they earn - this is theft, plain and simple.',
    },
    source: 'U.S. Department of Labor, 2023',
  },
  {
    id: 'recovery-rate',
    icon: AlertTriangle,
    stat: '15%',
    label: 'Of stolen wages recovered',
    explanation: 'Current enforcement is weak, and most victims never get their money back.',
    themedExplanation: {
      'far-left': 'The system is rigged to protect corporate criminals while workers have no recourse.',
      'mid-left': 'Weak enforcement fails workers and creates an unfair business environment.',
      'mid-right': 'Without real consequences, lawbreakers continue to cheat honest workers.',
      'far-right': 'Criminals are getting away with theft because the government won\'t enforce the law.',
    },
    source: 'National Employment Law Project, 2022',
  },
  {
    id: 'average-loss',
    icon: TrendingUp,
    stat: '$3,300',
    label: 'Average loss per victim',
    explanation: 'For many families, this represents a month or more of rent, groceries, or bills.',
    themedExplanation: {
      'far-left': 'Working families are being driven into poverty by wage theft while CEOs get richer.',
      'mid-left': 'These losses ripple through communities, hurting everyone.',
      'mid-right': 'This is money families earned and need to pay their bills and support themselves.',
      'far-right': 'Hard-earned money stolen from American workers who played by the rules.',
    },
    source: 'Center for American Progress, 2023',
  },
  {
    id: 'industries',
    icon: FileText,
    stat: '15+',
    label: 'Industries with widespread theft',
    explanation: 'From construction to hospitality, healthcare to retail - wage theft is everywhere.',
    themedExplanation: {
      'far-left': 'Corporate exploitation has infected every sector of our economy.',
      'mid-left': 'This is a systemic problem requiring a comprehensive solution.',
      'mid-right': 'No industry is immune - workers everywhere need protection.',
      'far-right': 'American workers across all sectors are under attack from dishonest employers.',
    },
    source: 'Bureau of Labor Statistics, 2023',
  },
]

interface Props {
  theme: Theme
  onComplete: () => void
}

function CountUpAnimation({value, suffix = ''}: {value: string; suffix?: string}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true})

  useEffect(() => {
    if (!isInView) return

    // Extract numeric value
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
    const duration = 2000
    const steps = 60
    const increment = numericValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  const formatValue = (val: number) => {
    if (value.includes('B')) return `$${val.toFixed(0)}B`
    if (value.includes('M')) return `${val.toFixed(1)}M`
    if (value.includes('%')) return `${val.toFixed(0)}%`
    if (value.includes('+')) return `${val.toFixed(0)}+`
    if (value.includes('$')) return `$${val.toFixed(0).toLocaleString()}`
    return val.toFixed(0)
  }

  return (
    <span ref={ref} className="text-5xl md:text-7xl font-bold text-purple-600 dark:text-purple-400">
      {isInView ? formatValue(count) : '0'}
      {suffix}
    </span>
  )
}

function DataPointCard({dataPoint, theme, index}: {dataPoint: DataPoint; theme: Theme; index: number}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true, margin: '-100px'})
  const Icon = dataPoint.icon

  return (
    <motion.div
      ref={ref}
      initial={{opacity: 0, y: 50}}
      animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 50}}
      transition={{duration: 0.6, delay: index * 0.1}}
    >
      <Card className="shadow-xl hover:shadow-2xl transition-shadow">
        <CardContent className="p-8 md:p-10">
          <div className="flex items-start gap-6 mb-6">
            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full">
              <Icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="mb-2">
                <CountUpAnimation value={dataPoint.stat} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                {dataPoint.label}
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {dataPoint.explanation}
            </p>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-lg border-l-4 border-purple-500">
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {dataPoint.themedExplanation[theme]}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <FileText className="w-4 h-4" />
              <span>Source: {dataPoint.source}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function DataRealityLayer({theme, onComplete}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const allViewed = currentIndex >= DATA_POINTS.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Did You Know?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Before we talk about solutions, let's look at the reality of wage theft in America.
        </p>
      </motion.div>

      {/* Data Points */}
      <div className="space-y-8 mb-12">
        {DATA_POINTS.map((dataPoint, index) => (
          <div
            key={dataPoint.id}
            onMouseEnter={() => {
              if (index > currentIndex) {
                setCurrentIndex(index)
              }
            }}
          >
            <DataPointCard dataPoint={dataPoint} theme={theme} index={index} />
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
          className="px-12 py-6 text-xl font-bold shadow-2xl"
        >
          Continue to Solution
          <ArrowRight className="ml-2 w-6 h-6" />
        </Button>
      </motion.div>
    </div>
  )
}
