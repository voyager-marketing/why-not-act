'use client'

import {useState, useMemo, useEffect, useRef} from 'react'
import {useRouter} from 'next/navigation'
import {motion, AnimatePresence} from 'framer-motion'
import {usePostHog} from 'posthog-js/react'
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
  const layerStartTime = useRef(Date.now())
  const router = useRouter()
  const posthog = usePostHog()
  const {setAnswer} = useFormStore()
  const {setLens} = useJourneyStore()

  const currentLayer = LAYERS[currentLayerIndex]
  const progress = ((currentLayerIndex + 1) / LAYERS.length) * 100

  // Initialize journey store with political lens and track journey start
  useEffect(() => {
    setLens(theme as any) // Cast to match PoliticalLens type
    posthog.capture('journey_started', {
      political_lens: theme,
    })
  }, [theme, setLens, posthog])

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

    posthog.capture('question_answered', {
      layer_name: currentLayer,
      layer_number: currentLayerIndex + 1,
      question_index: Object.keys(layerAnswers).length,
      answer,
      political_lens: theme,
    })
  }

  const handleLayerComplete = () => {
    const timeOnLayer = Math.round((Date.now() - layerStartTime.current) / 1000)

    posthog.capture('layer_completed', {
      layer_number: currentLayerIndex + 1,
      layer_name: currentLayer,
      political_lens: theme,
      time_on_layer_seconds: timeOnLayer,
    })

    setCompletedLayers((prev) => new Set(prev).add(currentLayerIndex))

    if (currentLayerIndex < LAYERS.length - 1) {
      setCurrentLayerIndex(currentLayerIndex + 1)
      layerStartTime.current = Date.now()
    } else {
      posthog.capture('journey_completed', {
        political_lens: theme,
        persuasion_score: persuasionScore,
        total_answers: Object.keys(layerAnswers).length,
      })
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

  return (
    <main className="min-h-screen relative bg-stone-50 dark:bg-stone-950">
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 max-w-6xl min-h-screen">
        {/* Header */}
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.3}}
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
            <Button
              onClick={() => router.push('/')}
              variant="ghost"
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Website
            </Button>
          </div>

          {/* Progress Bar */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Layer {currentLayerIndex + 1} of {LAYERS.length}:{' '}
                  {LAYER_NAMES[currentLayer]}
                </span>
              </div>
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />

            {/* Layer Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {LAYERS.map((layer, idx) => (
                <Badge
                  key={layer}
                  variant={
                    idx === currentLayerIndex
                      ? 'default'
                      : completedLayers.has(idx)
                        ? 'secondary'
                        : 'outline'
                  }
                  className={`
                    ${idx === currentLayerIndex ? 'bg-slate-700 text-white dark:bg-slate-300 dark:text-slate-900' : ''}
                    ${completedLayers.has(idx) ? 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200' : ''}
                  `}
                >
                  {LAYER_NAMES[layer]}
                </Badge>
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

      </div>
    </main>
  )
}
