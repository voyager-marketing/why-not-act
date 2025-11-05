# WhyNotAct Type System Documentation

## Overview

This directory contains the comprehensive TypeScript type system for the WhyNotAct multi-layered persuasion framework. The type system is designed to support a sophisticated political action journey that adapts content based on user's political lens and engagement patterns.

## Architecture

The type system is organized into four main modules:

1. **journey.ts** - Core political and framework types
2. **layeredQuestion.ts** - Question structure and content framing
3. **userJourney.ts** - User progress and engagement tracking
4. **result.ts** - Personalized results and call-to-action content

## Module Guide

### 1. journey.ts - Core Types

#### Key Exports

- `PoliticalLens` - Main political perspective type ('far-left', 'center-left', 'center-right', 'far-right')
- `LayerType` - Enum of the 7 persuasion layers
- `QuestionType` - Types of questions used in each layer
- `AnswerType` - All possible answer formats
- `ANSWER_WEIGHTS` - Mapping of answers to persuasion scores

#### The 7 Layers

1. **Self-Identification** - Establish political perspective
2. **Value Alignment** - Connect with core values
3. **Data Reality** - Present factual information
4. **Solution Introduction** - Propose the solution
5. **Impact Visualization** - Show predicted outcomes
6. **Reflection Persuasion** - Prompt reflection
7. **Call to Action** - Drive conversion

#### Usage Example

```typescript
import { PoliticalLens, LayerType, AnswerType } from '@/types'

const userLens: PoliticalLens = 'center-left'
const currentLayer: LayerType = LayerType.VALUE_ALIGNMENT
const answer: AnswerType = 'strongly-agree'
```

### 2. layeredQuestion.ts - Question Structure

#### Key Exports

- `LayeredQuestion` - Complete question with all framings
- `ContentFraming` - Political lens-specific content
- `DataPoint` - Factual data with sources
- `VisualTheme` - Visual styling configuration
- `QuestionPrerequisite` - Conditional logic

#### Key Features

- **Multi-lens framing**: Each question has 4 framings (one per political lens)
- **Data integration**: Questions can include cited statistics
- **Visual theming**: Custom styling per question
- **Prerequisite logic**: Conditional question display
- **Branching**: Answer-based routing

#### Usage Example

```typescript
import { LayeredQuestion, getFramingForLens } from '@/types'

const question: LayeredQuestion = {
  id: 'value-1',
  layer: LayerType.VALUE_ALIGNMENT,
  order: 1,
  questionType: QuestionType.VALUE_CHECK,
  coreIdea: 'Do you believe in family values?',
  framings: {
    farLeft: {
      headline: 'Supporting immigrant families strengthens communities',
      bullets: ['Family unity is a human right', '...'],
      visualTheme: { /* ... */ },
      emotionalTone: 'passionate'
    },
    // ... other framings
  },
  persuasionWeight: 4,
  isGatekeeping: false
}

const framing = getFramingForLens(question, 'center-left')
```

### 3. userJourney.ts - Progress Tracking

#### Key Exports

- `UserJourney` - Complete user session data
- `ResponseRecord` - Individual question response
- `Scores` - Multi-dimensional scoring
- `PersonalizationData` - Collected preferences
- `ConversionAction` - Actions taken

#### Scoring System

All scores range from 0-100:

- **valueAlignment** - How aligned with stated values
- **dataAwareness** - Data engagement level
- **persuasionLevel** - Overall persuasion (weighted answers)
- **engagementDepth** - Time, clicks, exploration

#### Usage Example

```typescript
import { UserJourney, ResponseRecord, generateJourneySummary } from '@/types'

const journey: UserJourney = {
  sessionId: 'session-123',
  politicalLens: 'center-right',
  scores: {
    valueAlignment: 75,
    dataAwareness: 60,
    persuasionLevel: 70,
    engagementDepth: 80
  },
  responses: [/* ... */],
  personalizationData: {
    politicalLens: 'center-right',
    engagementPatterns: { prefersFacts: true }
  },
  conversions: [],
  metadata: {
    startedAt: new Date().toISOString(),
    currentLayer: LayerType.DATA_REALITY,
    layersCompleted: 2,
    totalTimeSpent: 180,
    isCompleted: false
  }
}

const summary = generateJourneySummary(journey, 10)
```

