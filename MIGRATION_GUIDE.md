# Immigration Content Migration Guide

This guide walks you through migrating Layer 2 and Layer 3 immigration content from hardcoded arrays to Sanity CMS.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Setup](#setup)
4. [Running the Migration](#running-the-migration)
5. [Verification](#verification)
6. [Next Steps](#next-steps)
7. [Troubleshooting](#troubleshooting)

---

## Overview

This migration moves content from:
- `components/layers/ValueAlignmentLayer.tsx` (Layer 2 - Value Alignment)
- `components/layers/DataRealityLayer.tsx` (Layer 3 - Data Reality)

Into Sanity CMS for centralized content management.

**What gets migrated:**
- 3 Layer 2 value alignment questions with ideology-specific framings
- 3 Layer 3 data points with ideology-specific interpretations

---

## Prerequisites

### 1. Node.js and npm
Ensure you have Node.js installed (v18 or higher recommended).

### 2. Sanity Project
You need an active Sanity project. If you haven't set one up yet:
```bash
npm run sanity:init
```

### 3. Required Packages
Install dependencies (includes `tsx` for running TypeScript scripts):
```bash
npm install
```

---

## Setup

### Step 1: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Get your Sanity Project ID and Dataset:
   - Go to https://www.sanity.io/manage
   - Select your project
   - Copy the **Project ID** and **Dataset** name

3. Create a Sanity API Token:
   - In the Sanity Management UI, go to **API** > **Tokens**
   - Click **Add API Token**
   - Name it "Migration Script"
   - Set permissions to **Editor** (or Administrator)
   - Copy the token (you won't be able to see it again!)

4. Update your `.env.local`:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz  # Your project ID
   NEXT_PUBLIC_SANITY_DATASET=production    # Your dataset name
   NEXT_PUBLIC_SANITY_API_VERSION=2024-11-13
   SANITY_API_TOKEN=skAbCdEfG...            # Your write token
   ```

### Step 2: Test Your Connection

Before running the migration, verify your Sanity configuration:

```bash
npm run sanity:test
```

This will:
- Check all environment variables are present
- Test read access to your Sanity dataset
- Test write permissions with a temporary document
- Clean up after itself

If all tests pass, you'll see:
```
🎉 All tests passed! Your Sanity connection is working correctly.
```

If any test fails, follow the error messages to fix the issue.

---

## Running the Migration

### Execute the Migration Script

```bash
npm run migrate:content
```

### What Happens During Migration

The script will:

1. **Validate environment variables** - Ensures all required config is present
2. **Create Layer 2 questions** - 3 value alignment questions
3. **Create Layer 3 data points** - 3 immigration facts with interpretations
4. **Display progress** - Real-time feedback for each document created
5. **Show summary** - Final count of migrated documents

### Expected Output

```
🚀 Immigration Content Migration Started
=========================================

📝 Starting Layer 2 (Value Alignment) migration...

Creating question 1/3: immigration-q1
✅ Created: question-layer2-immigration-q1
Creating question 2/3: immigration-q2
✅ Created: question-layer2-immigration-q2
Creating question 3/3: immigration-q3
✅ Created: question-layer2-immigration-q3

✨ Successfully migrated 3 Layer 2 questions

📊 Starting Layer 3 (Data Reality) migration...

Creating data point 1/3: deportation-cost
✅ Created: datapoint-layer3-deportation-cost
Creating data point 2/3: criminal-record
✅ Created: datapoint-layer3-criminal-record
Creating data point 3/3: fine-revenue
✅ Created: datapoint-layer3-fine-revenue

✨ Successfully migrated 3 Layer 3 data points

🎉 Migration Complete!
=====================

✅ Created 3 Layer 2 questions
✅ Created 3 Layer 3 data points
📊 Total documents: 6
```

### Safe to Run Multiple Times

The script uses `createOrReplace`, which means:
- It's **idempotent** - running it multiple times won't create duplicates
- Existing documents will be **updated** with the latest content
- Document IDs remain the same

---

## Verification

### 1. Check Sanity Studio

Open your Sanity Studio:
```bash
npm run dev
# Then navigate to http://localhost:3000/studio
```

You should see:
- **Layered Questions** section with 3 documents (L2.1, L2.2, L2.3)
- **Data Points** section with 3 documents

### 2. Review Document Content

Click on each document to verify:

**Layer 2 Questions:**
- ✅ Layer is set to "Layer 2: Immediate Concerns"
- ✅ Question Type is "Values Exploration"
- ✅ Order is 1, 2, or 3
- ✅ All four ideology framings are present (Far Right, Center Right, Center Left, Far Left)
- ✅ Persuasion Weight is 70
- ✅ Is Gatekeeping is checked
- ✅ Tags include: immigration, values, layer2

**Layer 3 Data Points:**
- ✅ Category is set (Economic or Security)
- ✅ Statistic and context are filled in
- ✅ All four ideology interpretations are present
- ✅ Tags include: immigration, facts, layer3
- ⚠️ `isVerified` is false (requires fact-checking)
- ⚠️ Source is placeholder text (needs updating)

### 3. Test GROQ Queries

In Sanity Studio's Vision tool (or in your code), test the queries:

```groq
// Fetch all Layer 2 questions
*[_type == "layeredQuestion" && layer == "layer2"] | order(order asc)

// Fetch all Layer 3 data points
*[_type == "dataPoint" && "immigration" in tags]
```

---

## Next Steps

### 1. Review and Update Data Sources

For each data point:
1. Verify the statistic is accurate
2. Add proper source citation
3. Add source URL
4. Update `yearCollected`
5. Mark `isVerified: true` when fact-checked

### 2. Deploy Schema (if needed)

If you made schema changes:
```bash
npm run sanity:deploy
```

### 3. Update Frontend Components

Modify your components to fetch from Sanity instead of using hardcoded arrays.

**Example for Layer 2:**

```typescript
// components/layers/ValueAlignmentLayer.tsx
import {client} from '@/lib/sanity.client'
import {LAYER2_QUESTIONS_QUERY, Layer2Question} from '@/lib/queries/immigration-queries'

// Fetch questions
const questions = await client.fetch<Layer2Question[]>(LAYER2_QUESTIONS_QUERY)

// Get question text for current theme
const questionText = getFramingForTheme(questions[0], theme)?.headline
```

**Example for Layer 3:**

```typescript
// components/layers/DataRealityLayer.tsx
import {client} from '@/lib/sanity.client'
import {LAYER3_DATAPOINTS_QUERY, Layer3DataPoint} from '@/lib/queries/immigration-queries'

// Fetch data points
const dataPoints = await client.fetch<Layer3DataPoint[]>(LAYER3_DATAPOINTS_QUERY)

// Get interpretation for current theme
const interpretation = getInterpretationForTheme(dataPoints[0], theme)
```

### 4. Remove Hardcoded Content

Once you've verified the Sanity data is working:
1. Remove the hardcoded arrays from your components
2. Delete or archive the old constants
3. Update any tests that relied on hardcoded data

---

## Troubleshooting

### "Missing SANITY_API_TOKEN" Error

**Problem:** You haven't added your write token to `.env.local`

**Solution:**
1. Create a token in Sanity (see Setup Step 1)
2. Add it to `.env.local` as `SANITY_API_TOKEN`
3. Restart any running dev servers

### "Permission Denied" Error

**Problem:** Your API token doesn't have write permissions

**Solution:**
1. Go to https://www.sanity.io/manage
2. Navigate to API > Tokens
3. Check your token has **Editor** or **Administrator** permissions
4. If not, create a new token with correct permissions

### "Document Validation Failed" Error

**Problem:** The document doesn't match the schema definition

**Solution:**
1. Check your schema files in `sanity/schemaTypes/`
2. Ensure `layeredQuestion.ts` and `dataPoint.ts` are up to date
3. Deploy your schema: `npm run sanity:deploy`
4. Try the migration again

### Documents Not Appearing in Studio

**Problem:** Documents are created but don't show up in the Studio

**Solution:**
1. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Check you're looking at the correct dataset
3. Verify schema is deployed: `npm run sanity:deploy`
4. Check browser console for errors

### "Module Not Found: tsx" Error

**Problem:** The `tsx` package isn't installed

**Solution:**
```bash
npm install --save-dev tsx
```

---

## Migration Script Reference

### Files Created

- `scripts/migrate-immigration-content.ts` - Main migration script
- `scripts/test-sanity-connection.ts` - Connection test script
- `scripts/README.md` - Script documentation
- `lib/queries/immigration-queries.ts` - GROQ queries and TypeScript types
- `.env.local.example` - Environment variable template

### Document IDs

**Layer 2 Questions:**
- `question-layer2-immigration-q1`
- `question-layer2-immigration-q2`
- `question-layer2-immigration-q3`

**Layer 3 Data Points:**
- `datapoint-layer3-deportation-cost`
- `datapoint-layer3-criminal-record`
- `datapoint-layer3-fine-revenue`

### Theme Name Mapping

| Frontend Code | Sanity Schema Field |
|---------------|---------------------|
| `far-right`   | `farRightFraming` / `farRightInterpretation` |
| `mid-right`   | `centerRightFraming` / `centerRightInterpretation` |
| `mid-left`    | `centerLeftFraming` / `centerLeftInterpretation` |
| `far-left`    | `farLeftFraming` / `farLeftInterpretation` |

---

## Questions or Issues?

If you encounter any issues not covered in this guide:

1. Check the Sanity documentation: https://www.sanity.io/docs
2. Review the script source code: `scripts/migrate-immigration-content.ts`
3. Test your connection: `npm run sanity:test`
4. Check Sanity Studio console for errors

---

**Happy migrating!** 🚀
