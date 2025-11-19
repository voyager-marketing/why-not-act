import type {UserJourney, Theme, Answer, ConvictionScores, ResultType} from '@/types/form'
import {getResultType} from './resultRouter'
import {calculateConvictionScores} from './narrativeGenerator'
import {useJourneyStore} from './journeyStore'
import {useFormStore} from './formStore'

/**
 * Constructs a UserJourney object from the current journey store state
 * This bridges the gap between the new journeyStore and the PersonalizedResultHub components
 */
export function constructUserJourneyFromStore(): UserJourney {
  // Get data from the enhanced journey store
  const journeyState = useJourneyStore.getState()

  // Fallback to legacy formStore if journeyStore is not populated
  const formState = useFormStore.getState()

  // Determine which store has data
  const hasJourneyData = journeyState.responses.length > 0
  const hasFormData = Object.keys(formState.answers).length > 0

  if (!hasJourneyData && !hasFormData) {
    throw new Error('No journey data found. User must complete the questionnaire first.')
  }

  let journey: UserJourney

  if (hasJourneyData) {
    // Use new journey store data
    const theme = (journeyState.politicalLens || 'center-left') as Theme

    // Convert journey store responses to simple answers object
    const answers: Record<number, Answer> = {}
    journeyState.responses.forEach((response, index) => {
      answers[index + 1] = response.answer
    })

    // Calculate score (simple sum)
    const score = journeyState.responses.reduce((total, response) => {
      return total + (response.answer === 'yes' ? 2 : response.answer === 'maybe' ? 1 : 0)
    }, 0)

    // Get result type
    const resultType = getResultType(score, theme)

    // Build key answers array
    const keyAnswers = journeyState.responses.map((response, index) => ({
      questionOrder: index + 1,
      answer: response.answer,
      topic: `Layer ${response.layer}`, // TODO: Get actual topic from question data
    }))

    // Use scores from journey store
    const convictionScores: ConvictionScores = {
      valueAlignment: Math.round(journeyState.scores.valueAlignment),
      dataAwareness: Math.round(journeyState.scores.dataAwareness),
      persuasionLevel: Math.round(journeyState.scores.persuasionLevel),
      engagementDepth: Math.round(journeyState.scores.engagementDepth),
    }

    journey = {
      theme,
      answers,
      score,
      resultType,
      convictionScores,
      completedAt: journeyState.startTime?.toISOString() || new Date().toISOString(),
      layersCompleted: journeyState.responses.length,
      keyAnswers,
    }
  } else {
    // Use legacy form store data
    const theme = (formState.theme || 'center-left') as Theme
    const answers = formState.answers
    const score = formState.score || Object.values(answers).reduce((total, answer) => {
      return total + (answer === 'yes' ? 2 : answer === 'maybe' ? 1 : 0)
    }, 0)

    const resultType = getResultType(score, theme)

    // Build key answers array from form store
    const keyAnswers = Object.entries(answers).map(([questionOrder, answer]) => ({
      questionOrder: parseInt(questionOrder),
      answer,
      topic: `Question ${questionOrder}`, // TODO: Get actual topic from question data
    }))

    // Initialize conviction scores
    const convictionScores: ConvictionScores = {
      valueAlignment: 0,
      dataAwareness: 0,
      persuasionLevel: 0,
      engagementDepth: 0,
    }

    journey = {
      theme,
      answers,
      score,
      resultType,
      convictionScores,
      completedAt: new Date().toISOString(),
      layersCompleted: Object.keys(answers).length,
      keyAnswers,
    }

    // Calculate conviction scores
    calculateConvictionScores(journey)
  }

  return journey
}

/**
 * Constructs a UserJourney from explicit parameters (useful for testing or manual construction)
 */
export function constructUserJourney(
  theme: Theme,
  answers: Record<number, Answer>,
  questions?: Array<{order: number; topic: string}>
): UserJourney {
  // Calculate score
  const score = Object.values(answers).reduce((total, answer) => {
    return total + (answer === 'yes' ? 2 : answer === 'maybe' ? 1 : 0)
  }, 0)

  // Get result type
  const resultType = getResultType(score, theme)

  // Build key answers
  const keyAnswers = Object.entries(answers).map(([questionOrder, answer]) => {
    const order = parseInt(questionOrder)
    const question = questions?.find(q => q.order === order)

    return {
      questionOrder: order,
      answer,
      topic: question?.topic || `Question ${order}`,
    }
  })

  // Initialize conviction scores
  const convictionScores: ConvictionScores = {
    valueAlignment: 0,
    dataAwareness: 0,
    persuasionLevel: 0,
    engagementDepth: 0,
  }

  const journey: UserJourney = {
    theme,
    answers,
    score,
    resultType,
    convictionScores,
    completedAt: new Date().toISOString(),
    layersCompleted: Object.keys(answers).length,
    keyAnswers,
  }

  // Calculate conviction scores
  calculateConvictionScores(journey)

  return journey
}

/**
 * Enriches a UserJourney with question topics from Sanity data
 */
export function enrichJourneyWithTopics(
  journey: UserJourney,
  questions: Array<{order: number; topic: string}>
): UserJourney {
  return {
    ...journey,
    keyAnswers: journey.keyAnswers.map(ka => {
      const question = questions.find(q => q.order === ka.questionOrder)
      return {
        ...ka,
        topic: question?.topic || ka.topic,
      }
    }),
  }
}
