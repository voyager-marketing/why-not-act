/**
 * @deprecated This file contains legacy types. Please use the new type system:
 * - For political lenses: import from './journey'
 * - For questions: import from './layeredQuestion'
 * - For user journeys: import from './userJourney'
 * - For results: import from './result'
 */

/**
 * @deprecated Use PoliticalLens from './journey' instead
 * Legacy theme type for backward compatibility
 */
export type Theme = 'far-left' | 'mid-left' | 'mid-right' | 'far-right'

/**
 * @deprecated Use AnswerType from './journey' instead
 * Legacy answer type for backward compatibility
 */
export type Answer = 'yes' | 'no' | 'maybe'

/**
 * @deprecated Use ContentFraming from './layeredQuestion' instead
 * Legacy themed framing for backward compatibility
 */
export interface ThemedFraming {
  headline: string
  bullets: string[]
}

/**
 * @deprecated Use LayeredQuestion from './layeredQuestion' instead
 * Legacy question structure for backward compatibility
 */
export interface Question {
  order: number
  topic: string
  coreIdea: string
  farLeft: ThemedFraming
  midLeft: ThemedFraming
  midRight: ThemedFraming
  farRight: ThemedFraming
}

/**
 * @deprecated Form state - consider using UserJourney from './userJourney' instead
 * Legacy form state for backward compatibility
 */
export interface FormState {
  theme: Theme | null
  answers: Record<number, Answer>
  score: number
}

/**
 * Result type - still in use but also exported from './result'
 * Consider importing from './result' for consistency
 */
export type ResultType = 'revenue' | 'economic' | 'security' | 'demographic'

/**
 * @deprecated Use Scores from './userJourney' instead
 * Legacy conviction scores for backward compatibility
 */
export interface ConvictionScores {
  valueAlignment: number      // 0-100: How aligned with their values
  dataAwareness: number       // 0-100: How much data they engaged with
  persuasionLevel: number     // 0-100: How persuaded they are
  engagementDepth: number     // 0-100: How deeply they engaged
}

/**
 * @deprecated Use UserJourney from './userJourney' instead
 * Legacy user journey for backward compatibility
 */
export interface UserJourney {
  theme: Theme
  answers: Record<number, Answer>
  score: number
  resultType: ResultType
  convictionScores: ConvictionScores
  completedAt: string
  layersCompleted: number
  keyAnswers: {
    questionOrder: number
    answer: Answer
    topic: string
  }[]
}

/**
 * @deprecated Persuasion profile concept is integrated into new PersonalizedResult
 * Legacy persuasion profile for backward compatibility
 */
export interface PersuasionProfile {
  level: 'skeptic' | 'curious' | 'engaged' | 'champion'
  scoreRange: [number, number]
  narrativeTemplate: string
  emotionalTone: 'cautious' | 'optimistic' | 'passionate' | 'urgent'
}

/**
 * Layer types for the multi-layered journey experience
 */
export type LayerType =
  | 'value-alignment'
  | 'data-reality'
  | 'solution-introduction'
  | 'impact-visualization'
  | 'reflection-persuasion'
  | 'call-to-action'

/**
 * Layer completion state
 */
export interface LayerState {
  layerType: LayerType
  completed: boolean
  answersGiven: number
  timeSpent: number
  score: number
}

/**
 * Journey progress tracking
 */
export interface JourneyProgress {
  currentLayer: LayerType
  currentLayerIndex: number
  totalLayers: number
  completedLayers: Set<number>
  layerStates: Record<LayerType, LayerState>
  persuasionScore: number
  answers: Record<string, Answer>
}
