/**
 * Central export point for all TypeScript types in the WhyNotAct application
 *
 * This module provides a single import location for all type definitions
 * related to the multi-layered persuasion framework.
 *
 * @example
 * ```typescript
 * // Import from central location
 * import { PoliticalLens, LayeredQuestion, UserJourney } from '@/types'
 * ```
 */

// Core journey types
export type {
  PoliticalLens,
  Theme,
  PersuasionWeight,
  AnswerType,
  Answer,
  LayerMetadata
} from './journey'

export {
  LayerType,
  QuestionType,
  ANSWER_WEIGHTS,
  LAYER_METADATA,
  themeToPoliticalLens,
  politicalLensToTheme
} from './journey'

// Layered question types
export type {
  VisualTheme,
  DataPoint,
  ContentFraming,
  QuestionPrerequisite,
  LayeredQuestion,
  Question,
  ThemedFraming
} from './layeredQuestion'

export {
  convertLegacyQuestion,
  getFramingForLens,
  getFramingForTheme,
  hasPrerequisites,
  checkPrerequisites
} from './layeredQuestion'

// User journey types
export type {
  ResponseRecord,
  Scores,
  PersonalizationData,
  ConversionAction,
  UserJourney,
  LegacyUserJourney,
  JourneySummary
} from './userJourney'

export {
  calculateCompletionRate,
  calculateAvgTimePerQuestion,
  determineConvictionLevel,
  generateJourneySummary,
  convertLegacyJourney
} from './userJourney'

// Result types
export type {
  ResultType,
  ContentBlockType,
  ContentBlock,
  ContentBlockData,
  HeroStatsData,
  BulletListData,
  DataVisualizationData,
  TestimonialData,
  ImpactStoryData,
  ComparisonTableData,
  TimelineData,
  QuoteData,
  VideoData,
  CTABannerData,
  RecommendedAction,
  Testimonial,
  PersonalizedResult,
  ResultPageConfig,
  LegacyResultPageContent
} from './result'

export {
  generatePersonalizedResult
} from './result'

// Legacy types for backward compatibility
export type {
  FormState,
  ConvictionScores,
  PersuasionProfile
} from './form'
