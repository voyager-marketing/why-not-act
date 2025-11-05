/**
 * GROQ Query Examples for WhyNotAct Multi-Layered Question System
 *
 * Use these in your Sanity client or in Sanity Vision for testing
 */

import { groq } from 'next-sanity'

// ============================================================================
// Layered Question Queries
// ============================================================================

/**
 * Get all questions for a specific layer, ordered by display order
 */
export const getQuestionsByLayer = groq`
  *[_type == "layeredQuestion" && layer == $layer] | order(order asc) {
    _id,
    topic,
    coreQuestion,
    order,
    questionType,
    persuasionWeight,
    isGatekeeping,
    farLeftFraming,
    centerLeftFraming,
    centerRightFraming,
    farRightFraming,
    dataPoint,
    answerOptions,
    tags
  }
`

/**
 * Get a single question with ideology-specific framing
 * Variables: $questionId, $ideology
 */
export const getQuestionWithFraming = groq`
  *[_type == "layeredQuestion" && _id == $questionId][0] {
    _id,
    layer,
    topic,
    coreQuestion,
    context,
    questionType,
    persuasionWeight,
    isGatekeeping,

    "framing": select(
      $ideology == "farLeft" => farLeftFraming,
      $ideology == "centerLeft" => centerLeftFraming,
      $ideology == "centerRight" => centerRightFraming,
      $ideology == "farRight" => farRightFraming
    ),

    dataPoint,
    answerOptions,
    tags
  }
`

/**
 * Get questions that meet prerequisites
 * Variables: $targetLayer, $userScore, $completedLayers
 */
export const getEligibleQuestions = groq`
  *[_type == "layeredQuestion" &&
    layer == $targetLayer &&
    (
      !defined(prerequisites.minPersuasionScore) ||
      prerequisites.minPersuasionScore <= $userScore
    ) &&
    (
      !defined(prerequisites.minLayer) ||
      prerequisites.minLayer in $completedLayers
    )
  ] | order(order asc)
`

/**
 * Get the gatekeeping question for a layer
 * Variables: $layer, $ideology
 */
export const getGatekeepingQuestion = groq`
  *[_type == "layeredQuestion" &&
    layer == $layer &&
    isGatekeeping == true
  ][0] {
    _id,
    topic,
    coreQuestion,

    "framing": select(
      $ideology == "farLeft" => farLeftFraming,
      $ideology == "centerLeft" => centerLeftFraming,
      $ideology == "centerRight" => centerRightFraming,
      $ideology == "farRight" => farRightFraming
    ),

    answerOptions
  }
`

/**
 * Get all questions with their tags for filtering
 */
export const getAllQuestionsWithTags = groq`
  *[_type == "layeredQuestion"] | order(layer asc, order asc) {
    _id,
    layer,
    topic,
    tags
  }
`

/**
 * Get question count per layer
 */
export const getLayerQuestionCounts = groq`
  {
    "layer1": count(*[_type == "layeredQuestion" && layer == "layer1"]),
    "layer2": count(*[_type == "layeredQuestion" && layer == "layer2"]),
    "layer3": count(*[_type == "layeredQuestion" && layer == "layer3"]),
    "layer4": count(*[_type == "layeredQuestion" && layer == "layer4"]),
    "layer5": count(*[_type == "layeredQuestion" && layer == "layer5"]),
    "layer6": count(*[_type == "layeredQuestion" && layer == "layer6"]),
    "layer7": count(*[_type == "layeredQuestion" && layer == "layer7"])
  }
`

// ============================================================================
// Data Point Queries
// ============================================================================

/**
 * Get all data points by category
 * Variables: $category
 */
export const getDataPointsByCategory = groq`
  *[_type == "dataPoint" && category == $category] | order(_createdAt desc) {
    _id,
    statistic,
    neutralContext,
    source,
    sourceUrl,
    yearCollected,
    isVerified,
    visualization
  }
`

/**
 * Get a data point with ideology-specific interpretation
 * Variables: $dataPointId, $ideology
 */
export const getDataPointWithInterpretation = groq`
  *[_type == "dataPoint" && _id == $dataPointId][0] {
    _id,
    statistic,
    neutralContext,
    source,
    sourceUrl,
    yearCollected,
    visualization,

    "interpretation": select(
      $ideology == "farLeft" => farLeftInterpretation,
      $ideology == "centerLeft" => centerLeftInterpretation,
      $ideology == "centerRight" => centerRightInterpretation,
      $ideology == "farRight" => farRightInterpretation
    )
  }
`

