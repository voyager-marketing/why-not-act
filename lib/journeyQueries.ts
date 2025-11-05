import {groq} from 'next-sanity'
import {client} from './sanity.client'
import type {PoliticalLens, Layer} from './journeyStore'

/**
 * GROQ queries for fetching layered questions and content
 * Supports the 4-layer persuasion architecture
 */

// Query for fetching layered questions by layer
export async function getQuestionsByLayer(layer: Layer) {
  const query = groq`*[_type == "layeredQuestion" && layer == $layer] | order(order asc) {
    _id,
    order,
    layer,
    topic,
    coreIdea,
    persuasionWeight,
    "farLeft": {
      "headline": farLeftHeadline,
      "bullets": farLeftBullets,
      "context": farLeftContext
    },
    "midLeft": {
      "headline": midLeftHeadline,
      "bullets": midLeftBullets,
      "context": midLeftContext
    },
    "midRight": {
      "headline": midRightHeadline,
      "bullets": midRightBullets,
      "context": midRightContext
    },
    "farRight": {
      "headline": farRightHeadline,
      "bullets": farRightBullets,
      "context": farRightContext
    },
    dataPointReferences[]->
  }`

  return client.fetch(query, {layer})
}

// Query for fetching all questions for a specific political lens
export async function getQuestionsByLens(lens: PoliticalLens) {
  const query = groq`*[_type == "layeredQuestion"] | order(layer asc, order asc) {
    _id,
    order,
    layer,
    topic,
    coreIdea,
    persuasionWeight,
    "framing": select(
      $lens == "far-left" => {
        "headline": farLeftHeadline,
        "bullets": farLeftBullets,
        "context": farLeftContext
      },
      $lens == "mid-left" => {
        "headline": midLeftHeadline,
        "bullets": midLeftBullets,
        "context": midLeftContext
      },
      $lens == "mid-right" => {
        "headline": midRightHeadline,
        "bullets": midRightBullets,
        "context": midRightContext
      },
      $lens == "far-right" => {
        "headline": farRightHeadline,
        "bullets": farRightBullets,
        "context": farRightContext
      }
    ),
    dataPointReferences[]->
  }`

  return client.fetch(query, {lens})
}

// Query for fetching questions with lens framing (supports both old and new schemas)
export async function getQuestionsWithFraming(lens: PoliticalLens, layer?: Layer) {
  const layerFilter = layer ? '&& layer == $layer' : ''

  const query = groq`*[_type == "layeredQuestion" ${layerFilter}] | order(order asc) {
    _id,
    order,
    layer,
    topic,
    coreIdea,
    persuasionWeight,
    "headline": select(
      $lens == "far-left" => farLeftHeadline,
      $lens == "mid-left" => midLeftHeadline,
      $lens == "mid-right" => midRightHeadline,
      $lens == "far-right" => farRightHeadline
    ),
    "bullets": select(
      $lens == "far-left" => farLeftBullets,
      $lens == "mid-left" => midLeftBullets,
      $lens == "mid-right" => midRightBullets,
      $lens == "far-right" => farRightBullets
    ),
    "context": select(
      $lens == "far-left" => farLeftContext,
      $lens == "mid-left" => midLeftContext,
      $lens == "mid-right" => midRightContext,
      $lens == "far-right" => farRightContext
    ),
    dataPointReferences[]->
  }`

  return client.fetch(query, {lens, layer})
}

// Query for fetching CTAs with conditional logic based on user scores
export interface CTAWithConditions {
  _id: string
  title: string
  description: string
  actionType: 'email_signup' | 'social_share' | 'donation' | 'petition_sign' | 'contact_rep'
  priority: number
  conditions: {
    minValueAlignment?: number
    minDataAwareness?: number
    minPersuasionLevel?: number
    minEngagementDepth?: number
    requiredLayers?: Layer[]
    politicalLens?: PoliticalLens[]
  }
  buttonText: string
  url?: string
  emailTemplate?: string
  socialShareText?: string
}

export async function getCTAsWithConditions() {
  const query = groq`*[_type == "callToAction"] | order(priority desc) {
    _id,
    title,
    description,
    actionType,
    priority,
    conditions {
      minValueAlignment,
      minDataAwareness,
      minPersuasionLevel,
      minEngagementDepth,
      requiredLayers,
      politicalLens
    },
    buttonText,
    url,
    emailTemplate,
    socialShareText
  }`

  return client.fetch<CTAWithConditions[]>(query)
}

// Query for fetching data points by category
export interface DataPoint {
  _id: string
  title: string
  category: 'revenue' | 'economic' | 'security' | 'demographic' | 'environmental' | 'healthcare'
  statistic: string
  source: string
  sourceUrl?: string
  visualizationType?: 'chart' | 'map' | 'infographic' | 'comparison'
  visualizationData?: unknown
  narrative?: string
  impactFraming?: {
    farLeft?: string
    midLeft?: string
    midRight?: string
    farRight?: string
  }
}

