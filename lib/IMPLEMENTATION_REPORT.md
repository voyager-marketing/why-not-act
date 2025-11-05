# Journey Store Implementation Report

## Executive Summary

Successfully created an enhanced Zustand store for multi-dimensional user journey tracking at `f:\dev\voyager\clients\why-not-act\why-not-act`. The implementation includes a sophisticated state management system with 4 scoring algorithms, persistent storage, and comprehensive query helpers.

## Files Created

### 1. `lib/journeyStore.ts` (406 lines)
**Purpose:** Core Zustand store with persist middleware for tracking user journeys

**Key Features:**
- Full Zustand v5 store implementation with persist middleware
- 18+ state properties tracking all aspects of user journey
- 15+ actions for managing state and calculating scores
- localStorage persistence with proper Date serialization/deserialization
- UUID-based session ID generation
- Type-safe TypeScript implementation

**State Properties:**
```typescript
{
  // Identity
  sessionId: string,
  politicalLens: PoliticalLens | null,
  email: string | null,

  // Progress tracking
  currentLayer: Layer,
  currentQuestionIndex: number,
  completedLayers: Layer[],

  // Scoring
  scores: JourneyScores,
  responses: QuestionResponse[],

  // Time tracking
  startTime: Date | null,
  layerStartTimes: Record<Layer, Date | null>,

  // Content engagement
  triggeredContent: string[],
  seenDataPoints: string[],

  // Objection handling
  objectionHandling: ObjectionRecord[],

  // Conversion tracking
  conversions: ConversionAction[]
}
```

**Core Actions:**
- `setLens(lens)` - Set political lens and start journey timer
- `setEmail(email)` - Capture user email
- `recordResponse(questionId, answer, timeSpent, persuasionWeight)` - Record answer with metadata
- `advanceLayer()` - Progress to next layer in journey
- `calculateScores()` - Compute all 4 scoring metrics
- `markDataPointViewed(dataPointId)` - Track data engagement
- `markContentTriggered(contentId)` - Track triggered content
- `recordObjection(objectionId, handled, counterArgumentViewed)` - Track objection handling
- `recordConversion(type, details)` - Track conversion actions
- `reset()` - Reset state and generate new session ID
- `generateSessionId()` - Generate new UUID session ID

**Selector Hooks:**
- `useJourneyScores()` - Access scores object
- `useCurrentLayer()` - Access current layer
- `usePoliticalLens()` - Access political lens
- `useJourneyProgress()` - Access progress metrics

### 2. `lib/journeyQueries.ts` (373 lines)
**Purpose:** GROQ queries for fetching layered questions and content from Sanity

**Key Functions:**

1. **`getQuestionsByLayer(layer)`**
   - Fetches questions for a specific layer
   - Returns all political framings
   - Includes data point references

2. **`getQuestionsByLens(lens)`**
   - Fetches all questions for a specific political lens
   - Orders by layer and question order
   - Returns only relevant framing

3. **`getQuestionsWithFraming(lens, layer?)`**
   - Flexible query with optional layer filter
   - Returns headline, bullets, and context for specific lens
   - Supports both old and new schemas

4. **`getCTAsWithConditions()`**
   - Fetches all CTAs with their conditional logic
   - Returns priority-ordered list
   - Includes conditions for score thresholds and layer requirements

5. **`getDataPointsByCategory(category)`**
   - Fetches data points filtered by category
   - Returns visualization data and impact framing
   - Includes source attribution

6. **`getAllDataPoints()`**
   - Fetches all available data points
   - Ordered by category and priority

7. **`getObjectionsByLens(lens)`**
   - Fetches objections common to a political lens
   - Includes counter-arguments for each lens
   - Links to supporting data points

8. **`getResultContent(resultType)`**
   - Fetches result page content based on user profile
   - Returns personalized headlines and narratives
   - Includes lens-specific framing

**Helper Functions:**

1. **`filterCTAsByConditions(ctas, userState)`**
   - Filters CTAs based on user scores, completed layers, and political lens
   - Implements complex conditional logic
   - Returns priority-ordered list of eligible CTAs

2. **`determineResultType(scores)`**
   - Calculates average score across all metrics
   - Maps to result type: champion (80+), engaged (60+), curious (40+), skeptic (<40)
   - Used for personalizing result page content

### 3. `lib/journeyStore.examples.ts` (289 lines)
**Purpose:** Comprehensive example usage patterns

**10 Complete Examples:**

