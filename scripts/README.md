# Migration Scripts

This directory contains scripts for migrating content into Sanity CMS.

## Immigration Content Migration

### Overview

The `migrate-immigration-content.ts` script migrates hardcoded immigration content from the frontend components into Sanity CMS:

- **Layer 2 (Value Alignment)**: 3 value-based questions from `ValueAlignmentLayer.tsx`
- **Layer 3 (Data Reality)**: 3 data points from `DataRealityLayer.tsx`

### Prerequisites

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables** in `.env.local`:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-11-13
   SANITY_API_TOKEN=your-write-token
   ```

3. **Get a Sanity write token**:
   - Go to https://www.sanity.io/manage
   - Select your project
   - Navigate to **API** > **Tokens**
   - Create a new token with **Editor** permissions
   - Copy the token and add it to `.env.local` as `SANITY_API_TOKEN`

### Running the Migration

```bash
npm run migrate:content
```

### What Gets Created

#### Layer 2: Value Alignment Questions (3 documents)

Each question document includes:
- `_type`: `layeredQuestion`
- `layer`: `layer2`
- `questionType`: `values`
- `order`: 1, 2, or 3
- Ideology-specific framings:
  - `farRightFraming`
  - `centerRightFraming`
  - `centerLeftFraming`
  - `farLeftFraming`
- `persuasionWeight`: 70 (high weight for value alignment)
- `isGatekeeping`: true (all Layer 2 questions are gatekeeping)
- `tags`: ['immigration', 'values', 'layer2']

**Document IDs**:
- `question-layer2-immigration-q1`
- `question-layer2-immigration-q2`
- `question-layer2-immigration-q3`

#### Layer 3: Data Reality Points (3 documents)

Each data point document includes:
- `_type`: `dataPoint`
- `category`: 'economic' or 'security'
- `statistic`: Extracted key statistic
- `neutralContext`: The full fact text
- Ideology-specific interpretations:
  - `farRightInterpretation`
  - `centerRightInterpretation`
  - `centerLeftInterpretation`
  - `farLeftInterpretation`
- `visualization`: Display settings
- `tags`: ['immigration', 'facts', 'layer3']

**Document IDs**:
- `datapoint-layer3-deportation-cost`
- `datapoint-layer3-criminal-record`
- `datapoint-layer3-fine-revenue`

### After Migration

1. **Review in Sanity Studio**:
   - Open http://localhost:3000/studio (or your Studio URL)
   - Navigate to **Layered Questions** and **Data Points**
   - Review all created documents

2. **Update Data Sources**:
   - Add proper source citations
   - Add source URLs
   - Verify statistics
   - Update `yearCollected` field
   - Mark `isVerified: true` when fact-checked

3. **Update Frontend Components**:
   - Modify `ValueAlignmentLayer.tsx` to fetch from Sanity
   - Modify `DataRealityLayer.tsx` to fetch from Sanity
   - Remove hardcoded content arrays

### Troubleshooting

**Error: Missing SANITY_API_TOKEN**
- Make sure you've created a write token in Sanity and added it to `.env.local`

**Error: Permission denied**
- Ensure your token has **Editor** or **Administrator** permissions

**Error: Document validation failed**
- Check that your Sanity schema types are up to date
- Review the schema definitions in `sanity/schemaTypes/`

**Documents not appearing in Studio**
- Make sure you've deployed your schema: `npm run sanity:deploy`
- Refresh your browser

### Script Details

The migration script uses `createOrReplace`, which means:
- Running it multiple times is safe (idempotent)
- Existing documents with the same ID will be updated
- No duplicate documents will be created

### Content Mapping

#### Theme Names

The frontend uses different theme names than Sanity:

| Frontend | Sanity Schema |
|----------|---------------|
| `far-right` | `farRightFraming` |
| `mid-right` | `centerRightFraming` |
| `mid-left` | `centerLeftFraming` |
| `far-left` | `farLeftFraming` |

The migration script handles this mapping automatically.

### Next Steps

After successful migration:

1. Create GROQ queries to fetch this content
2. Update components to use Sanity data
3. Add content management workflows
4. Consider adding more layers (Layer 4-7)
5. Implement analytics to track user engagement
