/**
 * Type definitions for layered questions in the persuasion framework
 *
 * This module defines the structure of questions that adapt their content
 * based on political lens, including framing, data points, and visual themes.
 */

import { PoliticalLens, LayerType, QuestionType, Theme } from './journey'

/**
 * Visual theme configuration for a question
 * Controls the aesthetic presentation to match emotional tone
 */
export interface VisualTheme {
  /** Primary color for the question card/UI (hex or tailwind class) */
  primaryColor: string

  /** Icon set to use (lucide, heroicons, custom) */
  iconSet: 'lucide' | 'heroicons' | 'custom'

  /** Specific icon name to display */
  iconName?: string

  /** Background style (gradient, solid, image) */
  backgroundStyle: 'gradient' | 'solid' | 'pattern' | 'image'

  /** Background configuration details */
  backgroundConfig?: {
    gradientFrom?: string
    gradientTo?: string
    patternType?: string
    imageUrl?: string
  }
}

/**
 * Data point with source citation
 * Used to present factual information with credibility
 */
export interface DataPoint {
  /** The statistic or fact (e.g., "47% of undocumented immigrants") */
  statistic: string

  /** Source of the data (e.g., "Pew Research Center, 2023") */
  source: string

  /** URL to the source material */
  sourceUrl?: string

  /** How to visualize this data */
  visualType: 'chart' | 'infographic' | 'text' | 'comparison' | 'timeline'

  /** Additional context or explanation */
  context?: string
}

/**
 * Content framing for a specific political lens
 * Adapts messaging to resonate with different political perspectives
 */
export interface ContentFraming {
  /** Main headline - short, punchy, value-aligned */
  headline: string

  /** Supporting subheadline - adds context */
  subheadline?: string

  /** Bullet points with key arguments/data */
  bullets: string[]

  /** Full narrative text (optional, for deeper engagement) */
  narrative?: string

  /** Visual theme for this framing */
  visualTheme: VisualTheme

  /** Emotional tone of the content */
  emotionalTone: 'cautious' | 'optimistic' | 'passionate' | 'urgent' | 'analytical'

  /** Keywords that resonate with this lens */
  resonanceKeywords?: string[]
}

/**
 * Prerequisites that must be met before showing a question
 * Enables conditional logic and branching in the journey
 */
export interface QuestionPrerequisite {
  /** Question ID that must be answered first */
  questionId: string

  /** Required answer(s) to this question */
  requiredAnswers: string[]

  /** Optional: Minimum score threshold required */
  minScore?: number

  /** Prerequisite relationship type */
  relationship: 'required' | 'recommended' | 'optional'
}

/**
 * Complete layered question with all framings and metadata
 * The core unit of the persuasion journey
 */
export interface LayeredQuestion {
  /** Unique identifier for the question */
  id: string

  /** Which layer of the journey this belongs to */
  layer: LayerType

  /** Order within the layer (e.g., 1, 2, 3) */
  order: number

  /** Type of question being asked */
  questionType: QuestionType

  /** Core idea/question - politically neutral version */
  coreIdea: string

  /** Optional data point to present with this question */
  dataPoint?: DataPoint

  /** Content framings for each political lens */
  framings: {
    farLeft: ContentFraming
    centerLeft: ContentFraming
    centerRight: ContentFraming
    farRight: ContentFraming
  }

  /** Prerequisites that must be met to show this question */
  prerequisites?: QuestionPrerequisite[]

  /** Weight of this question in persuasion calculations (0-5) */
  persuasionWeight: 0 | 1 | 2 | 3 | 4 | 5

  /** Whether this is a gatekeeping question (blocks progress if failed) */
  isGatekeeping: boolean

  /** Optional branching logic based on answers */
  branching?: {
    onYes?: string // Question ID to jump to
    onNo?: string
    onMaybe?: string
  }

  /** Metadata for analytics and optimization */
  metadata?: {
    createdAt: string
    updatedAt: string
    author?: string
    testVariant?: string
    performanceScore?: number
  }
}