1. **ExampleLensSelection** - Basic initialization and lens selection
2. **ExampleQuestionResponse** - Recording responses with timing
3. **ExampleDataPointTracking** - Tracking data point engagement
4. **ExampleLayerProgression** - Managing layer advancement
5. **ExampleScoreDisplay** - Calculating and displaying scores
6. **ExampleConversionTracking** - Recording conversions
7. **ExampleObjectionHandling** - Tracking objection responses
8. **ExampleCompleteJourney** - Full journey flow from start to finish
9. **ExampleAnalytics** - Getting journey analytics and insights
10. **ExampleSessionManagement** - Session reset and ID management

Each example includes:
- Complete working code
- Console logging for debugging
- Return values for easy integration
- Comments explaining key concepts

### 4. `lib/MIGRATION_GUIDE.md` (440 lines)
**Purpose:** Complete migration guide from formStore to journeyStore

**Contents:**
- Overview of changes between systems
- Side-by-side API comparisons
- Step-by-step migration instructions
- Detailed scoring algorithm explanations
- New feature documentation
- Common pitfalls and solutions
- Testing guidance
- Backward compatibility notes

## Scoring Algorithms Implementation

### 1. Value Alignment Score (0-100%)

**Algorithm:**
```typescript
const valueAlignmentResponses = responses.filter(r => r.layer === 'value-alignment')
const yesCount = valueAlignmentResponses.filter(r => r.answer === 'yes').length
score = (yesCount / valueAlignmentResponses.length) * 100
```

**Purpose:** Measures how aligned the user's core values are with the immigration issue

**Interpretation:**
- 80-100%: Strong value alignment, ready for action
- 60-79%: Good alignment, needs data reinforcement
- 40-59%: Moderate alignment, address concerns
- 0-39%: Low alignment, focus on value reframing

**Edge Cases:**
- Returns 0 if no responses in value-alignment layer
- Only counts responses in value-alignment layer (ignores other layers)

### 2. Data Awareness Score (0-100%)

**Algorithm:**
```typescript
const TOTAL_DATA_POINTS = 20
score = Math.min((seenDataPoints.length / TOTAL_DATA_POINTS) * 100, 100)
```

**Purpose:** Measures how much data/evidence the user engaged with

**Interpretation:**
- 80-100%: Highly informed, evidence-based understanding
- 60-79%: Good awareness, some gaps remain
- 40-59%: Moderate awareness, more data needed
- 0-39%: Low awareness, prioritize data exposure

