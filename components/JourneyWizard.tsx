'use client'

import {useState, useMemo, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {motion, AnimatePresence} from 'framer-motion'
import type {Theme, Answer} from '@/types/form'
import {useFormStore} from '@/lib/formStore'
import {useJourneyStore} from '@/lib/journeyStore'
import {Progress} from '@/components/ui/progress'
import {Badge} from '@/components/ui/badge'
import {Card} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {ChevronLeft, Home, Layers} from 'lucide-react'
import LayerRenderer, {type LayerType} from './layers/LayerRenderer'

const LAYERS: LayerType[] = [
  'value-alignment',
  'data-reality',
  'solution-introduction',
  'impact-visualization',
  'reflection-persuasion',
  'call-to-action',
]

const LAYER_NAMES: Record<LayerType, string> = {
  'value-alignment': 'Values',
  'data-reality': 'Reality',
  'solution-introduction': 'Solution',
  'impact-visualization': 'Impact',
  'reflection-persuasion': 'Reflection',
  'call-to-action': 'Action',
}

interface Props {
  theme: Theme
}

export default function JourneyWizard({theme}: Props) {
  const [currentLayerIndex, setCurrentLayerIndex] = useState(0)
  const [layerAnswers, setLayerAnswers] = useState<Record<string, Answer>>({})
  const [completedLayers, setCompletedLayers] = useState<Set<number>>(new Set())
  const router = useRouter()
  const {setAnswer} = useFormStore()
  const {setLens} = useJourneyStore()

  const currentLayer = LAYERS[currentLayerIndex]
  const progress = ((currentLayerIndex + 1) / LAYERS.length) * 100

  // Initialize journey store with political lens
  useEffect(() => {
    setLens(theme as any) // Cast to match PoliticalLens type
  }, [theme, setLens])

  // Calculate persuasion score based on all answers
  const persuasionScore = useMemo(() => {
    const answers = Object.values(layerAnswers)
    if (answers.length === 0) return 0

    const yesCount = answers.filter((a) => a === 'yes').length
    const maybeCount = answers.filter((a) => a === 'maybe').length
    const totalAnswers = answers.length

    // Weighted score: yes = 100%, maybe = 50%, no = 0%
    const score = ((yesCount * 100 + maybeCount * 50) / totalAnswers)
    return Math.round(score)
  }, [layerAnswers])

  const handleAnswer = (answer: Answer) => {
    const answerId = `layer-${currentLayerIndex}-${Object.keys(layerAnswers).length}`
    setLayerAnswers((prev) => ({...prev, [answerId]: answer}))
    setAnswer(currentLayerIndex, answer)
  }

  const handleLayerComplete = () => {
    setCompletedLayers((prev) => new Set(prev).add(currentLayerIndex))

    if (currentLayerIndex < LAYERS.length - 1) {
      setCurrentLayerIndex(currentLayerIndex + 1)
    }
  }

  const handleBack = () => {
    if (currentLayerIndex > 0) {
      setCurrentLayerIndex(currentLayerIndex - 1)
    }
  }

  const handleStartOver = () => {
    router.push('/')
  }

  const themeColors: Record<Theme, string> = {
    'far-left': 'from-blue-600 to-blue-700',
    'mid-left': 'from-blue-400 to-blue-500',
    'mid-right': 'from-red-400 to-red-500',
    'far-right': 'from-red-600 to-red-700',
  }

  const themeGradient = themeColors[theme] || 'from-purple-600 to-blue-600'

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900" />

      {/* Animated Background Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 max-w-6xl min-h-screen">
        {/* Header */}
        <motion.div
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          className="mb-8"
        >
          {/* Navigation */}
          <div className="flex items-center justify-between mb-4">
            {currentLayerIndex === 0 ? (
              <Button
                onClick={handleStartOver}
                variant="ghost"
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Start Over
              </Button>
            ) : (
              <Button
                onClick={handleBack}
                variant="ghost"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            <Badge variant="secondary" className="capitalize">
              {theme.replace('-', ' ')}
            </Badge>
          </div>

          {/* Progress Bar */}
          <Card className="p-6 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Layer {currentLayerIndex + 1} of {LAYERS.length}:{' '}
                  {LAYER_NAMES[currentLayer]}
                </span>
              </div>
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-3" />

            {/* Layer Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {LAYERS.map((layer, idx) => (
                <motion.div
                  key={layer}
                  initial={{opacity: 0, scale: 0.8}}
                  animate={{opacity: 1, scale: 1}}
                  transition={{delay: idx * 0.05}}
                >
                  <Badge
                    variant={
                      idx === currentLayerIndex
                        ? 'default'
                        : completedLayers.has(idx)
                          ? 'secondary'
                          : 'outline'
                    }
                    className={`
                      ${idx === currentLayerIndex ? 'bg-purple-600 text-white' : ''}
                      ${completedLayers.has(idx) ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : ''}
                    `}
                  >
                    {LAYER_NAMES[layer]}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Layer Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLayer}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
          >
            <LayerRenderer
              currentLayer={currentLayer}
              theme={theme}
              onAnswer={handleAnswer}
              onLayerComplete={handleLayerComplete}
              answers={layerAnswers}
              persuasionScore={persuasionScore}
            />
          </motion.div>
        </AnimatePresence>

        {/* Persuasion Score Indicator (for debugging/transparency) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border">
            <div className="text-xs text-gray-500 mb-1">Persuasion Score</div>
            <div className="text-2xl font-bold text-purple-600">{persuasionScore}%</div>
            <div className="text-xs text-gray-400 mt-1">
              {Object.keys(layerAnswers).length} answers
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
