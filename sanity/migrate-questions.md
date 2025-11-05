# Migration Guide: Legacy Questions to Layered Questions

## Overview

This guide explains how to migrate from the legacy `question` schema to the new `layeredQuestion` schema for the multi-layered question system.

## Key Differences

### Legacy Schema (`question`)
- Simple 1-5 question ordering
- 4 ideology framings (farLeft, midLeft, midRight, farRight)
- Basic headline + bullets
- No layer concept
- No data points
- No persuasion tracking

### New Schema (`layeredQuestion`)
- 7-layer onion model (surface to transformative)
- 4 ideology framings with enhanced fields
- Question types (awareness, opinion, knowledge, values, action)
- Integrated data points
- Persuasion weight tracking
- Prerequisites and gatekeeping
- Answer options with persuasion deltas

## Migration Strategy

### Phase 1: Parallel Operation
Both schemas will coexist. Legacy questions continue to work while you build new layered questions.

### Phase 2: Content Mapping
Map existing questions to appropriate layers:

**Layer 1 (Surface Issue)** - Questions 1-2
- Simple awareness checks
- "Do you know about X?" type questions

**Layer 2 (Immediate Concerns)** - Question 3
- Personal impact
- "How does this affect you?" questions

**Layer 3 (System Analysis)** - Question 4
- Why things are the way they are
- Institutional questions

**Layer 4-7 (Deeper Layers)** - Question 5 + New Content
- Power dynamics
- Root causes
- Systemic solutions
- Transformative vision

### Phase 3: Data Migration Script

