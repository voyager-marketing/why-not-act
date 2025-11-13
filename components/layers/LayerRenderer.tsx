'use client'

import {motion, AnimatePresence} from 'framer-motion'
import type {Theme, Answer} from '@/types/form'
import ValueAlignmentLayer from './ValueAlignmentLayer'
import DataRealityLayer from './DataRealityLayer'
import SolutionIntroductionLayer from './SolutionIntroductionLayer'
import ImpactVisualizationLayer from './ImpactVisualizationLayer'
import ReflectionPersuasionLayer from './ReflectionPersuasionLayer'
import CallToActionLayer from './CallToActionLayer'

export type LayerType =
  | 'value-alignment'
  | 'data-reality'
  | 'solution-introduction'
  | 'impact-visualization'
  | 'reflection-persuasion'
  | 'call-to-action'

export interface LayerQuestion {
  id: string
  text: string
  explanation?: string
  themedFraming?: Record<Theme, string>
}

interface LayerRendererProps {
  currentLayer: LayerType
  theme: Theme
  onAnswer: (answer: Answer) => void
  onLayerComplete: () => void
  answers: Record<string, Answer>
  persuasionScore: number
}

export default function LayerRenderer({
  currentLayer,
  theme,
  onAnswer,
  onLayerComplete,
  answers,
  persuasionScore,
}: LayerRendererProps) {
  const pageVariants = {
    initial: {
      opacity: 0,
      x: 100,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -100,
    },
  }

  const pageTransition = {
    duration: 0.5,
    ease: 'easeInOut' as any,
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentLayer}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        {currentLayer === 'value-alignment' && (
          <ValueAlignmentLayer
            theme={theme}
            onAnswer={onAnswer}
            onComplete={onLayerComplete}
            answers={answers}
          />
        )}

        {currentLayer === 'data-reality' && (
          <DataRealityLayer
            theme={theme}
            onComplete={onLayerComplete}
          />
        )}

        {currentLayer === 'solution-introduction' && (
          <SolutionIntroductionLayer
            theme={theme}
            onAnswer={onAnswer}
            onComplete={onLayerComplete}
          />
        )}

        {currentLayer === 'impact-visualization' && (
          <ImpactVisualizationLayer onComplete={onLayerComplete} />
        )}

        {currentLayer === 'reflection-persuasion' && (
          <ReflectionPersuasionLayer
            theme={theme}
            answers={answers}
            onAnswer={onAnswer}
            onComplete={onLayerComplete}
          />
        )}

        {currentLayer === 'call-to-action' && (
          <CallToActionLayer
            theme={theme}
            persuasionScore={persuasionScore}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
