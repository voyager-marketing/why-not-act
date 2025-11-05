/**
 * Type definitions for tracking user journey through the persuasion framework
 *
 * This module defines how we track user progress, responses, engagement,
 * and conversion throughout their political action journey.
 */

import { PoliticalLens, LayerType, AnswerType, Theme } from './journey'

/**
 * Individual response to a question
 * Tracks what was answered and behavioral metadata
 */
export interface ResponseRecord {
  /** Unique ID of the question answered */
  questionId: string

  /** Which layer this question belonged to */
  layer: LayerType

  /** The answer given */
  answer: AnswerType

  /** When the response was recorded */
  timestamp: string

  /** How long user spent on this question (seconds) */
  timeSpent: number

  /** Number of times answer was changed before submitting */
  changeCount?: number

  /** Whether "tell me more" was clicked */
  expandedData?: boolean

  /** Scroll depth on question (0-100%) */
  scrollDepth?: number
}

/**
 * Scoring metrics for different aspects of user engagement
 * All scores range from 0-100
 */
export interface Scores {
  /** How aligned responses are with their stated values (0-100) */
  valueAlignment: number

  /** How much data/information they engaged with (0-100) */
  dataAwareness: number

  /** Overall persuasion level based on answer weights (0-100) */
  persuasionLevel: number

  /** Depth of engagement - time, clicks, exploration (0-100) */
  engagementDepth: number

  /** Consistency score - how consistent their answers are (0-100) */
  consistencyScore?: number

  /** Layer-specific scores */
  layerScores?: {
    [key in LayerType]?: number
  }
}

/**
 * Personalization data collected during the journey
 * Used to customize the experience and results
 */
export interface PersonalizationData {
  /** User's stated political lens */
  politicalLens: PoliticalLens

  /** Detected engagement patterns */
  engagementPatterns?: {
    prefersFacts?: boolean
    prefersStories?: boolean
    prefersVisuals?: boolean
    attentionSpan?: 'short' | 'medium' | 'long'
  }

  /** Topics they showed most interest in */
  topInterests?: string[]

  /** Questions they spent longest on */
  deepDiveQuestions?: string[]

  /** Emotional tone that resonated most */
  resonantTone?: 'cautious' | 'optimistic' | 'passionate' | 'urgent' | 'analytical'

  /** Predicted conviction level */
  convictionLevel?: 'skeptic' | 'curious' | 'engaged' | 'champion'
}

/**
 * Conversion action taken by the user
 * Tracks what actions resulted from the journey
 */
export interface ConversionAction {
  /** Type of action taken */
  actionType: 'petition-signed' | 'shared' | 'donated' | 'contacted-rep' | 'subscribed' | 'custom'

  /** When the action was taken */
  timestamp: string

  /** Details about the action */
  details?: {
    amount?: number // For donations
    platform?: string // For shares
    customAction?: string // For custom actions
  }

  /** Source that drove this action */
  source?: 'result-page' | 'mid-journey-cta' | 'email-followup'
}

/**
 * Complete user journey record
 * Captures everything about a user's progression through the framework
 */
export interface UserJourney {
  /** Unique session identifier */
  sessionId: string

  /** User's political lens (from initial selection) */
  politicalLens: PoliticalLens

  /** Current scoring metrics */
  scores: Scores

  /** All responses given so far */
  responses: ResponseRecord[]

  /** Personalization data collected */
  personalizationData: PersonalizationData

  /** Conversion actions taken */
  conversions: ConversionAction[]

  /** Journey metadata */
  metadata: {
    /** When journey started */
    startedAt: string

    /** When journey completed (if applicable) */
    completedAt?: string

    /** Last activity timestamp */
    lastActivityAt: string

    /** Current layer user is on */
    currentLayer: LayerType

    /** Number of layers completed */
    layersCompleted: number

    /** Total time spent (seconds) */
    totalTimeSpent: number

    /** Whether journey was completed */
    isCompleted: boolean

    /** Whether user abandoned journey */
    isAbandoned?: boolean

    /** Device/browser info */
    deviceInfo?: {
      userAgent?: string
      screenSize?: string
      deviceType?: 'mobile' | 'tablet' | 'desktop'
    }

    /** Entry point */
    referrer?: string

    /** AB test variant (if applicable) */
    testVariant?: string
  }

  /** Result type determined at the end */
  resultType?: 'revenue' | 'economic' | 'security' | 'demographic'
}

/**
 * Backward compatibility interface for old UserJourney
 * @deprecated Use the new UserJourney interface instead
 */
