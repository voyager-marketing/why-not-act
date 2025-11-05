import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import type {Answer} from '@/types/form'

/**
 * Enhanced Zustand store for multi-dimensional user journey tracking
 * Implements 4-layer persuasion architecture with advanced scoring algorithms
 */

// Types for the journey store
export type PoliticalLens = 'far-left' | 'mid-left' | 'mid-right' | 'far-right'
export type Layer = 'value-alignment' | 'data-exposure' | 'objection-handling' | 'commitment'

export interface QuestionResponse {
  questionId: string
  answer: Answer
  timeSpent: number // seconds spent on this question
  persuasionWeight: number // 0-1 value indicating importance of this question
  layer: Layer
  timestamp: Date
}

export interface ConversionAction {
  type: 'email_signup' | 'social_share' | 'donation' | 'petition_sign' | 'contact_rep'
  timestamp: Date
  details?: Record<string, unknown>
}

export interface JourneyScores {
  valueAlignment: number // 0-100: % of "yes" answers in value-alignment layer
  dataAwareness: number // 0-100: count of data points viewed / total * 100
  persuasionLevel: number // 0-100: weighted average based on persuasionWeight
  engagementDepth: number // 0-100: time-based (avg time per question normalized)
}

export interface ObjectionRecord {
  objectionId: string
  handled: boolean
  counterArgumentViewed: boolean
  timestamp: Date
}

interface JourneyState {
  // Identity
  sessionId: string
  politicalLens: PoliticalLens | null
  email: string | null

  // Progress tracking
  currentLayer: Layer
  currentQuestionIndex: number
  completedLayers: Layer[]

  // Scoring
  scores: JourneyScores
  responses: QuestionResponse[]

  // Time tracking
  startTime: Date | null
  layerStartTimes: Record<Layer, Date | null>

  // Content engagement
  triggeredContent: string[] // IDs of content/CTAs that were triggered
  seenDataPoints: string[] // IDs of data visualizations viewed

  // Objection handling
  objectionHandling: ObjectionRecord[]

  // Conversion tracking
  conversions: ConversionAction[]
}

interface JourneyActions {
  // Identity actions
  setLens: (lens: PoliticalLens) => void
  setEmail: (email: string) => void

  // Progress actions
  recordResponse: (
    questionId: string,
    answer: Answer,
    timeSpent: number,
    persuasionWeight: number
  ) => void
  advanceLayer: () => void
  setCurrentQuestionIndex: (index: number) => void

  // Scoring actions
  calculateScores: () => JourneyScores

  // Content tracking
  markDataPointViewed: (dataPointId: string) => void
  markContentTriggered: (contentId: string) => void

  // Objection handling
  recordObjection: (objectionId: string, handled: boolean, counterArgumentViewed: boolean) => void

  // Conversion tracking
  recordConversion: (type: ConversionAction['type'], details?: Record<string, unknown>) => void

  // Utility actions
  reset: () => void
  generateSessionId: () => string
}

type JourneyStore = JourneyState & JourneyActions

// Initial state
const initialState: JourneyState = {
  sessionId: '',
  politicalLens: null,
  email: null,
  currentLayer: 'value-alignment',
  currentQuestionIndex: 0,
  completedLayers: [],
  scores: {
    valueAlignment: 0,
    dataAwareness: 0,
    persuasionLevel: 0,
    engagementDepth: 0,
  },
  responses: [],
  startTime: null,
  layerStartTimes: {
    'value-alignment': null,
    'data-exposure': null,
    'objection-handling': null,
    'commitment': null,
  },
  triggeredContent: [],
  seenDataPoints: [],
  objectionHandling: [],
  conversions: [],
}

// Helper function to generate UUID
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// Layer progression order
const layerOrder: Layer[] = ['value-alignment', 'data-exposure', 'objection-handling', 'commitment']

