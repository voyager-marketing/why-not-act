# Type System Migration Guide

## Overview

This guide helps you migrate from the legacy type system (`form.ts`) to the new comprehensive type system.

## Quick Reference: Old → New

| Old Type | New Type | Location |
|----------|----------|----------|
| `Theme` | `PoliticalLens` | `@/types/journey` |
| `Answer` | `AnswerType` | `@/types/journey` |
| `Question` | `LayeredQuestion` | `@/types/layeredQuestion` |
| `ThemedFraming` | `ContentFraming` | `@/types/layeredQuestion` |
| `FormState` | `UserJourney` | `@/types/userJourney` |
| `ConvictionScores` | `Scores` | `@/types/userJourney` |
| `ResultType` | `ResultType` | `@/types/result` (same name, new location) |

## Theme Value Changes

The theme values have been renamed for clarity:

| Old Theme | New PoliticalLens |
|-----------|-------------------|
| `'far-left'` | `'far-left'` (unchanged) |
| `'mid-left'` | `'center-left'` ⚠️ |
| `'mid-right'` | `'center-right'` ⚠️ |
| `'far-right'` | `'far-right'` (unchanged) |

### Helper Functions

Use these helpers to convert between old and new values:

```typescript
import { themeToPoliticalLens, politicalLensToTheme } from '@/types'

// Old → New
const lens = themeToPoliticalLens('mid-left') // Returns 'center-left'

// New → Old (for backward compatibility)
const theme = politicalLensToTheme('center-left') // Returns 'mid-left'
```

## Step-by-Step Migration

### 1. Update Imports

#### Before:
```typescript
import type { Theme, Question, Answer, FormState } from '@/types/form'
```

#### After:
```typescript
import type { PoliticalLens, LayeredQuestion, AnswerType, UserJourney } from '@/types'
```

### 2. Update Component Props

#### Before:
```typescript
interface QuestionStepProps {
  question: Question
  theme: Theme
  onAnswer: (answer: Answer) => void
}
```

#### After:
```typescript
interface QuestionStepProps {
  question: LayeredQuestion
  politicalLens: PoliticalLens
  onAnswer: (answer: AnswerType) => void
}
```

#### Gradual Migration (Keep Compatibility):
```typescript
interface QuestionStepProps {
  question: Question | LayeredQuestion // Accept both
  theme?: Theme // Old prop (deprecated)
  politicalLens?: PoliticalLens // New prop
  onAnswer: (answer: Answer | AnswerType) => void
}

// Inside component
const lens = politicalLens || (theme && themeToPoliticalLens(theme))
```

### 3. Update Data Fetching

#### Before:
```typescript
interface Question {
  order: number
  topic: string
  coreIdea: string
  farLeft: { headline: string, bullets: string[] }
  midLeft: { headline: string, bullets: string[] }
  midRight: { headline: string, bullets: string[] }
  farRight: { headline: string, bullets: string[] }
}
```

#### After:
```typescript
interface LayeredQuestion {
  id: string
  layer: LayerType
  order: number
  questionType: QuestionType
  coreIdea: string
  dataPoint?: DataPoint
  framings: {
    farLeft: ContentFraming
    centerLeft: ContentFraming
    centerRight: ContentFraming
    farRight: ContentFraming
  }
  persuasionWeight: 0 | 1 | 2 | 3 | 4 | 5
  isGatekeeping: boolean
}
```

#### Conversion Helper:
```typescript
import { convertLegacyQuestion, LayerType, QuestionType } from '@/types'

// Convert at data layer boundary
const legacyQuestions: Question[] = await fetchQuestions()
const newQuestions: LayeredQuestion[] = legacyQuestions.map(q =>
  convertLegacyQuestion(q, LayerType.VALUE_ALIGNMENT, QuestionType.VALUE_CHECK)
)
```

### 4. Update State Management

#### Before (Zustand):
```typescript
interface FormStore {
  theme: Theme | null
  answers: Record<number, Answer>
  score: number
  setTheme: (theme: Theme) => void
  setAnswer: (questionId: number, answer: Answer) => void
}
```

#### After:
```typescript
interface FormStore {
  journey: UserJourney | null
  setLens: (lens: PoliticalLens) => void
  recordResponse: (questionId: string, answer: AnswerType, timeSpent: number) => void
  calculateScores: () => void
}
```

### 5. Update Framing Access

#### Before:
```typescript
const themeKeyMap: Record<Theme, 'farLeft' | 'midLeft' | 'midRight' | 'farRight'> = {
  'far-left': 'farLeft',
  'mid-left': 'midLeft',
  'mid-right': 'midRight',
  'far-right': 'farRight',
}
const themeKey = themeKeyMap[theme]
const themedContent = question[themeKey]
```

#### After:
```typescript
import { getFramingForLens } from '@/types'

const framing = getFramingForLens(question, politicalLens)
```

### 6. Update Answer Handling