export interface LegacyUserJourney {
  theme: Theme
  answers: Record<number, string>
  score: number
  resultType: 'revenue' | 'economic' | 'security' | 'demographic'
  convictionScores: {
    valueAlignment: number
    dataAwareness: number
    persuasionLevel: number
    engagementDepth: number
  }
  completedAt: string
  layersCompleted: number
  keyAnswers: {
    questionOrder: number
    answer: string
    topic: string
  }[]
}

/**
 * Summary stats for a completed journey
 * Used for analytics and optimization
 */
export interface JourneySummary {
  sessionId: string
  politicalLens: PoliticalLens
  completionRate: number // 0-100%
  averageTimePerQuestion: number // seconds
  persuasionLift: number // Change in persuasion score from start to end
  conversionRate: number // Did they convert? 0 or 1
  resultType?: 'revenue' | 'economic' | 'security' | 'demographic'
}

/**
 * Helper function to calculate completion rate
 * @param journey - The user journey
 * @param totalQuestions - Total number of questions
 * @returns Completion rate as percentage
 */
export function calculateCompletionRate(
  journey: UserJourney,
  totalQuestions: number
): number {
  return Math.round((journey.responses.length / totalQuestions) * 100)
}

/**
 * Helper function to calculate average time per question
 * @param journey - The user journey
 * @returns Average time in seconds
 */
export function calculateAvgTimePerQuestion(journey: UserJourney): number {
  if (journey.responses.length === 0) return 0

  const totalTime = journey.responses.reduce((sum, r) => sum + r.timeSpent, 0)
  return Math.round(totalTime / journey.responses.length)
}

/**
 * Helper function to determine conviction level
 * @param journey - The user journey
 * @returns Conviction level
 */
export function determineConvictionLevel(
  journey: UserJourney
): 'skeptic' | 'curious' | 'engaged' | 'champion' {
  const { persuasionLevel, engagementDepth } = journey.scores

  if (persuasionLevel >= 75 && engagementDepth >= 70) {
    return 'champion'
  } else if (persuasionLevel >= 50) {
    return 'engaged'
  } else if (engagementDepth >= 50) {
    return 'curious'
  } else {
    return 'skeptic'
  }
}

/**
 * Helper function to generate journey summary
 * @param journey - The user journey
 * @param totalQuestions - Total number of questions
 * @returns Journey summary for analytics
 */
export function generateJourneySummary(
  journey: UserJourney,
  totalQuestions: number
): JourneySummary {
  return {
    sessionId: journey.sessionId,
    politicalLens: journey.politicalLens,
    completionRate: calculateCompletionRate(journey, totalQuestions),
    averageTimePerQuestion: calculateAvgTimePerQuestion(journey),
    persuasionLift: journey.scores.persuasionLevel,
    conversionRate: journey.conversions.length > 0 ? 1 : 0,
    resultType: journey.resultType
  }
}

/**
 * Convert legacy journey to new format
 * @param legacy - Legacy journey object
 * @returns New UserJourney object
 */
export function convertLegacyJourney(legacy: LegacyUserJourney): UserJourney {
  const politicalLensMap: Record<Theme, PoliticalLens> = {
    'far-left': 'far-left',
    'mid-left': 'center-left',
    'mid-right': 'center-right',
    'far-right': 'far-right'
  }

  const responses: ResponseRecord[] = legacy.keyAnswers.map((ans, idx) => ({
    questionId: `legacy-${ans.questionOrder}`,
    layer: LayerType.VALUE_ALIGNMENT, // Default to layer 2
    answer: ans.answer as AnswerType,
    timestamp: legacy.completedAt,
    timeSpent: 30 // Estimate
  }))

  return {
    sessionId: `legacy-${Date.now()}`,
    politicalLens: politicalLensMap[legacy.theme],
    scores: {
      valueAlignment: legacy.convictionScores.valueAlignment,
      dataAwareness: legacy.convictionScores.dataAwareness,
      persuasionLevel: legacy.convictionScores.persuasionLevel,
      engagementDepth: legacy.convictionScores.engagementDepth
    },
    responses,
    personalizationData: {
      politicalLens: politicalLensMap[legacy.theme]
    },
    conversions: [],
    metadata: {
      startedAt: legacy.completedAt,
      completedAt: legacy.completedAt,
      lastActivityAt: legacy.completedAt,
      currentLayer: LayerType.CALL_TO_ACTION,
      layersCompleted: legacy.layersCompleted,
      totalTimeSpent: responses.length * 30,
      isCompleted: true
    },
    resultType: legacy.resultType
  }
}