```javascript
// Example migration script (run in Sanity Vision or migration tool)

// Fetch all legacy questions
const legacyQuestions = await sanity.fetch(`
  *[_type == "question"] {
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
`)

// Map to new schema
const newQuestions = legacyQuestions.map(q => {
  // Determine layer based on order (1-2 = layer1, 3 = layer2, 4-5 = layer3)
  const layerMap = {
    1: 'layer1',
    2: 'layer1',
    3: 'layer2',
    4: 'layer3',
    5: 'layer3'
  }

  return {
    _type: 'layeredQuestion',
    layer: layerMap[q.order],
    questionType: 'awareness', // Default, adjust manually
    order: q.order,
    topic: q.topic,
    coreQuestion: q.coreIdea,

    // Map framings
    farLeftFraming: {
      headline: q.farLeftHeadline,
      bullets: q.farLeftBullets,
      emotionalTone: 'neutral', // Set manually
      primaryColor: '#DC143C' // Crimson
    },

    centerLeftFraming: {
      headline: q.midLeftHeadline,
      bullets: q.midLeftBullets,
      emotionalTone: 'neutral',
      primaryColor: '#4169E1' // Royal blue
    },

    centerRightFraming: {
      headline: q.midRightHeadline,
      bullets: q.midRightBullets,
      emotionalTone: 'neutral',
      primaryColor: '#B22222' // Firebrick
    },

    farRightFraming: {
      headline: q.farRightHeadline,
      bullets: q.farRightBullets,
      emotionalTone: 'neutral',
      primaryColor: '#8B0000' // Dark red
    },

    persuasionWeight: 50, // Default, adjust manually
    isGatekeeping: false,
  }
})

// Create new documents (manually review and create in Sanity Studio)
```

## GROQ Query Examples

### Get All Questions for a Layer

```groq
*[_type == "layeredQuestion" && layer == "layer1"] | order(order asc) {
  _id,
  topic,
  coreQuestion,
  order,
  questionType,
  persuasionWeight
}
```

### Get Question with Specific Framing

```groq
*[_type == "layeredQuestion" && _id == $questionId][0] {
  _id,
  topic,
  coreQuestion,
  layer,

  // Get framing based on user ideology
  "framing": select(
    $ideology == "farLeft" => farLeftFraming,
    $ideology == "centerLeft" => centerLeftFraming,
    $ideology == "centerRight" => centerRightFraming,
    $ideology == "farRight" => farRightFraming
  ),

  dataPoint,
  answerOptions
}
```

### Get Available Questions Based on Prerequisites

```groq
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
```

### Get Next Layer's Gatekeeping Question

```groq
*[_type == "layeredQuestion" &&
  layer == $nextLayer &&
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
  )
}
```

## Data Point Queries

### Get All Data Points by Category

```groq
*[_type == "dataPoint" && category == "economic"] | order(_createdAt desc) {
  _id,
  statistic,
  neutralContext,
  source,
  yearCollected,
  isVerified
}
```

### Get Data Point with Ideology Interpretation

```groq
*[_type == "dataPoint" && _id == $dataPointId][0] {
  _id,
  statistic,
  neutralContext,
  source,
  sourceUrl,
  visualization,

  "interpretation": select(
    $ideology == "farLeft" => farLeftInterpretation,
    $ideology == "centerLeft" => centerLeftInterpretation,
    $ideology == "centerRight" => centerRightInterpretation,
    $ideology == "farRight" => farRightInterpretation
  )
}
```

### Get Questions Using a Specific Data Point

```groq
*[_type == "dataPoint" && _id == $dataPointId][0] {
  statistic,
  "relatedQuestions": *[_type == "layeredQuestion" &&
    references($dataPointId)
  ] {
    _id,
    topic,
    layer
  }
}
```

## Call to Action Queries

### Get Eligible CTAs for User

```groq
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
    !defined(startDate) || startDate <= now()
  ) &&
  (
    !defined(endDate) || endDate >= now()
  )
] | order(priority desc) {
  _id,
  actionType,
  title,
  priority,
  externalUrl,

  "framing": select(
    $ideology == "farLeft" => farLeftFraming,
    $ideology == "centerLeft" => centerLeftFraming,
    $ideology == "centerRight" => centerRightFraming,
    $ideology == "farRight" => farRightFraming
  ),

  conversionMetrics
}
```

### Get CTAs by Action Type

```groq
*[_type == "callToAction" &&
  actionType == "petition" &&
  isActive == true
] | order(priority desc) [0...3]
```

### Get CTAs for Completed Layer

```groq
*[_type == "callToAction" &&
  isActive == true &&
  $completedLayer in conversionMetrics.showIfLayersCompleted
] | order(priority desc)
```

## Advanced Query: Complete Question Flow

```groq
// Get everything needed for a question page
{
  "question": *[_type == "layeredQuestion" && _id == $questionId][0] {
    _id,
    layer,
    topic,
    coreQuestion,
    context,
    questionType,
    persuasionWeight,

    // Get ideology-specific framing
    "framing": select(
      $ideology == "farLeft" => farLeftFraming,
      $ideology == "centerLeft" => centerLeftFraming,
      $ideology == "centerRight" => centerRightFraming,
      $ideology == "farRight" => farRightFraming
    ),

    // Get data point with interpretation
    "dataPoint": select(
      defined(dataPoint) => {
        ...dataPoint,
        "interpretation": *[_type == "dataPoint" &&
          _id == ^.dataPoint._ref
        ][0] | {
          statistic,
          neutralContext,
          source,
          visualization,
          "interpretation": select(
            $ideology == "farLeft" => farLeftInterpretation,
            $ideology == "centerLeft" => centerLeftInterpretation,
            $ideology == "centerRight" => centerRightInterpretation,
            $ideology == "farRight" => farRightInterpretation
          )
        }
      }
    ),

    answerOptions
  },

  // Get relevant CTAs
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
  }
}
```

## Validation Checklist

Before going live with new layered questions:

- [ ] All 4 ideology framings completed
- [ ] Headlines are compelling and ideology-appropriate
- [ ] Bullets are concise (max 5 per framing)
- [ ] Persuasion weights calibrated
- [ ] Data points fact-checked and sourced
- [ ] Prerequisites configured correctly
- [ ] Answer options include persuasion deltas
- [ ] Colors follow ideology palette
- [ ] Tags added for filtering
- [ ] Preview displays correctly in Studio

## Rollback Plan

If issues arise, you can:

1. Disable new questions in frontend (use feature flag)
2. Fall back to legacy `question` schema
3. Legacy schema remains unchanged and functional

## Timeline Recommendation

**Week 1**: Set up new schemas, test in Studio
**Week 2**: Migrate 1-2 questions manually, test frontend
**Week 3**: Migrate remaining questions, add data points
**Week 4**: Add CTAs, test conversion flow
**Week 5**: Build out layers 4-7 with new content
**Week 6**: Deprecate legacy schema (keep for reference)

## Support

For questions or issues during migration:
- Review schema field descriptions in Sanity Studio
- Test GROQ queries in Sanity Vision
- Check frontend types match schema structure
