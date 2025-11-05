# WhyNotAct Sanity CMS Schema Documentation

## Overview

This directory contains the Sanity CMS schemas for the WhyNotAct multi-layered question system. The system is designed to guide users through increasingly deeper layers of political understanding, from surface-level awareness to transformative systemic vision.

## Architecture

### The 7-Layer Onion Model

The question system is structured as a metaphorical "onion" with 7 layers:

1. **Layer 1: Surface Issue** - Basic awareness and simple questions
2. **Layer 2: Immediate Concerns** - Personal impact and direct effects
3. **Layer 3: System Analysis** - Understanding institutional structures
4. **Layer 4: Power Dynamics** - Who benefits, who loses
5. **Layer 5: Root Causes** - Historical and structural origins
6. **Layer 6: Systemic Solutions** - Policy and system-level changes
7. **Layer 7: Transformative Vision** - Radical reimagining

### Ideology-Specific Framing

Every piece of content can be framed for four ideological perspectives:

- **Far Left** - Progressive, anti-capitalist, systemic change focus
- **Center Left** - Liberal, reform-oriented, social justice focus
- **Center Right** - Conservative pragmatic, institutional stability focus
- **Far Right** - Traditional, nationalist, security-focused

Each framing includes:
- Custom headlines and messaging
- Emotional tone calibration
- Color scheme theming
- Tailored bullet points and narratives

## Schema Types

### 1. Layered Question (`layeredQuestion`)

**File:** `schemaTypes/layeredQuestion.ts`

The core document type for the multi-layered question system.

**Key Fields:**
- `layer` - Which of the 7 layers this question belongs to
- `questionType` - awareness, opinion, knowledge, values, or action
- `coreQuestion` - The neutral question presented to all users
- `[ideology]Framing` - Four separate framings for each ideology
- `persuasionWeight` - How influential this question is (0-100)
- `isGatekeeping` - Whether user must engage meaningfully before proceeding
- `prerequisites` - Conditions that must be met to show this question
- `answerOptions` - Predefined choices with persuasion deltas
- `dataPoint` - Optional embedded data/statistic

**Ideology Framing Structure:**
```typescript
{
  headline: string
  subheadline: string
  bullets: string[]
  narrative: string
  emotionalTone: 'fear' | 'anger' | 'pride' | 'hope' | 'neutral'
  primaryColor: string (hex color)
}
```

### 2. Data Point (`dataPoint`)

**File:** `schemaTypes/dataPoint.ts`

Standalone data points with ideology-specific interpretations.

**Key Fields:**
- `category` - Type of data (economic, security, demographic, etc.)
- `statistic` - The raw number or fact
- `neutralContext` - Neutral explanation
- `source` & `sourceUrl` - Citation information
- `visualization` - How to display (counter, chart, etc.)
- `[ideology]Interpretation` - Four interpretations of what the data means
- `isVerified` - Fact-checking status

**Use Cases:**
- Display alongside questions to provide evidence
- Standalone "by the numbers" pages
- Supporting material for CTAs
- Reference in multiple questions

### 3. Call to Action (`callToAction`)

**File:** `schemaTypes/callToAction.ts`

Action prompts with intelligent display logic.

**Key Fields:**
- `actionType` - petition, donate, share, volunteer, etc.
- `priority` - Display priority (0-100)
- `[ideology]Framing` - Tailored messaging per ideology
- `conversionMetrics` - When and how to show this CTA
  - `showIfPersuasionAbove/Below` - Score thresholds
  - `showIfLayersCompleted` - Show after specific layers
  - `maxDisplays` - Don't show too many times
  - `cooldownHours` - Time between displays
- `externalUrl` - Link to petition/donation page
- `embedCode` - Optional inline form

**CTA Framing Structure:**
```typescript
{
  headline: string
  description: string
  buttonText: string
  icon: string (Lucide icon name)
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
}
```

### 4. Question (Legacy) (`question`)

**File:** `schemaTypes/question.ts`

**Status:** DEPRECATED but functional for backward compatibility

The original simple question schema. Continue using for existing content, but new questions should use `layeredQuestion`.

## File Structure

```
sanity/
├── schemaTypes/
│   ├── index.ts              # Schema registry (exports all types)
│   ├── layeredQuestion.ts    # Multi-layer question system
│   ├── dataPoint.ts          # Data with ideology interpretations
│   ├── callToAction.ts       # Action prompts with smart display
│   └── question.ts           # Legacy schema (deprecated)
├── groq-queries.ts           # Pre-built GROQ queries
├── migrate-questions.md      # Migration guide
├── sanity.config.ts          # Sanity Studio configuration
└── README.md                 # This file
```

## GROQ Queries

Pre-built queries are available in `groq-queries.ts`. Import and use:

```typescript
import { queries } from '@/sanity/groq-queries'
import { sanityClient } from '@/lib/sanity.client'

// Get questions for a layer
const questions = await sanityClient.fetch(
  queries.getQuestionsByLayer,
  { layer: 'layer1' }
)

// Get question with ideology-specific framing
const question = await sanityClient.fetch(
  queries.getQuestionWithFraming,
  { questionId: 'abc123', ideology: 'centerLeft' }
)
```

## TypeScript Types

TypeScript interfaces are available in `types/sanity.ts`:

```typescript
import type {
  LayeredQuestion,
  DataPoint,
  CallToAction,
  IdeologyType
} from '@/types/sanity'

import {
  getQuestionFraming,
  getDataInterpretation,
  checkPrerequisites,
  shouldShowCTA
} from '@/types/sanity'
```

## Usage in Frontend

### Fetching a Question

