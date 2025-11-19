/**
 * Example usage patterns for the journey store
 * These examples demonstrate how to use the enhanced journey tracking system
 */

import {useJourneyStore, useJourneyScores, usePoliticalLens} from './journeyStore'

// EXAMPLE 1: Basic initialization and lens selection
export function ExampleLensSelection() {
  const {politicalLens, setLens} = useJourneyStore()

  const handleLensSelection = (lens: 'far-left' | 'center-left' | 'center-right' | 'far-right') => {
    setLens(lens)
    console.log('Journey started with lens:', lens)
  }

  return {politicalLens, handleLensSelection}
}

// EXAMPLE 2: Recording a question response with timing
export function ExampleQuestionResponse() {
  const {recordResponse} = useJourneyStore()

  const handleAnswer = (
    questionId: string,
    answer: 'yes' | 'no' | 'maybe',
    startTime: Date
  ) => {
    const timeSpent = (Date.now() - startTime.getTime()) / 1000 // Convert to seconds

    // Persuasion weight should come from the question metadata
    // Higher weight = more important for persuasion scoring
    const persuasionWeight = 0.8

    recordResponse(questionId, answer, timeSpent, persuasionWeight)

    console.log('Response recorded:', {questionId, answer, timeSpent})
  }

  return {handleAnswer}
}

// EXAMPLE 3: Tracking data point engagement
export function ExampleDataPointTracking() {
  const {markDataPointViewed, seenDataPoints} = useJourneyStore()

  const handleDataPointView = (dataPointId: string) => {
    markDataPointViewed(dataPointId)
    console.log('Data points viewed:', seenDataPoints.length)
  }

  return {handleDataPointView, seenDataPoints}
}

// EXAMPLE 4: Layer progression
export function ExampleLayerProgression() {
  const {currentLayer, completedLayers, advanceLayer} = useJourneyStore()

  const handleLayerComplete = () => {
    advanceLayer()
    console.log('Advanced to next layer:', currentLayer)
    console.log('Completed layers:', completedLayers)
  }

  return {currentLayer, completedLayers, handleLayerComplete}
}

// EXAMPLE 5: Score calculation and display
export function ExampleScoreDisplay() {
  const scores = useJourneyScores()
  const {calculateScores} = useJourneyStore()

  // Recalculate scores manually if needed
  const refreshScores = () => {
    const newScores = calculateScores()
    console.log('Updated scores:', newScores)
  }

  return {
    scores,
    refreshScores,
    // Display scores with labels
    scoreDisplay: {
      'Value Alignment': `${Math.round(scores.valueAlignment)}%`,
      'Data Awareness': `${Math.round(scores.dataAwareness)}%`,
      'Persuasion Level': `${Math.round(scores.persuasionLevel)}%`,
      'Engagement Depth': `${Math.round(scores.engagementDepth)}%`,
    },
  }
}

// EXAMPLE 6: Conversion tracking
export function ExampleConversionTracking() {
  const {recordConversion, conversions} = useJourneyStore()

  const handleEmailSignup = (email: string) => {
    recordConversion('email_signup', {email})
    console.log('Email signup recorded:', email)
  }

  const handleSocialShare = (platform: string) => {
    recordConversion('social_share', {platform})
    console.log('Social share recorded:', platform)
  }

  const handleDonation = (amount: number) => {
    recordConversion('donation', {amount})
    console.log('Donation recorded:', amount)
  }

  return {
    handleEmailSignup,
    handleSocialShare,
    handleDonation,
    conversionCount: conversions.length,
  }
}