/**
 * Get questions that reference a specific data point
 * Variables: $dataPointId
 */
export const getQuestionsUsingDataPoint = groq`
  *[_type == "dataPoint" && _id == $dataPointId][0] {
    statistic,
    neutralContext,
    "relatedQuestions": *[_type == "layeredQuestion" && references($dataPointId)] {
      _id,
      topic,
      layer,
      order
    }
  }
`

/**
 * Get all verified data points
 */
export const getVerifiedDataPoints = groq`
  *[_type == "dataPoint" && isVerified == true] | order(yearCollected desc) {
    _id,
    category,
    statistic,
    neutralContext,
    source,
    sourceUrl,
    yearCollected
  }
`

// ============================================================================
// Call to Action Queries
// ============================================================================

/**
 * Get eligible CTAs for a user
 * Variables: $userScore, $completedLayers, $currentTime
 */
export const getEligibleCTAs = groq`
  *[_type == "callToAction" &&
    isActive == true &&
    (
      !defined(conversionMetrics.showIfPersuasionAbove) ||
      conversionMetrics.showIfPersuasionAbove < $userScore
    ) &&
    (
      !defined(conversionMetrics.showIfPersuasionBelow) ||
      conversionMetrics.showIfPersuasionBelow > $userScore
    ) &&
    (
      !defined(startDate) || startDate <= $currentTime
    ) &&
    (
      !defined(endDate) || endDate >= $currentTime
    )
  ] | order(priority desc) {
    _id,
    actionType,
    title,
    priority,
    externalUrl,
    embedCode,
    farRightFraming,
    centerRightFraming,
    centerLeftFraming,
    farLeftFraming,
    conversionMetrics
  }
`

/**
 * Get CTA with ideology-specific framing
 * Variables: $ctaId, $ideology
 */
export const getCTAWithFraming = groq`
  *[_type == "callToAction" && _id == $ctaId][0] {
    _id,
    actionType,
    title,
    priority,
    externalUrl,
    embedCode,

    "framing": select(
      $ideology == "farLeft" => farLeftFraming,
      $ideology == "centerLeft" => centerLeftFraming,
      $ideology == "centerRight" => centerRightFraming,
      $ideology == "farRight" => farRightFraming
    ),

    conversionMetrics,
    successMetrics
  }
`

/**
 * Get CTAs by action type
 * Variables: $actionType
 */
export const getCTAsByType = groq`
  *[_type == "callToAction" &&
    actionType == $actionType &&
    isActive == true
  ] | order(priority desc) [0...3] {
    _id,
    title,
    priority,
    externalUrl,
    farRightFraming,
    centerRightFraming,
    centerLeftFraming,
    farLeftFraming
  }
`

/**
 * Get CTAs for completed layer
 * Variables: $completedLayer
 */
export const getCTAsForLayer = groq`
  *[_type == "callToAction" &&
    isActive == true &&
    $completedLayer in conversionMetrics.showIfLayersCompleted
  ] | order(priority desc) {
    _id,
    actionType,
    title,
    priority,
    farRightFraming,
    centerRightFraming,
    centerLeftFraming,
    farLeftFraming
  }
`

// ============================================================================
// Complete Page Queries
// ============================================================================

/**
 * Get everything needed for a question page
 * Variables: $questionId, $ideology, $currentLayer
 */
export const getCompleteQuestionPage = groq`
  {
    "question": *[_type == "layeredQuestion" && _id == $questionId][0] {
      _id,
      layer,
      topic,
      coreQuestion,
      context,
      questionType,
      persuasionWeight,
      isGatekeeping,

      "framing": select(
        $ideology == "farLeft" => farLeftFraming,
        $ideology == "centerLeft" => centerLeftFraming,
        $ideology == "centerRight" => centerRightFraming,
        $ideology == "farRight" => farRightFraming
      ),

      "dataPoint": select(
        defined(dataPoint.statistic) => {
          statistic: dataPoint.statistic,
          context: dataPoint.context,
          source: dataPoint.source,
          sourceUrl: dataPoint.sourceUrl
        }
      ),

      answerOptions
    },

    "ctas": *[_type == "callToAction" &&
      isActive == true &&
      $currentLayer in conversionMetrics.showIfLayersCompleted
    ] | order(priority desc) [0...2] {
      _id,
      actionType,
      "framing": select(
        $ideology == "farLeft" => farLeftFraming,
        $ideology == "centerLeft" => centerLeftFraming,
        $ideology == "centerRight" => centerRightFraming,
        $ideology == "farRight" => farRightFraming
      ),
      externalUrl
    },

    "layerProgress": {
      "currentLayerQuestions": count(*[_type == "layeredQuestion" && layer == $currentLayer]),
      "totalLayers": 7
    }
  }
`