```typescript
import { sanityClient } from '@/lib/sanity.client'
import { queries } from '@/sanity/groq-queries'
import { getQuestionFraming } from '@/types/sanity'

// Fetch question
const question = await sanityClient.fetch(
  queries.getQuestionWithFraming,
  {
    questionId: questionId,
    ideology: userIdeology // 'farLeft', 'centerLeft', etc.
  }
)

// Get the appropriate framing
const framing = getQuestionFraming(question, userIdeology)
```

### Checking Prerequisites

```typescript
import { checkPrerequisites } from '@/types/sanity'

const canShowQuestion = checkPrerequisites(
  question,
  userPersuasionScore,    // 0-100
  completedLayers,        // ['layer1', 'layer2']
  answeredQuestions       // ['questionId1', 'questionId2']
)
```

### Displaying CTAs

```typescript
import { queries } from '@/sanity/groq-queries'
import { shouldShowCTA, getCTAFraming } from '@/types/sanity'

// Fetch eligible CTAs
const ctas = await sanityClient.fetch(
  queries.getEligibleCTAs,
  {
    userScore: userPersuasionScore,
    completedLayers: completedLayers,
    currentTime: new Date().toISOString()
  }
)

// Filter and format
const displayableCTAs = ctas
  .filter(cta => shouldShowCTA(cta, userScore, completedLayers, displayCount))
  .map(cta => ({
    ...cta,
    framing: getCTAFraming(cta, userIdeology)
  }))
```

## Persuasion Scoring

The system tracks a user's "persuasion score" (0-100) to guide content:

- **0-25:** Early awareness stage
- **26-50:** Understanding and concern building
- **51-75:** Ready for deeper analysis
- **76-100:** Motivated toward action

### How It Works:

1. Each question has a `persuasionWeight` (0-100)
2. Answer options have `persuasionDelta` (-50 to +50)
3. User's score adjusts based on engagement
4. Questions and CTAs use score thresholds to display appropriately

## Gatekeeping Questions

Questions marked `isGatekeeping: true` require meaningful engagement before proceeding to the next layer. This prevents users from just clicking through without thinking.

**Example Implementation:**
```typescript
if (question.isGatekeeping) {
  // Require text input or thoughtful answer
  // Check answer length/quality
  // Only advance layer after genuine engagement
}
```

## Content Strategy

### Layer Progression

**Layer 1-2:** Hook users with relatable, surface-level content
- Simple yes/no awareness checks
- Personal impact questions
- Low persuasion weight

**Layer 3-4:** Build understanding of systems
- "Why" questions about institutions
- Power dynamics exploration
- Medium persuasion weight

**Layer 5-6:** Root cause analysis
- Historical context
- Structural explanations
- High persuasion weight

**Layer 7:** Transformative vision
- Alternative systems
- Radical solutions
- Very high persuasion weight

### CTA Timing

- **Early CTAs (after layer 1-2):** Easy actions (share, subscribe)
- **Mid CTAs (after layer 3-4):** Petitions, letter-writing
- **Late CTAs (after layer 5+):** Donations, volunteering, organizing

## Sanity Studio

Access the CMS at `/studio` (or your configured path).

### Content Entry Best Practices

1. **Complete All 4 Ideology Framings** - Never leave a framing empty
2. **Use Compelling Headlines** - First thing users see
3. **Keep Bullets Concise** - Max 5 per framing, one sentence each
4. **Calibrate Persuasion Weights** - Test the flow
5. **Set Appropriate Colors** - Use ideology palette
6. **Verify Data Sources** - Mark `isVerified: true` only when fact-checked
7. **Tag Everything** - Enables filtering and analytics

### Ideology Writing Guidelines

**Far Left:**
- Frame: Systemic oppression, class struggle, collective power
- Tone: Anger at injustice, solidarity, revolutionary
- Example: "Corporations profit while workers suffer"

**Center Left:**
- Frame: Fairness, compassion, evidence-based reform
- Tone: Empathy, urgency for change, hopeful
- Example: "Research shows this policy helps families"

**Center Right:**
- Frame: Individual responsibility, limited government, pragmatism
- Tone: Concern for stability, fiscal prudence
- Example: "Government overreach threatens freedom"

**Far Right:**
- Frame: National security, traditional values, strong authority
- Tone: Fear of threats, pride in tradition
- Example: "Our borders must remain secure"

## Migration from Legacy Schema

See `migrate-questions.md` for detailed migration instructions.

**Quick Summary:**
1. Legacy `question` schema remains functional
2. New questions use `layeredQuestion` schema
3. Map old questions to appropriate layers
4. Enhance with new fields (persuasion, prerequisites, etc.)
5. Add data points and CTAs

## Testing

### Test in Sanity Vision

1. Go to `/studio` → Vision tab
2. Paste GROQ queries from `groq-queries.ts`
3. Set variables (click "Params" button)
4. Execute and inspect results

### Example Test Query

```groq
*[_type == "layeredQuestion" && layer == "layer1"][0] {
  topic,
  coreQuestion,
  "farLeftFraming": farLeftFraming,
  "persuasionWeight": persuasionWeight
}
```

## Performance Optimization

- **Use projections** - Only fetch needed fields
- **Limit results** - Use `[0...10]` for pagination
- **Cache queries** - Use SWR or React Query
- **Index tags** - For fast filtering

## Support & Resources

- **Sanity Docs:** https://www.sanity.io/docs
- **GROQ Cheat Sheet:** https://www.sanity.io/docs/query-cheat-sheet
- **Vision Tool:** Built into Studio at `/studio/vision`

## Changelog

- **v1.0.0** - Initial multi-layered schema system
  - 7-layer onion model
  - 4 ideology framings
  - Persuasion scoring
  - Prerequisites and gatekeeping
  - Data points with interpretations
  - Smart CTAs with conversion metrics
