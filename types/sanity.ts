/**
 * TypeScript interfaces for Sanity CMS schemas
 * Generated for the WhyNotAct multi-layered question system
 */

// ============================================================================
// Base Types
// ============================================================================

export type IdeologyType = 'farLeft' | 'centerLeft' | 'centerRight' | 'farRight'

export type LayerType = 'layer1' | 'layer2' | 'layer3' | 'layer4' | 'layer5' | 'layer6' | 'layer7'

export type QuestionType = 'awareness' | 'opinion' | 'knowledge' | 'values' | 'action'

export type EmotionalTone = 'fear' | 'anger' | 'pride' | 'hope' | 'neutral'

export type DataCategory = 'economic' | 'security' | 'demographic' | 'legal' | 'social' | 'environmental' | 'healthcare' | 'education'

export type VisualizationType = 'counter' | 'progress' | 'pie' | 'line' | 'bar' | 'iconArray' | 'text'

export type AnimationStyle = 'countUp' | 'fadeIn' | 'slideIn' | 'none'

export type ColorScheme = 'neutral' | 'warning' | 'success' | 'info'

export type ActionType = 'petition' | 'donate' | 'share' | 'letter' | 'story-submit' | 'volunteer' | 'event' | 'contact-rep' | 'subscribe'

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical'

// ============================================================================
// Ideology Framing
// ============================================================================

export interface IdeologyFraming {
  headline?: string
  subheadline?: string
  bullets?: string[]
  narrative?: string
  emotionalTone?: EmotionalTone
  primaryColor?: string
}

// ============================================================================
// Data Points
// ============================================================================

export interface DataPointVisualization {
  type?: VisualizationType
  animationStyle?: AnimationStyle
  colorScheme?: ColorScheme
}

export interface DataInterpretation {
  headline?: string
  explanation?: string
  implication?: string
}

export interface DataPoint {
  _id: string
  _type: 'dataPoint'
  category: DataCategory
  statistic: string
  neutralContext: string
  source: string
  sourceUrl?: string
  yearCollected?: number
  visualization?: DataPointVisualization
  farRightInterpretation?: DataInterpretation
  centerRightInterpretation?: DataInterpretation
  centerLeftInterpretation?: DataInterpretation
  farLeftInterpretation?: DataInterpretation
  relatedQuestions?: LayeredQuestion[]
  tags?: string[]
  isVerified: boolean
  lastUpdated?: string
}

// ============================================================================
// Layered Questions
// ============================================================================

export interface QuestionDataPoint {
  statistic?: string
  context?: string
  source?: string
  sourceUrl?: string
}

export interface QuestionPrerequisites {
  minLayer?: LayerType | 'none'
  minPersuasionScore?: number
  requiredQuestions?: LayeredQuestion[]
}

export interface AnswerOption {
  label: string
  value: string
  persuasionDelta?: number
}

export interface LayeredQuestion {
  _id: string
  _type: 'layeredQuestion'
  layer: LayerType
  questionType: QuestionType
  order: number
  topic: string
  coreQuestion: string
  context?: string
  dataPoint?: QuestionDataPoint
  farRightFraming?: IdeologyFraming
  centerRightFraming?: IdeologyFraming
  centerLeftFraming?: IdeologyFraming
  farLeftFraming?: IdeologyFraming
  persuasionWeight: number
  isGatekeeping: boolean
  prerequisites?: QuestionPrerequisites
  answerOptions?: AnswerOption[]
  tags?: string[]
}

// ============================================================================
// Call to Action
// ============================================================================

export interface CTAFraming {
  headline?: string
  description?: string
  buttonText?: string
  icon?: string
  urgencyLevel?: UrgencyLevel
}

export interface ConversionMetrics {
  showIfPersuasionAbove?: number
  showIfPersuasionBelow?: number
  showIfLayersCompleted?: LayerType[]
  maxDisplays?: number
  cooldownHours?: number
}

export interface SuccessMetrics {
  goalConversions?: number
  trackingId?: string
}

export interface CallToAction {
  _id: string
  _type: 'callToAction'
  actionType: ActionType
  title: string
  priority: number
  externalUrl?: string
  embedCode?: string
  farRightFraming?: CTAFraming
  centerRightFraming?: CTAFraming
  centerLeftFraming?: CTAFraming
  farLeftFraming?: CTAFraming
  conversionMetrics?: ConversionMetrics
  successMetrics?: SuccessMetrics
  isActive: boolean
  startDate?: string
  endDate?: string
  tags?: string[]
}

// ============================================================================
// Legacy Question (Deprecated)
// ============================================================================

