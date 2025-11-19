/**
 * GROQ Queries for Immigration Content
 *
 * Use these queries to fetch migrated Layer 2 & 3 content from Sanity.
 */

import {groq} from 'next-sanity'

/**
 * Fetch all Layer 2 (Value Alignment) questions
 * Ordered by the `order` field
 */
export const LAYER2_QUESTIONS_QUERY = groq`
  *[_type == "layeredQuestion" && layer == "layer2"] | order(order asc) {
    _id,
    _type,
    layer,
    questionType,
    order,
    topic,
    coreQuestion,
    context,
    farRightFraming {
      headline,
      subheadline,
      bullets,
      narrative,
      emotionalTone,
      primaryColor
    },
    centerRightFraming {
      headline,
      subheadline,
      bullets,
      narrative,
      emotionalTone,
      primaryColor
    },
    centerLeftFraming {
      headline,
      subheadline,
      bullets,
      narrative,
      emotionalTone,
      primaryColor
    },
    farLeftFraming {
      headline,
      subheadline,
      bullets,
      narrative,
      emotionalTone,
      primaryColor
    },
    persuasionWeight,
    isGatekeeping,
    tags
  }
`

/**
 * Fetch all Layer 3 (Data Reality) data points
 * Filtered by immigration tag
 */
export const LAYER3_DATAPOINTS_QUERY = groq`
  *[_type == "dataPoint" && "immigration" in tags] | order(_createdAt asc) {
    _id,
    _type,
    category,
    statistic,
    neutralContext,
    source,
    sourceUrl,
    yearCollected,
    visualization {
      type,
      animationStyle,
      colorScheme
    },
    farRightInterpretation {
      headline,
      explanation,
      implication
    },
    centerRightInterpretation {
      headline,
      explanation,
      implication
    },
    centerLeftInterpretation {
      headline,
      explanation,
      implication
    },
    farLeftInterpretation {
      headline,
      explanation,
      implication
    },
    tags,
    isVerified
  }
`

/**
 * Fetch a single Layer 2 question by ID
 */
export const LAYER2_QUESTION_BY_ID_QUERY = groq`
  *[_type == "layeredQuestion" && _id == $id][0] {
    _id,
    _type,
    layer,
    questionType,
    order,
    topic,
    coreQuestion,
    context,
    farRightFraming,
    centerRightFraming,
    centerLeftFraming,
    farLeftFraming,
    persuasionWeight,
    isGatekeeping,
    answerOptions[] {
      label,
      value,
      persuasionDelta
    },
    tags
  }
`

/**
 * Fetch a single Layer 3 data point by ID
 */
export const LAYER3_DATAPOINT_BY_ID_QUERY = groq`
  *[_type == "dataPoint" && _id == $id][0] {
    _id,
    _type,
    category,
    statistic,
    neutralContext,
    source,
    sourceUrl,
    yearCollected,
    visualization,
    farRightInterpretation,
    centerRightInterpretation,
    centerLeftInterpretation,
    farLeftInterpretation,
    tags,
    isVerified
  }
`

/**
 * TypeScript interfaces for the query results
 */

export interface LayeredQuestionFraming {
  headline?: string
  subheadline?: string
  bullets?: string[]
  narrative?: string
  emotionalTone?: 'fear' | 'anger' | 'pride' | 'hope' | 'neutral'
  primaryColor?: string
}

export interface Layer2Question {
  _id: string
  _type: 'layeredQuestion'
  layer: 'layer2'
  questionType: 'values'
  order: number
  topic: string
  coreQuestion: string
  context?: string
  farRightFraming?: LayeredQuestionFraming
  centerRightFraming?: LayeredQuestionFraming
  centerLeftFraming?: LayeredQuestionFraming
  farLeftFraming?: LayeredQuestionFraming
  persuasionWeight: number
  isGatekeeping: boolean
  tags?: string[]
  answerOptions?: Array<{
    label: string
    value: string
    persuasionDelta?: number
  }>
}

export interface DataPointInterpretation {
  headline?: string
  explanation?: string
  implication?: string
}

export interface Layer3DataPoint {
  _id: string
  _type: 'dataPoint'
  category: 'economic' | 'security' | 'demographic' | 'legal' | 'social' | 'environmental' | 'healthcare' | 'education'
  statistic: string
  neutralContext: string
  source: string
  sourceUrl?: string
  yearCollected?: number
  visualization?: {
    type?: 'counter' | 'progress' | 'pie' | 'line' | 'bar' | 'iconArray' | 'text'
    animationStyle?: 'countUp' | 'fadeIn' | 'slideIn' | 'none'
    colorScheme?: 'neutral' | 'warning' | 'success' | 'info'
  }
  farRightInterpretation?: DataPointInterpretation
  centerRightInterpretation?: DataPointInterpretation
  centerLeftInterpretation?: DataPointInterpretation
  farLeftInterpretation?: DataPointInterpretation
  tags?: string[]
  isVerified: boolean
}

/**
 * Helper function to get the appropriate framing/interpretation based on theme
 */
export type Theme = 'far-right' | 'center-right' | 'center-left' | 'far-left'

export function getFramingForTheme(
  question: Layer2Question,
  theme: Theme
): LayeredQuestionFraming | undefined {
  const framingMap: Record<Theme, keyof Layer2Question> = {
    'far-right': 'farRightFraming',
    'center-right': 'centerRightFraming',
    'center-left': 'centerLeftFraming',
    'far-left': 'farLeftFraming',
  }

  const framingKey = framingMap[theme]
  return question[framingKey] as LayeredQuestionFraming | undefined
}

export function getInterpretationForTheme(
  dataPoint: Layer3DataPoint,
  theme: Theme
): DataPointInterpretation | undefined {
  const interpretationMap: Record<Theme, keyof Layer3DataPoint> = {
    'far-right': 'farRightInterpretation',
    'center-right': 'centerRightInterpretation',
    'center-left': 'centerLeftInterpretation',
    'far-left': 'farLeftInterpretation',
  }

  const interpretationKey = interpretationMap[theme]
  return dataPoint[interpretationKey] as DataPointInterpretation | undefined
}
