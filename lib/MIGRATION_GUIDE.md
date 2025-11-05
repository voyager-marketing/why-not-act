# Migration Guide: formStore to journeyStore

This guide helps you migrate from the legacy `formStore.ts` to the new `journeyStore.ts` which implements the enhanced 4-layer persuasion architecture.

## Overview of Changes

### Old System (formStore)
- Simple theme selection (far-left, mid-left, mid-right, far-right)
- Basic yes/no/maybe answers
- Single score calculation (sum of answer values)
- No time tracking
- No layer progression
- No conversion tracking

### New System (journeyStore)
- Political lens with session management
- 4-layer journey architecture (value-alignment, data-exposure, objection-handling, commitment)
- Multi-dimensional scoring (4 different metrics)
- Time tracking per question
- Data point engagement tracking
- Conversion and objection tracking
- Enhanced persistence with Date serialization

## Key Differences

### 1. State Structure

**Old (formStore):**
```typescript
{
  theme: 'far-left' | 'mid-left' | 'mid-right' | 'far-right' | null,
  answers: Record<number, 'yes' | 'no' | 'maybe'>,
  score: number
}
```

**New (journeyStore):**
```typescript
{
  sessionId: string,
  politicalLens: PoliticalLens | null,
  currentLayer: Layer,
  currentQuestionIndex: number,
  completedLayers: Layer[],
  scores: {
    valueAlignment: number,
    dataAwareness: number,
    persuasionLevel: number,
    engagementDepth: number
  },
  responses: QuestionResponse[],
  // ... and more
}
```

### 2. API Changes

#### Setting Theme/Lens

**Old:**
```typescript
const {setTheme} = useFormStore()
setTheme('far-left')
```

**New:**
```typescript
const {setLens} = useJourneyStore()
setLens('far-left')
```

#### Recording Answers

**Old:**
```typescript
const {setAnswer} = useFormStore()
setAnswer(1, 'yes')
```

**New:**
```typescript
const {recordResponse} = useJourneyStore()
recordResponse('question-id', 'yes', timeSpent, persuasionWeight)
```

#### Calculating Scores

**Old:**
```typescript
const {calculateScore, score} = useFormStore()
calculateScore()
console.log(score) // Single number
```

**New:**
```typescript
const {calculateScores, scores} = useJourneyStore()
calculateScores()
console.log(scores) // Object with 4 metrics
```

#### Resetting State

**Old:**
```typescript
const {reset} = useFormStore()
reset()
```

**New:**
```typescript
const {reset} = useJourneyStore()
reset() // Also generates new session ID
```

## Migration Steps

### Step 1: Update Imports

**Before:**
```typescript
import {useFormStore} from '@/lib/formStore'
```

**After:**
```typescript
import {useJourneyStore, useJourneyScores} from '@/lib/journeyStore'
```

### Step 2: Update Component Logic

**Before:**
```typescript
function MyComponent() {
  const {theme, setTheme, answers, setAnswer, score, calculateScore} = useFormStore()

  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme)
  }

  const handleAnswer = (questionId, answer) => {
    setAnswer(questionId, answer)
    calculateScore()
  }

  return <div>Score: {score}</div>
}
```

**After:**
```typescript
function MyComponent() {
  const {
    politicalLens,
    setLens,
    recordResponse,
    currentQuestionIndex,
    setCurrentQuestionIndex
  } = useJourneyStore()
  const scores = useJourneyScores()
  const [questionStartTime, setQuestionStartTime] = useState(new Date())

  const handleLensSelect = (lens) => {
    setLens(lens)
    setQuestionStartTime(new Date())
  }

  const handleAnswer = (questionId, answer, persuasionWeight) => {
    const timeSpent = (Date.now() - questionStartTime.getTime()) / 1000
    recordResponse(questionId, answer, timeSpent, persuasionWeight)
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setQuestionStartTime(new Date())
  }

  return (
    <div>
      <div>Value Alignment: {Math.round(scores.valueAlignment)}%</div>
      <div>Data Awareness: {Math.round(scores.dataAwareness)}%</div>
      <div>Persuasion Level: {Math.round(scores.persuasionLevel)}%</div>
      <div>Engagement Depth: {Math.round(scores.engagementDepth)}%</div>
    </div>
  )
}
```

### Step 3: Update Type Imports

**Before:**
```typescript
import type {Theme, Answer, FormState} from '@/types/form'
```

**After:**
```typescript
import type {Theme, Answer} from '@/types/form'
import type {PoliticalLens, Layer, QuestionResponse} from '@/lib/journeyStore'
```

### Step 4: Handle Layer Progression

The new system requires you to track layer progression:

```typescript
function QuestionFlow() {
  const {
    currentLayer,
    completedLayers,
    advanceLayer,
    currentQuestionIndex,
    setCurrentQuestionIndex
  } = useJourneyStore()

  const handleLayerComplete = () => {
    advanceLayer() // Moves to next layer
  }

  return (
    <div>
      <p>Current Layer: {currentLayer}</p>
      <p>Completed: {completedLayers.length}/4</p>
      {currentQuestionIndex === totalQuestionsInLayer && (
        <button onClick={handleLayerComplete}>Next Layer</button>
      )}
    </div>
  )
}
```

## Scoring Algorithms Explained

### 1. Value Alignment (0-100%)
**Formula:** (Number of "yes" answers in value-alignment layer / Total questions in layer) × 100

**Purpose:** Measures how aligned the user's core values are with the issue

**Example:**
- 5 questions in value-alignment layer
- User answers: yes, yes, maybe, yes, no
- Score: (3 / 5) × 100 = 60%