#### Before (3 options):
```typescript
type Answer = 'yes' | 'no' | 'maybe'

const scoreMap: Record<Answer, number> = {
  yes: 2,
  maybe: 1,
  no: 0,
}
```

#### After (11 options with built-in weights):
```typescript
import { AnswerType, ANSWER_WEIGHTS } from '@/types'

const answer: AnswerType = 'strongly-agree'
const weight = ANSWER_WEIGHTS[answer] // 5
```

## Breaking Changes

### 1. Theme Key Names

**Breaking:** `'mid-left'` and `'mid-right'` renamed to `'center-left'` and `'center-right'`

**Impact:** URLs, database values, localStorage keys

**Migration:**
```typescript
// URL parameter migration
const oldTheme = params.theme // 'mid-left'
const newLens = themeToPoliticalLens(oldTheme as Theme) // 'center-left'

// Database migration (pseudo-code)
UPDATE questions
SET framing_key = REPLACE(framing_key, 'midLeft', 'centerLeft')
WHERE framing_key LIKE '%midLeft%'
```

### 2. Question Structure

**Breaking:** Flat structure → nested `framings` object

**Impact:** All question components, Sanity schema

**Migration:**
```typescript
// Old access
const content = question.midLeft

// New access
const content = question.framings.centerLeft

// Or use helper
const content = getFramingForLens(question, 'center-left')
```

### 3. Answer Scope

**Breaking:** 3 answer types → 11 answer types

**Impact:** Answer buttons, scoring logic

**Migration:**
```typescript
// Old components only showed yes/no/maybe
// New components can show different answer sets

// Simple migration: keep showing yes/no/maybe
<Button onClick={() => onAnswer('yes')}>Yes</Button>
<Button onClick={() => onAnswer('no')}>No</Button>
<Button onClick={() => onAnswer('maybe')}>Maybe</Button>

// Enhanced: use Likert scale
<Button onClick={() => onAnswer('strongly-agree')}>Strongly Agree</Button>
<Button onClick={() => onAnswer('agree')}>Agree</Button>
<Button onClick={() => onAnswer('neutral')}>Neutral</Button>
<Button onClick={() => onAnswer('disagree')}>Disagree</Button>
<Button onClick={() => onAnswer('strongly-disagree')}>Strongly Disagree</Button>
```

### 4. Scoring

**Breaking:** Single score → multiple score dimensions

**Impact:** Result routing, analytics

**Migration:**
```typescript
// Old
const score = calculateScore(answers) // single number

// New
const scores: Scores = {
  valueAlignment: calculateValueAlignment(responses),
  dataAwareness: calculateDataAwareness(responses),
  persuasionLevel: calculatePersuasion(responses),
  engagementDepth: calculateEngagement(responses)
}

// For backward compatibility, use persuasionLevel as the main score
const mainScore = scores.persuasionLevel
```

## Sanity CMS Schema Updates

### Question Schema

Update your Sanity schema to match the new structure:

```typescript
// schemas/question.ts
export default {
  name: 'question',
  type: 'document',
  fields: [
    {
      name: 'id',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'layer',
      type: 'string',
      options: {
        list: [
          { title: 'Self-Identification', value: 'self-identification' },
          { title: 'Value Alignment', value: 'value-alignment' },
          { title: 'Data Reality', value: 'data-reality' },
          { title: 'Solution Introduction', value: 'solution-introduction' },
          { title: 'Impact Visualization', value: 'impact-visualization' },
          { title: 'Reflection Persuasion', value: 'reflection-persuasion' },
          { title: 'Call to Action', value: 'call-to-action' }
        ]
      }
    },
    {
      name: 'order',
      type: 'number'
    },
    {
      name: 'questionType',
      type: 'string',
      options: {
        list: [
          'value-check',
          'data-reveal',
          'solution-framing',
          'impact-agreement',
          'reflection-prompt',
          'action-request'
        ]
      }
    },
    {
      name: 'coreIdea',
      type: 'text'
    },
    {
      name: 'framings',
      type: 'object',
      fields: [
        { name: 'farLeft', type: 'contentFraming' },
        { name: 'centerLeft', type: 'contentFraming' },
        { name: 'centerRight', type: 'contentFraming' },
        { name: 'farRight', type: 'contentFraming' }
      ]
    },
    {
      name: 'persuasionWeight',
      type: 'number',
      validation: Rule => Rule.min(0).max(5)
    },
    {
      name: 'isGatekeeping',
      type: 'boolean'
    }
  ]
}
```

## Testing Strategy

### 1. Unit Tests

Test conversion helpers:

```typescript
import { themeToPoliticalLens, convertLegacyQuestion } from '@/types'

describe('Type Conversion', () => {
  test('themeToPoliticalLens converts mid-left to center-left', () => {
    expect(themeToPoliticalLens('mid-left')).toBe('center-left')
  })

  test('convertLegacyQuestion creates valid LayeredQuestion', () => {
    const legacy: Question = { /* ... */ }
    const converted = convertLegacyQuestion(
      legacy,
      LayerType.VALUE_ALIGNMENT,
      QuestionType.VALUE_CHECK
    )
    expect(converted.framings.centerLeft).toBeDefined()
  })
})
```