### 4. result.ts - Personalized Results

#### Key Exports

- `PersonalizedResult` - Complete result page
- `ContentBlock` - Modular content components
- `RecommendedAction` - Suggested actions
- `ResultType` - Which result page to show

#### Result Types

- **Revenue** - Focus on economic benefits
- **Economic** - Labor force impacts
- **Security** - National security angle
- **Demographic** - Population/community effects

#### Content Block Types

- `hero-stats` - Large statistics
- `bullet-list` - Simple lists
- `data-visualization` - Charts/graphs
- `testimonial` - User quotes
- `impact-story` - Narratives
- `comparison-table` - Side-by-side
- `timeline` - Historical progression
- `quote` - Emphasized quotes
- `video` - Embedded media
- `cta-banner` - Action prompts

#### Usage Example

```typescript
import {
  PersonalizedResult,
  ContentBlock,
  generatePersonalizedResult
} from '@/types'

const config: ResultPageConfig = {
  resultType: 'revenue',
  baseTitle: 'Immigration Can Generate $413B in Revenue',
  baseSubtitle: 'A practical, fiscally responsible solution',
  themeColor: '#ef4444',
  defaultBlocks: [/* ... */],
  defaultActions: [/* ... */],
  lensVariations: {}
}

const result = generatePersonalizedResult(journey, 'revenue', config)
```

## Backward Compatibility

### Legacy Types (form.ts)

The `form.ts` file contains deprecated types for backward compatibility:

- `Theme` → Use `PoliticalLens`
- `Answer` → Use `AnswerType`
- `Question` → Use `LayeredQuestion`
- `FormState` → Use `UserJourney`
- `ConvictionScores` → Use `Scores`

### Migration Helpers

Helper functions are provided to convert between old and new formats:

```typescript
import {
  themeToPoliticalLens,
  convertLegacyQuestion,
  convertLegacyJourney
} from '@/types'

// Convert old theme to new lens
const lens = themeToPoliticalLens('mid-left') // 'center-left'

// Convert old question format
const newQuestion = convertLegacyQuestion(
  oldQuestion,
  LayerType.VALUE_ALIGNMENT,
  QuestionType.VALUE_CHECK
)

// Convert old journey
const newJourney = convertLegacyJourney(legacyJourney)
```

## Type Safety Features

### Discriminated Unions

Content blocks use discriminated unions for type safety:

```typescript
type ContentBlockData =
  | HeroStatsData
  | BulletListData
  | DataVisualizationData
  | TestimonialData
  | ImpactStoryData
  | ComparisonTableData
  | TimelineData
  | QuoteData
  | VideoData
  | CTABannerData

// TypeScript knows the exact type based on the 'type' field
const block: ContentBlock = {
  id: '1',
  type: 'hero-stats',
  order: 1,
  content: {
    type: 'hero-stats', // Must match!
    stats: [/* ... */]
  }
}
```

### Enums for Constants

Enums provide type safety and autocomplete:

```typescript
// ✅ Type-safe
const layer: LayerType = LayerType.VALUE_ALIGNMENT

// ❌ Won't compile
const badLayer: LayerType = 'wrong-value'
```

### Const Objects for Mappings

Const objects provide compile-time checking:

```typescript
// Guaranteed to have all answer types
const ANSWER_WEIGHTS: Record<AnswerType, PersuasionWeight> = {
  'yes': 5,
  'maybe': 3,
  'no': 0,
  // ... TypeScript enforces completeness
}
```

## Best Practices

### 1. Import from Index

Always import from the central index:

```typescript
// ✅ Good
import { PoliticalLens, LayeredQuestion } from '@/types'

// ❌ Avoid
import { PoliticalLens } from '@/types/journey'
import { LayeredQuestion } from '@/types/layeredQuestion'
```

### 2. Use Helper Functions

Leverage provided helper functions:

```typescript
// ✅ Good
const framing = getFramingForLens(question, lens)

// ❌ Avoid manual mapping
const framingKey = lens === 'far-left' ? 'farLeft' : /* ... */
const framing = question.framings[framingKey]
```

