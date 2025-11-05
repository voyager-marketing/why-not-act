# Journey Store Quick Start Guide

Get up and running with the enhanced journey tracking system in 5 minutes.

## Basic Usage

### 1. Import the store

```typescript
import {useJourneyStore, useJourneyScores} from '@/lib/journeyStore'
```

### 2. Start a journey

```typescript
function LensSelector() {
  const {setLens, politicalLens} = useJourneyStore()

  return (
    <div>
      <button onClick={() => setLens('far-left')}>Far Left</button>
      <button onClick={() => setLens('mid-left')}>Mid Left</button>
      <button onClick={() => setLens('mid-right')}>Mid Right</button>
      <button onClick={() => setLens('far-right')}>Far Right</button>
    </div>
  )
}
```

### 3. Record answers

```typescript
function QuestionCard({question}) {
  const {recordResponse, currentQuestionIndex, setCurrentQuestionIndex} = useJourneyStore()
  const [startTime] = useState(new Date())

  const handleAnswer = (answer: 'yes' | 'no' | 'maybe') => {
    const timeSpent = (Date.now() - startTime.getTime()) / 1000
    recordResponse(question.id, answer, timeSpent, question.persuasionWeight)
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  return (
    <div>
      <h2>{question.headline}</h2>
      <button onClick={() => handleAnswer('yes')}>Yes</button>
      <button onClick={() => handleAnswer('maybe')}>Maybe</button>
      <button onClick={() => handleAnswer('no')}>No</button>
    </div>
  )
}
```

### 4. Display scores

```typescript
function ScoreDisplay() {
  const scores = useJourneyScores()

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

### 5. Track conversions

```typescript
function EmailCapture() {
  const {setEmail, recordConversion} = useJourneyStore()
  const [emailValue, setEmailValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmail(emailValue)
    recordConversion('email_signup', {email: emailValue})
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        placeholder="Enter your email"
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}
```

## Complete Example

Here's a complete component that puts it all together:

```typescript
'use client'

import {useState} from 'react'
import {useJourneyStore, useJourneyScores} from '@/lib/journeyStore'

export function JourneyFlow() {
  const {
    politicalLens,
    setLens,
    recordResponse,
    currentLayer,
    advanceLayer,
    setEmail,
    recordConversion,
    reset,
  } = useJourneyStore()

  const scores = useJourneyScores()
  const [questionStartTime, setQuestionStartTime] = useState(new Date())

  // Step 1: Lens Selection
  if (!politicalLens) {
    return (
      <div>
        <h1>Select Your Political Perspective</h1>
        <div>
          <button onClick={() => {
            setLens('far-left')
            setQuestionStartTime(new Date())
          }}>
            Far Left
          </button>
          <button onClick={() => {
            setLens('mid-left')
            setQuestionStartTime(new Date())
          }}>
            Mid Left
          </button>
          <button onClick={() => {
            setLens('mid-right')
            setQuestionStartTime(new Date())
          }}>
            Mid Right
          </button>
          <button onClick={() => {
            setLens('far-right')
            setQuestionStartTime(new Date())
          }}>
            Far Right
          </button>
        </div>
      </div>
    )
  }

  // Step 2: Questions
  const handleAnswer = (answer: 'yes' | 'no' | 'maybe') => {
    const timeSpent = (Date.now() - questionStartTime.getTime()) / 1000
    recordResponse('question-id', answer, timeSpent, 0.8)
    setQuestionStartTime(new Date())
  }

  // Step 3: Show Scores
  return (
    <div>
      <h1>Your Journey</h1>
      <p>Current Layer: {currentLayer}</p>

      {/* Question UI */}
      <div>
        <h2>Question Headline</h2>
        <button onClick={() => handleAnswer('yes')}>Yes</button>
        <button onClick={() => handleAnswer('maybe')}>Maybe</button>
        <button onClick={() => handleAnswer('no')}>No</button>
      </div>

      {/* Score Display */}
      <div>
        <h3>Your Scores</h3>
        <div>Value Alignment: {Math.round(scores.valueAlignment)}%</div>
        <div>Data Awareness: {Math.round(scores.dataAwareness)}%</div>
        <div>Persuasion Level: {Math.round(scores.persuasionLevel)}%</div>
        <div>Engagement Depth: {Math.round(scores.engagementDepth)}%</div>
      </div>

      {/* Layer Navigation */}
      <button onClick={advanceLayer}>Next Layer</button>

      {/* Reset */}
      <button onClick={reset}>Start Over</button>
    </div>
  )
}
```

## Key Concepts

### 1. Layers
The journey has 4 layers in order:
1. `value-alignment` - Core values and beliefs
2. `data-exposure` - Data and evidence
3. `objection-handling` - Address concerns
4. `commitment` - Call to action

### 2. Scores
Four metrics are calculated automatically:
- **Value Alignment** - % of "yes" answers in value-alignment layer
- **Data Awareness** - % of data points viewed
- **Persuasion Level** - Weighted average of all answers
- **Engagement Depth** - Time spent per question (normalized)

### 3. Persistence
All data is automatically saved to localStorage. Users can close the browser and resume later.

### 4. Session ID
Each journey gets a unique session ID for tracking and analytics.

## Common Patterns

### Track Data Point Views
```typescript
const {markDataPointViewed} = useJourneyStore()

<DataVisualization
  onView={() => markDataPointViewed('chart-1')}
/>
```

### Handle Layer Completion
```typescript
const {currentLayer, completedLayers, advanceLayer} = useJourneyStore()

if (allQuestionsAnswered && !completedLayers.includes(currentLayer)) {
  advanceLayer()
}
```

### Record Different Conversions
```typescript
const {recordConversion} = useJourneyStore()

// Email signup
recordConversion('email_signup', {email: 'user@example.com'})

// Social share
recordConversion('social_share', {platform: 'twitter'})

// Donation
recordConversion('donation', {amount: 50})

// Petition sign
recordConversion('petition_sign', {})

// Contact representative
recordConversion('contact_rep', {rep_name: 'John Smith'})
```

### Access Full State
```typescript
const store = useJourneyStore()

console.log('Session:', store.sessionId)
console.log('Lens:', store.politicalLens)
console.log('Email:', store.email)
console.log('Responses:', store.responses.length)
console.log('Conversions:', store.conversions.length)
```

## Next Steps

1. **Read the full documentation** - See `MIGRATION_GUIDE.md` for detailed info
2. **Review examples** - Check `journeyStore.examples.ts` for 10+ examples
3. **Study queries** - Look at `journeyQueries.ts` for data fetching
4. **Test your code** - Use the MigrationTest component to verify
5. **Deploy incrementally** - Start with one component, expand gradually

## Getting Help

- **API Reference** - See `IMPLEMENTATION_REPORT.md`
- **Migration Guide** - See `MIGRATION_GUIDE.md`
- **Code Examples** - See `journeyStore.examples.ts`
- **Type Definitions** - See `journeyStore.ts` for all types

## Tips

1. **Always track time** - Use `useState(new Date())` to track question start time
2. **Use selector hooks** - `useJourneyScores()` is more efficient than full store
3. **Handle edge cases** - Check for null/undefined before displaying data
4. **Reset on start** - Call `reset()` when user explicitly starts over
5. **Test persistence** - Verify data survives page reload

Happy coding!
