# DataRealityLayer - Sanity CMS Integration

## Overview

The `DataRealityLayer` component has been updated to fetch immigration facts from Sanity CMS instead of using hardcoded data. This enables content managers to update facts through the Sanity Studio without requiring code changes.

## Changes Made

### 1. Component Updates (`components/layers/DataRealityLayer.tsx`)

#### New Features
- **Dynamic Data Fetching**: Fetches data points from Sanity CMS via API route
- **Loading States**: Displays spinner while fetching data
- **Error Handling**: Graceful error handling with retry functionality
- **Empty State**: Handles cases where no data points are available
- **Props Support**: Accepts optional `initialFacts` prop for server-side rendering

#### Data Transformation
The component includes a `transformSanityDataToFacts()` function that maps Sanity data structure to the component's expected format:

```typescript
Sanity DataPoint → ImmigrationFact
├─ _id → id
├─ neutralContext → question
└─ Interpretations → lensSpecificFacts
   ├─ farLeftInterpretation.headline → lensSpecificFacts['far-left']
   ├─ centerLeftInterpretation.headline → lensSpecificFacts['center-left']
   ├─ centerRightInterpretation.headline → lensSpecificFacts['center-right']
   └─ farRightInterpretation.headline → lensSpecificFacts['far-right']
```

### 2. API Route (`app/api/data-points/route.ts`)

Created a new API endpoint for fetching data points:

#### GET `/api/data-points`
Fetches 3 data points from economic, security, or demographic categories.

**Response:**
```json
{
  "dataPoints": [...],
  "count": 3,
  "timestamp": "2025-01-13T10:30:00.000Z"
}
```

#### POST `/api/data-points`
Allows custom filtering with request body:

**Request Body:**
```json
{
  "categories": ["economic", "security", "demographic"],
  "limit": 3,
  "ideology": "farLeft" // optional
}
```

### 3. Query Helper Functions (`lib/dataPointQueries.ts`)

Created reusable server-side functions for data fetching:

- `getDataRealityFacts()` - Fetch 3 facts for the Data Reality Layer
- `getDataPointsByCategory(category, limit)` - Fetch by specific category
- `getVerifiedDataPoints()` - Fetch all verified data points
- `getDataPointById(id)` - Fetch single data point by ID

## GROQ Query

The component uses the following GROQ query to fetch data:

```groq
*[_type == "dataPoint" && category in ["economic", "security", "demographic"]]
  | order(_createdAt asc) [0...3] {
    _id,
    "id": _id,
    statistic,
    neutralContext,
    farRightInterpretation {
      headline,
      explanation,
      implication
    },
    centerRightInterpretation {
      headline,
      explanation,
      implication
    },
    centerLeftInterpretation {
      headline,
      explanation,
      implication
    },
    farLeftInterpretation {
      headline,
      explanation,
      implication
    },
    source,
    sourceUrl,
    yearCollected,
    isVerified,
    visualization {
      type,
      animationStyle,
      colorScheme
    }
  }
```

## Usage

### Client-Side Fetching (Default)
```tsx
<DataRealityLayer
  theme={theme}
  onComplete={handleComplete}
/>
```

### Server-Side Rendering (Optional)
```tsx
// In server component
import { getDataRealityFacts } from '@/lib/dataPointQueries'

const facts = await getDataRealityFacts()
const transformedFacts = transformSanityDataToFacts(facts)

// Pass to client component
<DataRealityLayer
  theme={theme}
  onComplete={handleComplete}
  initialFacts={transformedFacts}
/>
```

## Sanity Schema Requirements

The component expects data points in Sanity with this structure:

```typescript
{
  _type: "dataPoint",
  category: "economic" | "security" | "demographic",
  statistic: string,
  neutralContext: string,
  farRightInterpretation: {
    headline: string,
    explanation: string,
    implication: string
  },
  centerRightInterpretation: { ... },
  centerLeftInterpretation: { ... },
  farLeftInterpretation: { ... },
  source: string,
  sourceUrl: string,
  isVerified: boolean
}
```

## State Management

The component maintains several states:
- `facts` - Array of fetched immigration facts
- `isLoading` - Boolean for loading state
- `error` - Error message if fetch fails
- `answeredFacts` - Set of fact IDs that have been answered

## Error Handling

1. **Network Errors**: Displays error card with retry button
2. **Empty Results**: Shows "No Facts Available" message with continue button
3. **Fallback**: Falls back to empty array on error, preventing crashes

## Loading States

### Loading
- Displays animated spinner
- Shows "Loading facts..." message
- Prevents rendering of other content

### Error
- Shows error icon and message
- Provides "Try Again" button
- Uses red color scheme for visibility

### Empty
- Shows info icon
- Displays helpful message
- Provides "Continue" button to skip layer

## Existing Functionality Preserved

All existing features remain intact:
- ✅ Scroll animations with `useInView`
- ✅ Progress tracking
- ✅ Journey store integration
- ✅ "I Knew This" / "This Is New to Me" buttons
- ✅ Feedback messages
- ✅ Transition text when all facts are answered
- ✅ Continue button
- ✅ Lens-specific fact display

## Testing

To test the component:

1. **Add Data Points in Sanity Studio**
   - Create at least 3 data points
   - Set category as "economic", "security", or "demographic"
   - Fill in all interpretation headlines

2. **Test Loading State**
   - Throttle network in DevTools
   - Should see spinner while loading

3. **Test Error State**
   - Disable network
   - Should see error message with retry button

4. **Test Empty State**
   - Remove all data points from Sanity
   - Should see "No Facts Available" message

5. **Test Normal Flow**
   - Add data points back
   - Verify facts display correctly for each political lens
   - Verify progress tracking works
   - Verify continue button appears after all facts answered

## Performance Considerations

- **Client-Side Fetching**: Fetches on component mount, may show loading state
- **Server-Side Option**: Pass `initialFacts` prop to avoid loading state
- **Caching**: API route doesn't cache by default; consider adding `revalidate` for static generation
- **Error Boundary**: Component handles errors gracefully without crashing

## Migration Notes

No migration required. The component works immediately with existing code:
- Old hardcoded data is removed
- Component fetches from Sanity automatically
- If Sanity is not configured or has no data, shows appropriate messages

## Future Enhancements

Potential improvements:
1. Add caching/SWR for better performance
2. Add prefetching in parent component
3. Add data point versioning/history
4. Add A/B testing for different fact presentations
5. Add analytics tracking for which facts are most engaging
6. Add filters for fact selection based on user journey