### 3. Avoid Any Types

All types are strictly typed - avoid casting to `any`:

```typescript
// ✅ Good
const answer: AnswerType = 'yes'

// ❌ Avoid
const answer: any = 'yes'
```

### 4. Use Type Guards

Use provided type guard functions:

```typescript
// ✅ Good
if (hasPrerequisites(question)) {
  const canShow = checkPrerequisites(question, answers, score)
}
```

## Breaking Changes from Legacy Types

### Theme → PoliticalLens

- `'mid-left'` → `'center-left'`
- `'mid-right'` → `'center-right'`

### Question Structure

Old structure was flat with 4 theme properties:

```typescript
// Old
interface Question {
  farLeft: ThemedFraming
  midLeft: ThemedFraming
  midRight: ThemedFraming
  farRight: ThemedFraming
}
```

New structure uses nested framings object:

```typescript
// New
interface LayeredQuestion {
  framings: {
    farLeft: ContentFraming
    centerLeft: ContentFraming
    centerRight: ContentFraming
    farRight: ContentFraming
  }
}
```

### Answer Values

Expanded from 3 to 11 possible answer types:

```typescript
// Old: Only 3 options
type Answer = 'yes' | 'no' | 'maybe'

// New: 11 options including Likert scale
type AnswerType =
  | 'yes' | 'no' | 'maybe'
  | 'strongly-agree' | 'agree' | 'neutral' | 'disagree' | 'strongly-disagree'
  | 'tell-me-more' | 'not-convinced' | 'skip'
```

### Scores Object

Renamed and restructured:

```typescript
// Old
interface ConvictionScores {
  valueAlignment: number
  dataAwareness: number
  persuasionLevel: number
  engagementDepth: number
}

// New - same fields but called Scores
interface Scores {
  valueAlignment: number
  dataAwareness: number
  persuasionLevel: number
  engagementDepth: number
  // Plus optional new fields
  consistencyScore?: number
  layerScores?: { [key in LayerType]?: number }
}
```

## Migration Guide

### Step 1: Update Imports

```typescript
// Before
import type { Theme, Question, Answer } from '@/types/form'

// After
import type { PoliticalLens, LayeredQuestion, AnswerType } from '@/types'
```

### Step 2: Update Component Props

```typescript
// Before
interface Props {
  theme: Theme
  question: Question
}

// After
interface Props {
  politicalLens: PoliticalLens // or use Theme with conversion
  question: LayeredQuestion // or use Question with conversion
}
```

### Step 3: Use Conversion Helpers

For gradual migration, use conversion helpers:

```typescript
import { themeToPoliticalLens, convertLegacyQuestion } from '@/types'

// Convert at boundaries
const newLens = themeToPoliticalLens(oldTheme)
const newQuestion = convertLegacyQuestion(
  oldQuestion,
  LayerType.VALUE_ALIGNMENT,
  QuestionType.VALUE_CHECK
)
```

### Step 4: Update Data Layer

Update Sanity schema and queries to match new structure:

- Add `layer` field to questions
- Add `questionType` field
- Restructure framing fields
- Add new metadata fields

## Testing

All types include utility functions that can be unit tested:

```typescript
import {
  checkPrerequisites,
  calculateCompletionRate,
  generateJourneySummary
} from '@/types'

describe('Type Utilities', () => {
  test('checkPrerequisites', () => {
    const canShow = checkPrerequisites(question, answers, score)
    expect(canShow).toBe(true)
  })

  test('calculateCompletionRate', () => {
    const rate = calculateCompletionRate(journey, 10)
    expect(rate).toBe(50) // 5/10 questions
  })
})
```

## Questions?

For questions or issues with the type system, please:

1. Review this documentation
2. Check JSDoc comments in type files
3. Review the migration guide above
4. Check for existing GitHub issues
5. Create a new issue if needed

## Future Enhancements

Planned improvements to the type system:

- [ ] Add Zod schemas for runtime validation
- [ ] Generate OpenAPI/JSON Schema from types
- [ ] Add more granular permission types
- [ ] Add A/B testing variant types
- [ ] Add analytics event types
- [ ] Add API request/response types