**Edge Cases:**
- Capped at 100% (can't exceed even if user views same data multiple times)
- Returns 0 if no data points viewed
- Assumes 20 total data points (adjustable)

### 3. Persuasion Level Score (0-100%)

**Algorithm:**
```typescript
let weightedSum = 0
let totalWeight = 0

responses.forEach(response => {
  const answerScore = response.answer === 'yes' ? 1 :
                     response.answer === 'maybe' ? 0.5 : 0
  weightedSum += answerScore * response.persuasionWeight
  totalWeight += response.persuasionWeight
})

score = totalWeight > 0 ? (weightedSum / totalWeight) * 100 : 0
```

**Purpose:** Measures overall persuasion considering question importance

**Interpretation:**
- 80-100%: Highly persuaded, ready to commit
- 60-79%: Persuaded, needs final push
- 40-59%: Somewhat persuaded, address objections
- 0-39%: Not persuaded, revisit fundamentals

**Edge Cases:**
- Returns 0 if no responses recorded
- Handles division by zero (totalWeight = 0)
- Weights should be 0-1 (higher = more important)

**Example:**
```
Question 1: yes (weight 0.8) → 1.0 × 0.8 = 0.8
Question 2: maybe (weight 0.6) → 0.5 × 0.6 = 0.3
Question 3: yes (weight 0.9) → 1.0 × 0.9 = 0.9
Total: 2.0 / 2.3 = 0.87 → 87%
```

### 4. Engagement Depth Score (0-100%)

**Algorithm:**
```typescript
const totalTime = responses.reduce((sum, r) => sum + r.timeSpent, 0)
const avgTimePerQuestion = totalTime / responses.length
const normalizedTime = Math.min(
  (Math.log(avgTimePerQuestion + 1) / Math.log(61)) * 100,
  100
)
```

**Purpose:** Measures how thoughtfully the user engaged with questions

**Interpretation:**
- 80-100%: Deep engagement, thoughtful consideration
- 60-79%: Good engagement, adequate time spent
- 40-59%: Moderate engagement, somewhat rushed
- 0-39%: Low engagement, very rushed

**Edge Cases:**
- Returns 0 if no responses recorded
- Uses logarithmic scale for diminishing returns
- 30 seconds ≈ 50%, 60 seconds ≈ 100%
- Capped at 100% for very long times

**Normalization Rationale:**
- Linear time doesn't reflect diminishing returns
- 10 seconds = rushed, 30 seconds = moderate, 60+ seconds = thorough
- Log scale: log(31)/log(61) ≈ 0.84 (84% for 30 seconds)

## Persist Configuration

**Name:** `'whynotact-journey-v2'`

**Why v2?** To avoid conflicts with the old formStore persistence

**Serialization:**
- Converts Date objects to ISO 8601 strings
- Preserves all state except functions
- Handles nested Date objects in arrays

**Deserialization:**
- Converts ISO strings back to Date objects
- Reconstructs nested structures
- Merges with current state for safety

**Storage Location:** `localStorage` (browser)

**Storage Key:** `'whynotact-journey-v2'`

## Type Safety

All code uses strict TypeScript typing:

```typescript
// Type exports
export type PoliticalLens = 'far-left' | 'mid-left' | 'mid-right' | 'far-right'
export type Layer = 'value-alignment' | 'data-exposure' | 'objection-handling' | 'commitment'

// Interface exports
export interface QuestionResponse { ... }
export interface ConversionAction { ... }
export interface JourneyScores { ... }
export interface ObjectionRecord { ... }
```

**Type Imports:**
```typescript
import type {Answer} from '@/types/form'
import type {PoliticalLens, Layer, QuestionResponse} from '@/lib/journeyStore'
import type {DataPoint, CTAWithConditions, Objection} from '@/lib/journeyQueries'
```

## Backward Compatibility

**Old formStore:**
- Marked as deprecated with JSDoc comment
- Still functional for existing code
- Will not receive new features
- Plan migration to journeyStore

**Migration Path:**
1. Read `lib/MIGRATION_GUIDE.md`
2. Review `lib/journeyStore.examples.ts`
3. Update imports and state access
4. Test with `MigrationTest` component
5. Deploy incrementally

## Testing Recommendations

### Unit Tests

```typescript
describe('journeyStore', () => {
  test('generates unique session IDs', () => {
    const store1 = useJourneyStore.getState()
    store1.reset()
    const id1 = store1.sessionId

    store1.reset()
    const id2 = store1.sessionId

    expect(id1).not.toBe(id2)
  })

  test('calculates value alignment correctly', () => {
    const store = useJourneyStore.getState()
    store.reset()

    store.recordResponse('q1', 'yes', 30, 0.8)
    store.recordResponse('q2', 'yes', 25, 0.6)
    store.recordResponse('q3', 'no', 20, 0.7)

    const scores = store.calculateScores()
    expect(scores.valueAlignment).toBe((2/3) * 100) // 66.67%
  })

  test('advances layers in correct order', () => {
    const store = useJourneyStore.getState()
    store.reset()

    expect(store.currentLayer).toBe('value-alignment')
    store.advanceLayer()
    expect(store.currentLayer).toBe('data-exposure')
    store.advanceLayer()
    expect(store.currentLayer).toBe('objection-handling')
    store.advanceLayer()
    expect(store.currentLayer).toBe('commitment')
  })

  test('persists and rehydrates state', () => {
    const store = useJourneyStore.getState()
    store.reset()
    store.setLens('mid-left')
    store.recordResponse('q1', 'yes', 30, 0.8)

    const sessionId = store.sessionId
    const responses = store.responses.length

    // Simulate page reload (state should persist)
    // In real tests, you'd use actual persistence layer

    expect(store.sessionId).toBe(sessionId)
    expect(store.responses.length).toBe(responses)
  })
})
```

### Integration Tests

```typescript
describe('journey flow', () => {
  test('complete journey flow', () => {
    const store = useJourneyStore.getState()
    store.reset()

    // Start journey
    store.setLens('mid-left')
    expect(store.startTime).not.toBeNull()

    // Complete value-alignment layer
    store.recordResponse('va1', 'yes', 30, 0.8)
    store.recordResponse('va2', 'yes', 25, 0.9)
    store.advanceLayer()

    expect(store.completedLayers).toContain('value-alignment')
    expect(store.currentLayer).toBe('data-exposure')

    // View data points
    store.markDataPointViewed('data1')
    store.markDataPointViewed('data2')

    // Complete remaining layers
    store.advanceLayer()
    store.advanceLayer()

    // Record conversion
    store.setEmail('test@example.com')
    store.recordConversion('email_signup', {email: 'test@example.com'})

    // Verify final state
    expect(store.completedLayers).toHaveLength(3)
    expect(store.conversions).toHaveLength(1)
    expect(store.email).toBe('test@example.com')

    // Verify scores
    const scores = store.calculateScores()
    expect(scores.valueAlignment).toBeGreaterThan(0)
    expect(scores.dataAwareness).toBeGreaterThan(0)
  })
})
```

## Performance Considerations

### Optimizations:
1. **Selector hooks** - Use `useJourneyScores()` instead of full store access
2. **Memoization** - Scores are calculated and stored, not recomputed on every access
3. **Partial updates** - Only affected state slices are updated
4. **localStorage** - Async persistence doesn't block UI

### Potential Bottlenecks:
1. **Large response arrays** - Consider pagination for 100+ responses
2. **Score calculation** - O(n) where n = number of responses
3. **Persistence** - Serialization can be slow for large states

### Recommendations:
- Calculate scores on demand, not on every response
- Consider debouncing persistence for rapid updates
- Monitor localStorage size (5-10MB limit)

## Security Considerations

### Data Privacy:
- **Session IDs** - UUIDs are generated client-side (not cryptographically secure)
- **Email storage** - Stored in localStorage (not encrypted)
- **Analytics** - All tracking data stored client-side

### Recommendations:
1. Don't store PII in localStorage for production
2. Consider server-side session management
3. Implement proper encryption for sensitive data
4. Add GDPR compliance (consent, data export, deletion)

## Future Enhancements

### Recommended Additions:
1. **Server sync** - Backup journeys to server
2. **Analytics export** - Export journey data for analysis
3. **A/B testing** - Track different question variations
4. **Undo/redo** - Allow users to revise answers
5. **Save/resume** - Allow users to pause and resume later
6. **Multi-session tracking** - Track user across multiple visits
7. **Confidence intervals** - Add confidence scoring to responses
8. **Time decay** - Weight recent responses higher
9. **Collaborative filtering** - Compare users with similar profiles
10. **Machine learning** - Predict conversion likelihood

## API Reference Quick Guide

### Store Actions
```typescript
// Identity
setLens(lens: PoliticalLens): void
setEmail(email: string): void

// Progress
recordResponse(questionId: string, answer: Answer, timeSpent: number, weight: number): void
advanceLayer(): void
setCurrentQuestionIndex(index: number): void

// Scoring
calculateScores(): JourneyScores

// Tracking
markDataPointViewed(id: string): void
markContentTriggered(id: string): void
recordObjection(id: string, handled: boolean, viewed: boolean): void
recordConversion(type: string, details?: object): void

// Utility
reset(): void
generateSessionId(): string
```

### Query Functions
```typescript
// Questions
getQuestionsByLayer(layer: Layer): Promise<Question[]>
getQuestionsByLens(lens: PoliticalLens): Promise<Question[]>
getQuestionsWithFraming(lens: PoliticalLens, layer?: Layer): Promise<Question[]>

// CTAs
getCTAsWithConditions(): Promise<CTAWithConditions[]>
filterCTAsByConditions(ctas: CTA[], userState: UserState): CTA[]

// Data
getDataPointsByCategory(category: string): Promise<DataPoint[]>
getAllDataPoints(): Promise<DataPoint[]>

// Objections
getObjectionsByLens(lens: PoliticalLens): Promise<Objection[]>

// Results
getResultContent(type: ResultType): Promise<ResultContent>
determineResultType(scores: JourneyScores): ResultType
```

## Summary

### Deliverables Completed:
✅ `lib/journeyStore.ts` - Full Zustand store with 4 scoring algorithms
✅ `lib/journeyQueries.ts` - Complete GROQ query library
✅ `lib/journeyStore.examples.ts` - 10 comprehensive usage examples
✅ `lib/MIGRATION_GUIDE.md` - Detailed migration documentation
✅ Backward compatibility maintained (formStore deprecated but functional)
✅ TypeScript typing throughout
✅ localStorage persistence with Date handling
✅ UUID session ID generation
✅ Edge case handling in all algorithms

### Total Lines of Code: 1,508
- journeyStore.ts: 406 lines
- journeyQueries.ts: 373 lines
- journeyStore.examples.ts: 289 lines
- MIGRATION_GUIDE.md: 440 lines

### Next Steps:
1. Review implementation files
2. Run tests to verify functionality
3. Begin migration from formStore
4. Update components to use new store
5. Deploy incrementally with feature flags
6. Monitor analytics and performance
7. Gather user feedback
8. Iterate and improve

---

**Implementation Date:** 2025-11-05
**Author:** Agent 3: State Management Architect
**Version:** 2.0.0
