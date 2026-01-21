# WhyNotAct - Project Context for Claude

An interactive political action platform helping Americans explore immigration policy through their own ideological lens. Users progress through a multi-layer persuasion architecture, ultimately connecting with meaningful civic actions.

## Quick Reference

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check
npm run sanity:test  # Test Sanity CMS connection
```

**Key paths:** `@/*` maps to project root. Use `@/components`, `@/lib`, `@/types`.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.x |
| UI | React + TypeScript | 19.x / 5.x |
| Styling | Tailwind CSS 4 + shadcn/ui | Latest |
| Animation | Framer Motion | 12.x |
| State | Zustand (persisted) | 5.x |
| Forms | React Hook Form + Zod | 7.x / 4.x |
| CMS | Sanity | 3.x |
| Deployment | Vercel | - |

---

## Architecture Overview

### Multi-Layer Persuasion System

The core UX is a 6-layer journey that adapts content based on political ideology:

```
Layer 1: Value Alignment    → Questions framed per ideology
Layer 2: Data Reality       → Statistics with ideology-specific interpretation
Layer 3: Solution Intro     → Pathway framing matched to values
Layer 4: Impact Visual      → Consequence visualization
Layer 5: Reflection         → Commitment-building questions
Layer 6: Call-to-Action     → Petitions, donations, contacts
```

**Key file:** [components/layers/LayerRenderer.tsx](components/layers/LayerRenderer.tsx) orchestrates the flow.

### Ideology Theming

Four political lenses with distinct visual/linguistic identities:

| Lens | Icon Set | Tone | User Pronoun |
|------|----------|------|--------------|
| `far-right` | Security (Shield, Lock) | Protective | "Patriot" |
| `center-right` | Business (Briefcase) | Pragmatic | "Taxpayer" |
| `center-left` | Community (Users, Heart) | Compassionate | "Neighbor" |
| `far-left` | Justice (Scale, Megaphone) | Revolutionary | "Comrade" |

**Key file:** [lib/themes.ts](lib/themes.ts) defines colors (OKLCH), language, and icon mappings.

### State Management

Use `journeyStore` (not the deprecated `formStore`):

```typescript
import { useJourneyStore, usePoliticalLens } from '@/lib/journeyStore'

// Selectors for common patterns
const lens = usePoliticalLens()
const { currentLayer, completedLayers } = useJourneyProgress()
```

---

## Code Patterns

### Component Structure

```typescript
'use client' // Only when needed (hooks, interactivity, browser APIs)

import type { Theme } from '@/types/form'
import { cn } from '@/lib/utils'

interface ComponentNameProps {
  theme: Theme
  onComplete?: () => void
}

export default function ComponentName({ theme, onComplete }: ComponentNameProps) {
  return (
    <div className={cn('base-classes', theme === 'far-right' && 'theme-specific')}>
      {/* Content */}
    </div>
  )
}
```

**Conventions:**
- Default exports for components
- Interface named `{ComponentName}Props`
- Use `cn()` from `@/lib/utils` for conditional classes
- Destructure props in function signature

### Server vs Client Components

- **Server (default):** Pages, layouts, data fetching components
- **Client (`'use client'`):** Anything with hooks, event handlers, browser APIs, Framer Motion

```typescript
// Server component fetching Sanity data
import { client } from '@/lib/sanity.client'

export default async function Page() {
  const data = await client.fetch(query)
  return <ClientComponent data={data} />
}
```

### Sanity CMS Queries

GROQ queries live in `lib/queries.ts` or domain-specific files:

```typescript
import { client } from '@/lib/sanity.client'

// Fetch with type safety
const questions = await client.fetch<LayeredQuestion[]>(
  `*[_type == "layeredQuestion"] { ... }`
)
```

**Schema files:** `sanity/schemaTypes/` - modify here, run migrations with `npm run migrate:*`

### Form Handling

React Hook Form + Zod for validation:

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
})

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
})
```

### Animation Patterns

Framer Motion for transitions between layers:

```typescript
import { motion, AnimatePresence } from 'framer-motion'

<AnimatePresence mode="wait">
  <motion.div
    key={uniqueKey}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

---

## File Organization

```
app/                    # Next.js App Router pages
  journey/[lens]/       # Main user journey (dynamic route)
  studio/               # Sanity Studio (embedded)
  api/                  # API routes

components/
  layers/               # Persuasion layer components
  ui/                   # shadcn/ui primitives (don't modify directly)
  *.tsx                 # Feature components

lib/
  journeyStore.ts       # Zustand store (use this, not formStore)
  themes.ts             # Ideology theme configurations
  sanity.client.ts      # CMS client
  queries.ts            # GROQ queries
  utils.ts              # Helpers (cn, etc.)

types/
  form.ts               # Theme, Answer, and form types
  journey.ts            # Journey-related types
  sanity.ts             # CMS schema types

sanity/
  schemaTypes/          # CMS content models
```

---

## Working with This Codebase

### Before Making Changes

1. Understand which layer/component you're modifying
2. Check if content comes from Sanity or is hardcoded
3. Consider all 4 ideology themes - changes should work across all

### Adding New Components

1. Determine server vs client requirement
2. Place in `components/` (or `components/layers/` for journey steps)
3. Follow existing naming and prop patterns
4. Ensure theme-awareness if the component shows ideology-specific content

### Modifying the Journey Flow

The layer sequence is defined in [LayerRenderer.tsx](components/layers/LayerRenderer.tsx). Each layer component receives:
- `theme`: Current political ideology
- `onComplete`: Callback to advance to next layer
- `answers`: User's responses (where applicable)

### Sanity Schema Changes

1. Modify schema in `sanity/schemaTypes/`
2. Update TypeScript types in `types/sanity.ts`
3. Run migration script or manually update content in Studio (`/studio`)

---

## Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-13
SANITY_API_TOKEN=xxx  # Only for migrations/writes
```

---

## Common Tasks

### Add a shadcn/ui component

```bash
npx shadcn@latest add [component-name]
```

### Test Sanity connection

```bash
npm run sanity:test
```

### Deploy to Vercel

```bash
vercel deploy --prod
```

---

## Decision Guidelines

**Ask before:**
- Architectural changes affecting multiple layers
- New dependencies or significant library additions
- Changes to the 4-ideology theme system structure
- Database/CMS schema modifications

**Proceed with judgment:**
- Bug fixes with obvious solutions
- Styling adjustments within existing patterns
- Adding new components following established conventions
- Performance optimizations

---

## Testing Approach

Focus testing on:
- Complex scoring/calculation logic in `journeyStore`
- API route handlers (`app/api/`)
- Utility functions in `lib/`
- Form validation schemas

Skip testing for:
- Simple presentational components
- shadcn/ui primitives
- Straightforward data fetching

When adding tests, use Vitest (not yet configured - set up when needed).

---

## Links

- **Live site:** https://why-not-act.vercel.app
- **Sanity Studio:** https://why-not-act.vercel.app/studio
- **Sanity Dashboard:** https://www.sanity.io/manage