### 2. Data Awareness (0-100%)
**Formula:** (Number of data points viewed / Total available data points) × 100

**Purpose:** Measures how much data/evidence the user engaged with

**Example:**
- 20 total data points available
- User viewed 12 data points
- Score: (12 / 20) × 100 = 60%

### 3. Persuasion Level (0-100%)
**Formula:** Weighted average of answers based on persuasionWeight

**Purpose:** Measures overall persuasion considering question importance

**Calculation:**
```
For each response:
  answerScore = yes: 1, maybe: 0.5, no: 0
  weightedScore = answerScore × persuasionWeight

persuasionLevel = (sum of weightedScores / sum of weights) × 100
```

**Example:**
- Question 1: yes (weight 0.8) → 1 × 0.8 = 0.8
- Question 2: maybe (weight 0.6) → 0.5 × 0.6 = 0.3
- Question 3: yes (weight 0.9) → 1 × 0.9 = 0.9
- Sum: 2.0 / 2.3 × 100 = 87%

### 4. Engagement Depth (0-100%)
**Formula:** Logarithmic normalization of average time per question

**Purpose:** Measures how thoughtfully the user engaged with questions

**Calculation:**
```
avgTime = total time spent / number of responses
normalizedTime = (log(avgTime + 1) / log(61)) × 100
capped at 100%
```

**Example:**
- Total time: 300 seconds
- 10 questions answered
- Average: 30 seconds per question
- Score: (log(31) / log(61)) × 100 ≈ 84%

## New Features Available

### 1. Email Capture
```typescript
const {setEmail, email} = useJourneyStore()
setEmail('user@example.com')
```

### 2. Conversion Tracking
```typescript
const {recordConversion, conversions} = useJourneyStore()

recordConversion('email_signup', {email: 'user@example.com'})
recordConversion('social_share', {platform: 'twitter'})
recordConversion('donation', {amount: 50})
```

### 3. Data Point Tracking
```typescript
const {markDataPointViewed, seenDataPoints} = useJourneyStore()
markDataPointViewed('data-point-id')
console.log('Viewed:', seenDataPoints.length)
```

### 4. Objection Handling
```typescript
const {recordObjection, objectionHandling} = useJourneyStore()
recordObjection('objection-id', true, true)
```

### 5. Session Management
```typescript
const {sessionId, generateSessionId} = useJourneyStore()
console.log('Current session:', sessionId)
const newId = generateSessionId()
```

## Backward Compatibility

The old `formStore` is still available and will continue to work. However:

1. **Deprecated:** It's marked as deprecated and should not be used for new features
2. **Limited:** It lacks the advanced tracking and scoring capabilities
3. **Eventually removed:** Plan to migrate all code to use journeyStore

## Testing Your Migration

Create a simple test component to verify your migration:

```typescript
function MigrationTest() {
  const {
    politicalLens,
    setLens,
    recordResponse,
    scores,
    calculateScores
  } = useJourneyStore()

  const runTest = () => {
    // 1. Set lens
    setLens('mid-left')
    console.log('✓ Lens set:', politicalLens)

    // 2. Record some responses
    recordResponse('q1', 'yes', 30, 0.8)
    recordResponse('q2', 'maybe', 25, 0.6)
    recordResponse('q3', 'yes', 40, 0.9)
    console.log('✓ Responses recorded')

    // 3. Calculate scores
    const finalScores = calculateScores()
    console.log('✓ Scores calculated:', finalScores)

    // Verify all scores are numbers between 0-100
    Object.entries(finalScores).forEach(([key, value]) => {
      console.assert(
        typeof value === 'number' && value >= 0 && value <= 100,
        `${key} should be 0-100, got ${value}`
      )
    })

    console.log('✓ All tests passed!')
  }

  return <button onClick={runTest}>Run Migration Test</button>
}
```

## Common Pitfalls

### 1. Forgetting to Track Time
**Problem:** Not tracking time spent on questions
```typescript
// ❌ Wrong
recordResponse('q1', 'yes', 0, 0.8)
```

**Solution:** Always track start time
```typescript
// ✓ Right
const [startTime, setStartTime] = useState(new Date())
const timeSpent = (Date.now() - startTime.getTime()) / 1000
recordResponse('q1', 'yes', timeSpent, 0.8)
```

### 2. Using Question Numbers Instead of IDs
**Problem:** Using numeric IDs like the old system
```typescript
// ❌ Wrong
recordResponse(1, 'yes', 30, 0.8)
```

**Solution:** Use string IDs
```typescript
// ✓ Right
recordResponse('value-alignment-q1', 'yes', 30, 0.8)
```

### 3. Not Advancing Layers
**Problem:** Forgetting to call advanceLayer()
```typescript
// This will keep you stuck in the first layer
```

**Solution:** Call advanceLayer() when layer is complete
```typescript
// ✓ Right
if (currentQuestionIndex === questionsInLayer.length) {
  advanceLayer()
}
```

### 4. Expecting Single Score
**Problem:** Treating scores as a single number
```typescript
// ❌ Wrong
console.log('Score:', scores)
```

**Solution:** Access specific score metrics
```typescript
// ✓ Right
console.log('Value Alignment:', scores.valueAlignment)
console.log('Persuasion Level:', scores.persuasionLevel)
```

## Need Help?

- Review examples in `lib/journeyStore.examples.ts`
- Check the full API documentation in `lib/journeyStore.ts`
- Look at query patterns in `lib/journeyQueries.ts`