### 2. Integration Tests

Test components with both old and new types:

```typescript
describe('QuestionStep', () => {
  test('works with legacy Question', () => {
    const legacyQuestion: Question = { /* ... */ }
    render(<QuestionStep question={legacyQuestion} theme="mid-left" />)
    // assertions
  })

  test('works with new LayeredQuestion', () => {
    const newQuestion: LayeredQuestion = { /* ... */ }
    render(<QuestionStep question={newQuestion} politicalLens="center-left" />)
    // assertions
  })
})
```

### 3. E2E Tests

Test the full journey with new types:

```typescript
test('complete journey with new type system', async () => {
  await page.goto('/')
  await page.click('[data-lens="center-left"]')

  // Answer questions
  for (let i = 0; i < 5; i++) {
    await page.click('[data-answer="strongly-agree"]')
  }

  // Check result page
  await expect(page).toHaveURL(/\/result\/revenue/)
})
```

## Rollback Plan

If issues arise, you can temporarily rollback:

### 1. Keep Both Type Systems

```typescript
// types/index.ts
// Export both old and new
export * from './form' // Legacy
export * from './journey' // New
export * from './layeredQuestion' // New
export * from './userJourney' // New
export * from './result' // New
```

### 2. Use Type Adapters

Create adapter functions to switch between systems:

```typescript
// lib/typeAdapters.ts
export function adaptToLegacy(question: LayeredQuestion): Question {
  return {
    order: question.order,
    topic: '', // Not in new system
    coreIdea: question.coreIdea,
    farLeft: {
      headline: question.framings.farLeft.headline,
      bullets: question.framings.farLeft.bullets
    },
    midLeft: {
      headline: question.framings.centerLeft.headline,
      bullets: question.framings.centerLeft.bullets
    },
    midRight: {
      headline: question.framings.centerRight.headline,
      bullets: question.framings.centerRight.bullets
    },
    farRight: {
      headline: question.framings.farRight.headline,
      bullets: question.framings.farRight.bullets
    }
  }
}
```

## Timeline

Suggested migration timeline:

### Phase 1: Setup (Week 1)
- ✅ Create new type files
- ✅ Add deprecation notices to old types
- ✅ Write conversion helpers
- ✅ Update documentation

### Phase 2: Gradual Adoption (Weeks 2-3)
- Update one component at a time
- Keep backward compatibility
- Add tests for each update
- Monitor for issues

### Phase 3: Data Migration (Week 4)
- Update Sanity schema
- Migrate existing questions
- Update localStorage format
- Update analytics tracking

### Phase 4: Cleanup (Week 5)
- Remove compatibility layers
- Remove old types
- Update all imports
- Final testing

## Common Issues

### Issue 1: "Property 'midLeft' does not exist"

**Cause:** Trying to access old property names on new types

**Solution:**
```typescript
// Wrong
const content = question.midLeft

// Right
const content = question.framings.centerLeft
// Or
const content = getFramingForLens(question, 'center-left')
```

### Issue 2: "Type 'mid-left' is not assignable to type 'PoliticalLens'"

**Cause:** Using old theme values with new types

**Solution:**
```typescript
// Wrong
const lens: PoliticalLens = 'mid-left'

// Right
const lens: PoliticalLens = 'center-left'
// Or convert
const lens = themeToPoliticalLens('mid-left')
```

### Issue 3: LocalStorage/URL Issues

**Cause:** Stored old theme values, reading with new types

**Solution:**
```typescript
// Read and convert
const storedTheme = localStorage.getItem('theme') as Theme
const politicalLens = themeToPoliticalLens(storedTheme)

// Or migrate storage
if (storedTheme === 'mid-left') {
  localStorage.setItem('theme', 'center-left')
}
```

## Support

If you encounter issues during migration:

1. Check this guide
2. Review type JSDoc comments
3. Check the README.md in types folder
4. Review example code in types/*.ts files
5. Create a GitHub issue

## Checklist

Use this checklist to track your migration:

- [ ] Phase 1: Setup
  - [ ] New type files created
  - [ ] Conversion helpers tested
  - [ ] Documentation reviewed
- [ ] Phase 2: Code Updates
  - [ ] Update imports in all files
  - [ ] Update component props
  - [ ] Update state management
  - [ ] Update data fetching
  - [ ] Add backward compatibility where needed
- [ ] Phase 3: Data Migration
  - [ ] Update Sanity schema
  - [ ] Migrate existing questions in CMS
  - [ ] Update localStorage format
  - [ ] Update URL parameters
- [ ] Phase 4: Testing
  - [ ] Unit tests pass
  - [ ] Integration tests pass
  - [ ] E2E tests pass
  - [ ] Manual testing complete
- [ ] Phase 5: Cleanup
  - [ ] Remove compatibility code
  - [ ] Remove old type usage
  - [ ] Update all imports
  - [ ] Final testing