// EXAMPLE 7: Objection handling tracking
export function ExampleObjectionHandling() {
  const {recordObjection, objectionHandling} = useJourneyStore()

  const handleObjectionResponse = (
    objectionId: string,
    userWasConvinced: boolean,
    viewedCounterArgument: boolean
  ) => {
    recordObjection(objectionId, userWasConvinced, viewedCounterArgument)
    console.log('Objection recorded:', {
      objectionId,
      handled: userWasConvinced,
      counterArgumentViewed: viewedCounterArgument,
    })
  }

  // Calculate objection resolution rate
  const resolutionRate =
    objectionHandling.length > 0
      ? (objectionHandling.filter((o) => o.handled).length / objectionHandling.length) * 100
      : 0

  return {
    handleObjectionResponse,
    objectionHandling,
    resolutionRate: `${Math.round(resolutionRate)}%`,
  }
}

// EXAMPLE 8: Complete journey flow
export function ExampleCompleteJourney() {
  const store = useJourneyStore()

  const startJourney = (lens: 'far-left' | 'center-left' | 'center-right' | 'far-right') => {
    // 1. Reset if starting fresh
    store.reset()

    // 2. Set political lens
    store.setLens(lens)

    console.log('Journey started:', {
      sessionId: store.sessionId,
      lens: store.politicalLens,
      startTime: store.startTime,
    })
  }

  const completeQuestion = (
    questionId: string,
    answer: 'yes' | 'no' | 'maybe',
    timeSpent: number,
    persuasionWeight: number
  ) => {
    // Record the response
    store.recordResponse(questionId, answer, timeSpent, persuasionWeight)

    // Advance question index
    store.setCurrentQuestionIndex(store.currentQuestionIndex + 1)

    // Check scores
    const scores = store.calculateScores()
    console.log('Current scores:', scores)
  }

  const completeLayer = () => {
    // Advance to next layer
    store.advanceLayer()

    console.log('Layer completed:', {
      currentLayer: store.currentLayer,
      completedLayers: store.completedLayers,
    })
  }

  const finishJourney = (email: string) => {
    // Set email
    store.setEmail(email)

    // Record email signup conversion
    store.recordConversion('email_signup', {email})

    // Get final scores
    const finalScores = store.calculateScores()

    console.log('Journey completed:', {
      sessionId: store.sessionId,
      email: store.email,
      scores: finalScores,
      completedLayers: store.completedLayers,
      responses: store.responses.length,
      conversions: store.conversions.length,
    })

    return {
      sessionId: store.sessionId,
      scores: finalScores,
    }
  }

  return {
    startJourney,
    completeQuestion,
    completeLayer,
    finishJourney,
  }
}

// EXAMPLE 9: Analytics and insights
export function ExampleAnalytics() {
  const store = useJourneyStore()

  const getJourneyAnalytics = () => {
    const totalResponses = store.responses.length
    const averageTimePerQuestion =
      totalResponses > 0
        ? store.responses.reduce((sum, r) => sum + r.timeSpent, 0) / totalResponses
        : 0

    const responsesByLayer = store.responses.reduce(
      (acc, response) => {
        acc[response.layer] = (acc[response.layer] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const yesPercentage =
      totalResponses > 0
        ? (store.responses.filter((r) => r.answer === 'yes').length / totalResponses) * 100
        : 0

    return {
      totalResponses,
      averageTimePerQuestion: Math.round(averageTimePerQuestion),
      responsesByLayer,
      yesPercentage: Math.round(yesPercentage),
      dataPointsViewed: store.seenDataPoints.length,
      contentTriggered: store.triggeredContent.length,
      conversions: store.conversions.length,
      objections: store.objectionHandling.length,
      scores: store.scores,
    }
  }

  return {getJourneyAnalytics}
}

// EXAMPLE 10: Reset and session management
export function ExampleSessionManagement() {
  const {reset, generateSessionId, sessionId} = useJourneyStore()

  const startNewSession = () => {
    // Reset all state and generate new session ID
    reset()
    console.log('New session started:', sessionId)
  }

  const refreshSessionId = () => {
    // Generate new session ID without resetting data
    const newId = generateSessionId()
    console.log('Session ID refreshed:', newId)
    return newId
  }

  return {
    currentSessionId: sessionId,
    startNewSession,
    refreshSessionId,
  }
}
