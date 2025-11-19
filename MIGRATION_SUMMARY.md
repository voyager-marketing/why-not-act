# Migration Script - Quick Summary

## What Was Created

### 1. Migration Script
**File:** `scripts/migrate-immigration-content.ts`

Main migration script that:
- Creates 3 Layer 2 (Value Alignment) questions in Sanity
- Creates 3 Layer 3 (Data Reality) data points in Sanity
- Uses exact content from hardcoded arrays in frontend components
- Includes error handling and progress logging
- Safe to run multiple times (idempotent)

### 2. Connection Test Script
**File:** `scripts/test-sanity-connection.ts`

Verification script that:
- Checks all environment variables
- Tests read access to Sanity
- Tests write permissions
- Cleans up after itself

### 3. GROQ Queries
**File:** `lib/queries/immigration-queries.ts`

Query library with:
- Pre-built GROQ queries for fetching Layer 2 & 3 content
- TypeScript interfaces for type safety
- Helper functions to get ideology-specific content
- Ready to use in your components

### 4. Documentation
**Files:**
- `scripts/README.md` - Script-specific documentation
- `MIGRATION_GUIDE.md` - Complete step-by-step guide
- `.env.local.example` - Environment variable template

### 5. Package.json Updates
**Added npm scripts:**
- `npm run sanity:test` - Test your Sanity connection
- `npm run migrate:content` - Run the migration
- Added `tsx` to devDependencies for running TypeScript scripts

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Create .env.local from template
cp .env.local.example .env.local

# Edit .env.local and add:
# - NEXT_PUBLIC_SANITY_PROJECT_ID
# - NEXT_PUBLIC_SANITY_DATASET
# - SANITY_API_TOKEN (get from sanity.io/manage)
```

### 3. Test Connection
```bash
npm run sanity:test
```

### 4. Run Migration
```bash
npm run migrate:content
```

### 5. Verify in Studio
```bash
npm run dev
# Open http://localhost:3000/studio
# Check "Layered Questions" and "Data Points"
```

---

## Content Migrated

### Layer 2: Value Alignment Questions (3)
From: `components/layers/ValueAlignmentLayer.tsx`

Each question includes 4 ideology-specific framings:
- Far Right
- Center Right (mid-right in code)
- Center Left (mid-left in code)
- Far Left

**Questions:**
1. Immigration law consequences / dignity and respect
2. Deportation priorities / pathways without separation
3. Fairness of rules / immigrants' positive contributions

### Layer 3: Data Reality Points (3)
From: `components/layers/DataRealityLayer.tsx`

Each data point includes 4 ideology-specific interpretations:
- Far Right
- Center Right (mid-right in code)
- Center Left (mid-left in code)
- Far Left

**Data Points:**
1. Deportation cost ($315B-$960B)
2. Criminal record statistics (90-95% no record)
3. Fine revenue potential ($330B)

---

## Using the Migrated Content

### In Your Components

Replace hardcoded arrays with Sanity queries:

```typescript
import {client} from '@/lib/sanity.client'
import {
  LAYER2_QUESTIONS_QUERY,
  LAYER3_DATAPOINTS_QUERY,
  getFramingForTheme,
  getInterpretationForTheme
} from '@/lib/queries/immigration-queries'

// Fetch Layer 2 questions
const questions = await client.fetch(LAYER2_QUESTIONS_QUERY)

// Get question text for user's theme
const questionText = getFramingForTheme(questions[0], userTheme)?.headline

// Fetch Layer 3 data points
const dataPoints = await client.fetch(LAYER3_DATAPOINTS_QUERY)

// Get data interpretation for user's theme
const fact = getInterpretationForTheme(dataPoints[0], userTheme)?.headline
```

---

## Document IDs in Sanity

### Layer 2 Questions
- `question-layer2-immigration-q1`
- `question-layer2-immigration-q2`
- `question-layer2-immigration-q3`

### Layer 3 Data Points
- `datapoint-layer3-deportation-cost`
- `datapoint-layer3-criminal-record`
- `datapoint-layer3-fine-revenue`

---

## Next Steps

1. ✅ Run migration: `npm run migrate:content`
2. ✅ Review documents in Sanity Studio
3. ⚠️ Update data sources and verify statistics
4. ⚠️ Add source URLs
5. ⚠️ Update frontend components to use Sanity
6. ⚠️ Remove hardcoded arrays from components
7. ⚠️ Test the full user journey

---

## Files Reference

```
why-not-act/
├── scripts/
│   ├── migrate-immigration-content.ts  # Main migration script
│   ├── test-sanity-connection.ts       # Connection test
│   └── README.md                        # Script documentation
├── lib/
│   └── queries/
│       └── immigration-queries.ts       # GROQ queries + types
├── .env.local.example                   # Environment template
├── MIGRATION_GUIDE.md                   # Complete guide
├── MIGRATION_SUMMARY.md                 # This file
└── package.json                         # Updated with scripts
```

---

## Troubleshooting

**Migration fails?**
- Run `npm run sanity:test` first
- Check `.env.local` has all required variables
- Verify your SANITY_API_TOKEN has Editor permissions

**Documents not showing?**
- Hard refresh browser (Ctrl+Shift+R)
- Run `npm run sanity:deploy` to deploy schema
- Check correct dataset in Sanity Studio

**Need to re-run?**
- Safe to run `npm run migrate:content` multiple times
- It uses `createOrReplace` so won't create duplicates

---

For detailed instructions, see `MIGRATION_GUIDE.md`
