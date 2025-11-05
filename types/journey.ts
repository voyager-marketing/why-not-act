/**
 * Core type definitions for the multi-layered persuasion framework
 *
 * This module defines the fundamental building blocks for the political
 * journey system including political lenses, layer types, question types,
 * and answer options.
 */

/**
 * Political lens representing the user's ideological perspective
 * Used to frame content appropriately for different political viewpoints
 */
export type PoliticalLens = 'far-right' | 'center-right' | 'center-left' | 'far-left'

/**
 * Backward compatibility alias for existing 'Theme' usage
 * @deprecated Use PoliticalLens instead
 */
export type Theme = 'far-left' | 'mid-left' | 'mid-right' | 'far-right'

/**
 * The seven layers of the persuasion journey framework
 * Each layer builds upon the previous to create a complete persuasion arc
 */
export enum LayerType {
  /** Layer 1: Establish who the user is politically */
  SELF_IDENTIFICATION = 'self-identification',

  /** Layer 2: Align with their core values */
  VALUE_ALIGNMENT = 'value-alignment',

  /** Layer 3: Present factual data and reality */
  DATA_REALITY = 'data-reality',

  /** Layer 4: Introduce the solution in their framing */
  SOLUTION_INTRODUCTION = 'solution-introduction',

  /** Layer 5: Show impact and outcomes visually */
  IMPACT_VISUALIZATION = 'impact-visualization',

  /** Layer 6: Reflect and persuade with emotional resonance */
  REFLECTION_PERSUASION = 'reflection-persuasion',

  /** Layer 7: Call to action and conversion */
  CALL_TO_ACTION = 'call-to-action'
}

/**
 * Types of questions that can be asked at each layer
 * Different question types serve different persuasion purposes
 */
export enum QuestionType {
  /** Check if user's values align with a principle */
  VALUE_CHECK = 'value-check',

  /** Reveal data or facts to build awareness */
  DATA_REVEAL = 'data-reveal',

  /** Frame the solution in appealing terms */
  SOLUTION_FRAMING = 'solution-framing',

  /** Get agreement on predicted impact */
  IMPACT_AGREEMENT = 'impact-agreement',

  /** Prompt reflection on their journey */
  REFLECTION_PROMPT = 'reflection-prompt',

  /** Request commitment to action */
  ACTION_REQUEST = 'action-request'
}

/**
 * All possible answer types across different question formats
 * Supports both binary, scaled, and exploratory responses
 */
export type AnswerType =
  // Binary responses
  | 'yes'
  | 'no'
  | 'maybe'
  // Scaled agreement responses (Likert scale)
  | 'strongly-agree'
  | 'agree'
  | 'neutral'
  | 'disagree'
  | 'strongly-disagree'
  // Exploratory responses
  | 'tell-me-more'
  | 'not-convinced'
  | 'skip'

/**
 * Simple answer type for backward compatibility
 * @deprecated Use AnswerType instead
 */
export type Answer = 'yes' | 'no' | 'maybe'

/**
 * Weight assigned to answers for persuasion scoring
 * Higher weights indicate stronger persuasion/agreement
 */
export type PersuasionWeight = 0 | 1 | 2 | 3 | 4 | 5

/**
 * Mapping of answer types to their persuasion weight
 * Used to calculate overall persuasion scores
 */
export const ANSWER_WEIGHTS: Record<AnswerType, PersuasionWeight> = {
  // Binary
  'yes': 5,
  'maybe': 3,
  'no': 0,
  // Scaled
  'strongly-agree': 5,
  'agree': 4,
  'neutral': 2,
  'disagree': 1,
  'strongly-disagree': 0,
  // Exploratory
  'tell-me-more': 3,
  'not-convinced': 1,
  'skip': 0
}

/**
 * Helper function to map old Theme values to new PoliticalLens values
 * @param theme - Old theme value
 * @returns Corresponding PoliticalLens value
 */
export function themeToPoliticalLens(theme: Theme): PoliticalLens {
  const mapping: Record<Theme, PoliticalLens> = {
    'far-left': 'far-left',
    'mid-left': 'center-left',
    'mid-right': 'center-right',
    'far-right': 'far-right'
  }
  return mapping[theme]
}

/**
 * Helper function to map PoliticalLens values to old Theme values
 * @param lens - PoliticalLens value
 * @returns Corresponding Theme value
 */
export function politicalLensToTheme(lens: PoliticalLens): Theme {
  const mapping: Record<PoliticalLens, Theme> = {
    'far-left': 'far-left',
    'center-left': 'mid-left',
    'center-right': 'mid-right',
    'far-right': 'far-right'
  }
  return mapping[lens]
}

/**
 * Layer metadata including display information and ordering
 */
export interface LayerMetadata {
  layer: LayerType
  order: number
  displayName: string
  description: string
  icon?: string
}

/**
 * Complete layer metadata for all seven layers
 */
export const LAYER_METADATA: LayerMetadata[] = [
  {
    layer: LayerType.SELF_IDENTIFICATION,
    order: 1,
    displayName: 'Self-Identification',
    description: 'Understand your political perspective',
    icon: 'user'
  },
  {
    layer: LayerType.VALUE_ALIGNMENT,
    order: 2,
    displayName: 'Value Alignment',
    description: 'Connect with your core values',
    icon: 'heart'
  },
  {
    layer: LayerType.DATA_REALITY,
    order: 3,
    displayName: 'Data & Reality',
    description: 'Explore the facts and data',
    icon: 'chart'
  },
  {
    layer: LayerType.SOLUTION_INTRODUCTION,
    order: 4,
    displayName: 'Solution Introduction',
    description: 'Discover the proposed solution',
    icon: 'lightbulb'
  },
  {
    layer: LayerType.IMPACT_VISUALIZATION,
    order: 5,
    displayName: 'Impact Visualization',
    description: 'Visualize the potential impact',
    icon: 'target'
  },
  {
    layer: LayerType.REFLECTION_PERSUASION,
    order: 6,
    displayName: 'Reflection & Persuasion',
    description: 'Reflect on what you have learned',
    icon: 'mirror'
  },
  {
    layer: LayerType.CALL_TO_ACTION,
    order: 7,
    displayName: 'Call to Action',
    description: 'Take action and make a difference',
    icon: 'flag'
  }
]