export interface LegacyQuestion {
  _id: string
  _type: 'question'
  order: number
  topic: string
  coreIdea: string
  farLeftHeadline?: string
  farLeftBullets?: string[]
  midLeftHeadline?: string
  midLeftBullets?: string[]
  midRightHeadline?: string
  midRightBullets?: string[]
  farRightHeadline?: string
  farRightBullets?: string[]
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Get the appropriate framing for a question based on ideology
 */
export function getQuestionFraming(
  question: LayeredQuestion,
  ideology: IdeologyType
): IdeologyFraming | undefined {
  switch (ideology) {
    case 'farLeft':
      return question.farLeftFraming
    case 'centerLeft':
      return question.centerLeftFraming
    case 'centerRight':
      return question.centerRightFraming
    case 'farRight':
      return question.farRightFraming
    default:
      return undefined
  }
}

/**
 * Get the appropriate interpretation for a data point based on ideology
 */
export function getDataInterpretation(
  dataPoint: DataPoint,
  ideology: IdeologyType
): DataInterpretation | undefined {
  switch (ideology) {
    case 'farLeft':
      return dataPoint.farLeftInterpretation
    case 'centerLeft':
      return dataPoint.centerLeftInterpretation
    case 'centerRight':
      return dataPoint.centerRightInterpretation
    case 'farRight':
      return dataPoint.farRightInterpretation
    default:
      return undefined
  }
}

/**
 * Get the appropriate CTA framing based on ideology
 */
export function getCTAFraming(
  cta: CallToAction,
  ideology: IdeologyType
): CTAFraming | undefined {
  switch (ideology) {
    case 'farLeft':
      return cta.farLeftFraming
    case 'centerLeft':
      return cta.centerLeftFraming
    case 'centerRight':
      return cta.centerRightFraming
    case 'farRight':
      return cta.farRightFraming
    default:
      return undefined
  }
}

/**
 * Check if a question's prerequisites are met
 */
export function checkPrerequisites(
  question: LayeredQuestion,
  userPersuasionScore: number,
  completedLayers: LayerType[],
  answeredQuestions: string[]
): boolean {
  const prereqs = question.prerequisites

  if (!prereqs) return true

  // Check minimum persuasion score
  if (
    prereqs.minPersuasionScore !== undefined &&
    userPersuasionScore < prereqs.minPersuasionScore
  ) {
    return false
  }

  // Check minimum layer completed
  if (prereqs.minLayer && prereqs.minLayer !== 'none') {
    const layerOrder = ['layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'layer6', 'layer7']
    const requiredLayerIndex = layerOrder.indexOf(prereqs.minLayer)

    const hasCompletedRequiredLayer = completedLayers.some((layer) => {
      const completedIndex = layerOrder.indexOf(layer)
      return completedIndex >= requiredLayerIndex
    })

    if (!hasCompletedRequiredLayer) return false
  }

  // Check required questions
  if (prereqs.requiredQuestions && prereqs.requiredQuestions.length > 0) {
    const requiredIds = prereqs.requiredQuestions.map((q) => q._id)
    const allAnswered = requiredIds.every((id) => answeredQuestions.includes(id))

    if (!allAnswered) return false
  }

  return true
}

/**
 * Check if a CTA should be shown to the user
 */
export function shouldShowCTA(
  cta: CallToAction,
  userPersuasionScore: number,
  completedLayers: LayerType[],
  displayCount: number
): boolean {
  // Check if active
  if (!cta.isActive) return false

  // Check date range
  const now = new Date()
  if (cta.startDate && new Date(cta.startDate) > now) return false
  if (cta.endDate && new Date(cta.endDate) < now) return false

  const metrics = cta.conversionMetrics
  if (!metrics) return true

  // Check persuasion score thresholds
  if (
    metrics.showIfPersuasionAbove !== undefined &&
    userPersuasionScore <= metrics.showIfPersuasionAbove
  ) {
    return false
  }

  if (
    metrics.showIfPersuasionBelow !== undefined &&
    userPersuasionScore >= metrics.showIfPersuasionBelow
  ) {
    return false
  }

  // Check layer completion
  if (metrics.showIfLayersCompleted && metrics.showIfLayersCompleted.length > 0) {
    const hasCompletedRequiredLayer = metrics.showIfLayersCompleted.some((layer) =>
      completedLayers.includes(layer)
    )
    if (!hasCompletedRequiredLayer) return false
  }

  // Check max displays
  if (metrics.maxDisplays && metrics.maxDisplays > 0 && displayCount >= metrics.maxDisplays) {
    return false
  }

  return true
}

/**
 * Get the layer number from layer ID
 */
export function getLayerNumber(layer: LayerType): number {
  return parseInt(layer.replace('layer', ''))
}

/**
 * Get the next layer
 */
export function getNextLayer(currentLayer: LayerType): LayerType | null {
  const currentNum = getLayerNumber(currentLayer)
  if (currentNum >= 7) return null
  return `layer${currentNum + 1}` as LayerType
}

/**
 * Get ideology-specific color palette
 */
export function getIdeologyColor(ideology: IdeologyType): string {
  switch (ideology) {
    case 'farLeft':
      return '#DC143C' // Crimson
    case 'centerLeft':
      return '#4169E1' // Royal Blue
    case 'centerRight':
      return '#B22222' // Firebrick
    case 'farRight':
      return '#8B0000' // Dark Red
    default:
      return '#6B7280' // Gray
  }
}