export async function getDataPointsByCategory(category: DataPoint['category']) {
  const query = groq`*[_type == "dataPoint" && category == $category] | order(priority desc) {
    _id,
    title,
    category,
    statistic,
    source,
    sourceUrl,
    visualizationType,
    visualizationData,
    narrative,
    impactFraming {
      farLeft,
      midLeft,
      midRight,
      farRight
    }
  }`

  return client.fetch<DataPoint[]>(query, {category})
}

// Query for fetching all data points
export async function getAllDataPoints() {
  const query = groq`*[_type == "dataPoint"] | order(category asc, priority desc) {
    _id,
    title,
    category,
    statistic,
    source,
    sourceUrl,
    visualizationType,
    visualizationData,
    narrative,
    impactFraming {
      farLeft,
      midLeft,
      midRight,
      farRight
    }
  }`

  return client.fetch<DataPoint[]>(query)
}

// Query for fetching objections with counter-arguments
export interface Objection {
  _id: string
  objectionText: string
  category: 'economic' | 'security' | 'cultural' | 'practical'
  commonAmongLenses: PoliticalLens[]
  counterArguments: {
    farLeft?: string
    midLeft?: string
    midRight?: string
    farRight?: string
  }
  dataPointReferences?: DataPoint[]
  priority: number
}

export async function getObjectionsByLens(lens: PoliticalLens) {
  const query = groq`*[_type == "objection" && $lens in commonAmongLenses] | order(priority desc) {
    _id,
    objectionText,
    category,
    commonAmongLenses,
    counterArguments {
      farLeft,
      midLeft,
      midRight,
      farRight
    },
    dataPointReferences[]-> {
      _id,
      title,
      statistic,
      source
    },
    priority
  }`

  return client.fetch<Objection[]>(query, {lens})
}

// Query for fetching personalized result page content
export interface ResultContent {
  _id: string
  resultType: 'champion' | 'engaged' | 'curious' | 'skeptic'
  headline: string
  subheadline: string
  narrativeTemplate: string
  suggestedActions: string[]
  dataHighlights: string[]
  framingByLens: {
    farLeft?: string
    midLeft?: string
    midRight?: string
    farRight?: string
  }
}

export async function getResultContent(resultType: ResultContent['resultType']) {
  const query = groq`*[_type == "resultContent" && resultType == $resultType][0] {
    _id,
    resultType,
    headline,
    subheadline,
    narrativeTemplate,
    suggestedActions,
    dataHighlights,
    framingByLens {
      farLeft,
      midLeft,
      midRight,
      farRight
    }
  }`

  return client.fetch<ResultContent>(query, {resultType})
}

// Helper function to determine which CTAs to show based on user journey
export function filterCTAsByConditions(
  ctas: CTAWithConditions[],
  userState: {
    scores: {
      valueAlignment: number
      dataAwareness: number
      persuasionLevel: number
      engagementDepth: number
    }
    completedLayers: Layer[]
    politicalLens: PoliticalLens | null
  }
): CTAWithConditions[] {
  return ctas.filter((cta) => {
    const {conditions} = cta

    // Check score thresholds
    if (conditions.minValueAlignment && userState.scores.valueAlignment < conditions.minValueAlignment) {
      return false
    }
    if (conditions.minDataAwareness && userState.scores.dataAwareness < conditions.minDataAwareness) {
      return false
    }
    if (conditions.minPersuasionLevel && userState.scores.persuasionLevel < conditions.minPersuasionLevel) {
      return false
    }
    if (conditions.minEngagementDepth && userState.scores.engagementDepth < conditions.minEngagementDepth) {
      return false
    }

    // Check required layers
    if (conditions.requiredLayers && conditions.requiredLayers.length > 0) {
      const hasAllRequiredLayers = conditions.requiredLayers.every((layer) =>
        userState.completedLayers.includes(layer)
      )
      if (!hasAllRequiredLayers) {
        return false
      }
    }

    // Check political lens
    if (conditions.politicalLens && conditions.politicalLens.length > 0 && userState.politicalLens) {
      if (!conditions.politicalLens.includes(userState.politicalLens)) {
        return false
      }
    }

    return true
  })
}

// Helper function to determine result type based on scores
export function determineResultType(scores: {
  valueAlignment: number
  dataAwareness: number
  persuasionLevel: number
  engagementDepth: number
}): ResultContent['resultType'] {
  const avgScore = (
    scores.valueAlignment +
    scores.dataAwareness +
    scores.persuasionLevel +
    scores.engagementDepth
  ) / 4

  if (avgScore >= 80) return 'champion'
  if (avgScore >= 60) return 'engaged'
  if (avgScore >= 40) return 'curious'
  return 'skeptic'
}