/**
 * Get overview of all layers
 */
export const getLayerOverview = groq`
  {
    "layers": [
      {
        "id": "layer1",
        "name": "Surface Issue",
        "questionCount": count(*[_type == "layeredQuestion" && layer == "layer1"]),
        "hasGatekeeping": count(*[_type == "layeredQuestion" && layer == "layer1" && isGatekeeping == true]) > 0
      },
      {
        "id": "layer2",
        "name": "Immediate Concerns",
        "questionCount": count(*[_type == "layeredQuestion" && layer == "layer2"]),
        "hasGatekeeping": count(*[_type == "layeredQuestion" && layer == "layer2" && isGatekeeping == true]) > 0
      },
      {
        "id": "layer3",
        "name": "System Analysis",
        "questionCount": count(*[_type == "layeredQuestion" && layer == "layer3"]),
        "hasGatekeeping": count(*[_type == "layeredQuestion" && layer == "layer3" && isGatekeeping == true]) > 0
      },
      {
        "id": "layer4",
        "name": "Power Dynamics",
        "questionCount": count(*[_type == "layeredQuestion" && layer == "layer4"]),
        "hasGatekeeping": count(*[_type == "layeredQuestion" && layer == "layer4" && isGatekeeping == true]) > 0
      },
      {
        "id": "layer5",
        "name": "Root Causes",
        "questionCount": count(*[_type == "layeredQuestion" && layer == "layer5"]),
        "hasGatekeeping": count(*[_type == "layeredQuestion" && layer == "layer5" && isGatekeeping == true]) > 0
      },
      {
        "id": "layer6",
        "name": "Systemic Solutions",
        "questionCount": count(*[_type == "layeredQuestion" && layer == "layer6"]),
        "hasGatekeeping": count(*[_type == "layeredQuestion" && layer == "layer6" && isGatekeeping == true]) > 0
      },
      {
        "id": "layer7",
        "name": "Transformative Vision",
        "questionCount": count(*[_type == "layeredQuestion" && layer == "layer7"]),
        "hasGatekeeping": count(*[_type == "layeredQuestion" && layer == "layer7" && isGatekeeping == true]) > 0
      }
    ],
    "totalQuestions": count(*[_type == "layeredQuestion"]),
    "totalDataPoints": count(*[_type == "dataPoint"]),
    "totalCTAs": count(*[_type == "callToAction" && isActive == true])
  }
`

// ============================================================================
// Legacy Question Queries (Backward Compatibility)
// ============================================================================

/**
 * Get legacy questions (deprecated)
 */
export const getLegacyQuestions = groq`
  *[_type == "question"] | order(order asc) {
    _id,
    order,
    topic,
    coreIdea,
    farLeftHeadline,
    farLeftBullets,
    midLeftHeadline,
    midLeftBullets,
    midRightHeadline,
    midRightBullets,
    farRightHeadline,
    farRightBullets
  }
`

// ============================================================================
// Export all queries
// ============================================================================

export const queries = {
  // Layered Questions
  getQuestionsByLayer,
  getQuestionWithFraming,
  getEligibleQuestions,
  getGatekeepingQuestion,
  getAllQuestionsWithTags,
  getLayerQuestionCounts,

  // Data Points
  getDataPointsByCategory,
  getDataPointWithInterpretation,
  getQuestionsUsingDataPoint,
  getVerifiedDataPoints,

  // CTAs
  getEligibleCTAs,
  getCTAWithFraming,
  getCTAsByType,
  getCTAsForLayer,

  // Complete Pages
  getCompleteQuestionPage,
  getLayerOverview,

  // Legacy
  getLegacyQuestions,
}

export default queries