export const useJourneyStore = create<JourneyStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Generate session ID on first load
      sessionId: generateUUID(),

      // Identity actions
      setLens: (lens) => {
        set({politicalLens: lens})

        // Start the journey timer if not already started
        const state = get()
        if (!state.startTime) {
          set({startTime: new Date()})
        }
      },

      setEmail: (email) => set({email}),

      // Progress actions
      recordResponse: (questionId, answer, timeSpent, persuasionWeight) => {
        const state = get()
        const response: QuestionResponse = {
          questionId,
          answer,
          timeSpent,
          persuasionWeight,
          layer: state.currentLayer,
          timestamp: new Date(),
        }

        set({responses: [...state.responses, response]})

        // Recalculate scores after each response
        get().calculateScores()
      },

      advanceLayer: () => {
        const state = get()
        const currentIndex = layerOrder.indexOf(state.currentLayer)

        // Mark current layer as completed
        if (!state.completedLayers.includes(state.currentLayer)) {
          set({
            completedLayers: [...state.completedLayers, state.currentLayer],
          })
        }

        // Move to next layer if available
        if (currentIndex < layerOrder.length - 1) {
          const nextLayer = layerOrder[currentIndex + 1]
          const now = new Date()

          set({
            currentLayer: nextLayer,
            currentQuestionIndex: 0,
            layerStartTimes: {
              ...state.layerStartTimes,
              [nextLayer]: now,
            },
          })
        }
      },

      setCurrentQuestionIndex: (index) => set({currentQuestionIndex: index}),

      // Scoring algorithm implementations
      calculateScores: () => {
        const state = get()
        const scores: JourneyScores = {
          valueAlignment: 0,
          dataAwareness: 0,
          persuasionLevel: 0,
          engagementDepth: 0,
        }

        // 1. Value Alignment: % of "yes" answers in value-alignment layer
        const valueAlignmentResponses = state.responses.filter(
          (r) => r.layer === 'value-alignment'
        )
        if (valueAlignmentResponses.length > 0) {
          const yesCount = valueAlignmentResponses.filter((r) => r.answer === 'yes').length
          scores.valueAlignment = (yesCount / valueAlignmentResponses.length) * 100
        }

        // 2. Data Awareness: count of data points viewed / estimated total * 100
        // Assuming 20 total data points available (adjust based on actual content)
        const TOTAL_DATA_POINTS = 20
        scores.dataAwareness = Math.min(
          (state.seenDataPoints.length / TOTAL_DATA_POINTS) * 100,
          100
        )

        // 3. Persuasion Level: weighted average based on persuasionWeight
        if (state.responses.length > 0) {
          let weightedSum = 0
          let totalWeight = 0

          state.responses.forEach((response) => {
            // Convert answer to score: yes=1, maybe=0.5, no=0
            const answerScore = response.answer === 'yes' ? 1 : response.answer === 'maybe' ? 0.5 : 0
            weightedSum += answerScore * response.persuasionWeight
            totalWeight += response.persuasionWeight
          })

          scores.persuasionLevel = totalWeight > 0 ? (weightedSum / totalWeight) * 100 : 0
        }

        // 4. Engagement Depth: time-based (avg time per question normalized)
        if (state.responses.length > 0) {
          const totalTime = state.responses.reduce((sum, r) => sum + r.timeSpent, 0)
          const avgTimePerQuestion = totalTime / state.responses.length

          // Normalize: 30 seconds = 50%, 60 seconds = 100%, with diminishing returns
          // Using logarithmic scale for better distribution
          const normalizedTime = Math.min(
            (Math.log(avgTimePerQuestion + 1) / Math.log(61)) * 100,
            100
          )
          scores.engagementDepth = normalizedTime
        }

        set({scores})
        return scores
      },

      // Content tracking
      markDataPointViewed: (dataPointId) => {
        const state = get()
        if (!state.seenDataPoints.includes(dataPointId)) {
          set({seenDataPoints: [...state.seenDataPoints, dataPointId]})
          // Recalculate scores after viewing data
          get().calculateScores()
        }
      },

      markContentTriggered: (contentId) => {
        const state = get()
        if (!state.triggeredContent.includes(contentId)) {
          set({triggeredContent: [...state.triggeredContent, contentId]})
        }
      },

      // Objection handling
      recordObjection: (objectionId, handled, counterArgumentViewed) => {
        const state = get()
        const objection: ObjectionRecord = {
          objectionId,
          handled,
          counterArgumentViewed,
          timestamp: new Date(),
        }
        set({objectionHandling: [...state.objectionHandling, objection]})
      },

      // Conversion tracking
      recordConversion: (type, details = {}) => {
        const state = get()
        const conversion: ConversionAction = {
          type,
          timestamp: new Date(),
          details,
        }
        set({conversions: [...state.conversions, conversion]})
      },

      // Utility actions
      reset: () => {
        set({
          ...initialState,
          sessionId: generateUUID(), // Generate new session ID on reset
        })
      },

      generateSessionId: () => {
        const newSessionId = generateUUID()
        set({sessionId: newSessionId})
        return newSessionId
      },
    }),
    {
      name: 'whynotact-journey-v2',
      // Serialize Date objects properly
      partialize: (state) => ({
        ...state,
        startTime: state.startTime?.toISOString() ?? null,
        layerStartTimes: Object.entries(state.layerStartTimes).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value?.toISOString() ?? null,
          }),
          {} as Record<Layer, string | null>
        ),
        responses: state.responses.map((r) => ({
          ...r,
          timestamp: r.timestamp.toISOString(),
        })),
        objectionHandling: state.objectionHandling.map((o) => ({
          ...o,
          timestamp: o.timestamp.toISOString(),
        })),
        conversions: state.conversions.map((c) => ({
          ...c,
          timestamp: c.timestamp.toISOString(),
        })),
      }),
      // Deserialize Date objects properly
      merge: (persistedState, currentState) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const persisted = persistedState as any
        return {
          ...currentState,
          ...persisted,
          startTime: persisted.startTime ? new Date(persisted.startTime as string) : null,
          layerStartTimes: persisted.layerStartTimes
            ? Object.entries(persisted.layerStartTimes).reduce(
                (acc, [key, value]) => ({
                  ...acc,
                  [key]: value ? new Date(value as string) : null,
                }),
                {} as Record<Layer, Date | null>
              )
            : currentState.layerStartTimes,
          responses: persisted.responses
            ? persisted.responses.map((r: QuestionResponse & {timestamp: string}) => ({
                ...r,
                timestamp: new Date(r.timestamp),
              }))
            : currentState.responses,
          objectionHandling: persisted.objectionHandling
            ? persisted.objectionHandling.map((o: ObjectionRecord & {timestamp: string}) => ({
                ...o,
                timestamp: new Date(o.timestamp),
              }))
            : currentState.objectionHandling,
          conversions: persisted.conversions
            ? persisted.conversions.map((c: ConversionAction & {timestamp: string}) => ({
                ...c,
                timestamp: new Date(c.timestamp),
              }))
            : currentState.conversions,
        } as JourneyStore
      },
    }
  )
)

// Selector hooks for common operations
export const useJourneyScores = () => useJourneyStore((state) => state.scores)
export const useCurrentLayer = () => useJourneyStore((state) => state.currentLayer)
export const usePoliticalLens = () => useJourneyStore((state) => state.politicalLens)
export const useJourneyProgress = () =>
  useJourneyStore((state) => ({
    currentLayer: state.currentLayer,
    completedLayers: state.completedLayers,
    currentQuestionIndex: state.currentQuestionIndex,
  }))