/**
 * Backward compatibility interface for existing Question type
 * Maps old structure to new layered structure
 * @deprecated Use LayeredQuestion instead
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
 * Backward compatibility interface for themed framing
 * @deprecated Use ContentFraming instead
 */
export interface ThemedFraming {
  headline: string
  bullets: string[]
}

/**
 * Helper function to convert old Question format to LayeredQuestion
 * @param oldQuestion - Question in old format
 * @param layer - Layer to assign
 * @param questionType - Type to assign
 * @returns LayeredQuestion in new format
 */
export function convertLegacyQuestion(
  oldQuestion: Question,
  layer: LayerType,
  questionType: QuestionType
): LayeredQuestion {
  const createContentFraming = (framing: ThemedFraming, lens: PoliticalLens): ContentFraming => ({
    headline: framing.headline,
    bullets: framing.bullets,
    visualTheme: {
      primaryColor: '#6366f1', // Default indigo
      iconSet: 'lucide',
      backgroundStyle: 'gradient',
      backgroundConfig: {
        gradientFrom: '#f3f4f6',
        gradientTo: '#e5e7eb'
      }
    },
    emotionalTone: 'analytical'
  })

  return {
    id: `legacy-${oldQuestion.order}`,
    layer,
    order: oldQuestion.order,
    questionType,
    coreIdea: oldQuestion.coreIdea,
    framings: {
      farLeft: createContentFraming(oldQuestion.farLeft, 'far-left'),
      centerLeft: createContentFraming(oldQuestion.midLeft, 'center-left'),
      centerRight: createContentFraming(oldQuestion.midRight, 'center-right'),
      farRight: createContentFraming(oldQuestion.farRight, 'far-right')
    },
    persuasionWeight: 2,
    isGatekeeping: false
  }
}

/**
 * Helper function to get the appropriate framing for a political lens
 * @param question - The layered question
 * @param lens - The political lens
 * @returns The appropriate content framing
 */
export function getFramingForLens(
  question: LayeredQuestion,
  lens: PoliticalLens
): ContentFraming {
  const framingMap: Record<PoliticalLens, keyof LayeredQuestion['framings']> = {
    'far-left': 'farLeft',
    'center-left': 'centerLeft',
    'center-right': 'centerRight',
    'far-right': 'farRight'
  }

  const key = framingMap[lens]
  return question.framings[key]
}

/**
 * Helper function to get framing using old Theme type
 * @param question - The layered question
 * @param theme - The old theme value
 * @returns The appropriate content framing
 * @deprecated Use getFramingForLens with PoliticalLens instead
 */
export function getFramingForTheme(
  question: LayeredQuestion,
  theme: Theme
): ContentFraming {
  const themeMap: Record<Theme, keyof LayeredQuestion['framings']> = {
    'far-left': 'farLeft',
    'mid-left': 'centerLeft',
    'mid-right': 'centerRight',
    'far-right': 'farRight'
  }

  const key = themeMap[theme]
  return question.framings[key]
}

/**
 * Type guard to check if a question has prerequisites
 * @param question - The question to check
 * @returns True if question has prerequisites
 */
export function hasPrerequisites(question: LayeredQuestion): boolean {
  return !!question.prerequisites && question.prerequisites.length > 0
}

/**
 * Check if prerequisites are met based on user's journey
 * @param question - The question to check
 * @param answeredQuestions - Map of questionId to answer
 * @param currentScore - Current user score
 * @returns True if all prerequisites are met
 */
export function checkPrerequisites(
  question: LayeredQuestion,
  answeredQuestions: Record<string, string>,
  currentScore: number
): boolean {
  if (!hasPrerequisites(question)) {
    return true
  }

  return question.prerequisites!.every(prereq => {
    const answer = answeredQuestions[prereq.questionId]

    // Check if required answer is present
    if (!answer || !prereq.requiredAnswers.includes(answer)) {
      return prereq.relationship === 'optional'
    }

    // Check score threshold if present
    if (prereq.minScore !== undefined && currentScore < prereq.minScore) {
      return prereq.relationship === 'optional'
    }

    return true
  })
}
