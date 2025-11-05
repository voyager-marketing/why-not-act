# WhyNotAct - Interactive Form Application
## Implementation Guide for Claude Code (VS Code)

---

## Project Overview

Interactive multi-step form that routes users through themed political questions and directs them to specific result pages with conditional CTAs.

### Tech Stack
- **Next.js 15** (App Router) + TypeScript
- **React Hook Form** + Zod validation
- **Zustand** for state management
- **Sanity CMS** for content management (super simple schema)
- **Tailwind CSS** for styling

---

## Architecture Flow

```
Landing Page (Theme Selection)
  ↓
[Far Left | Mid Left | Mid Right | Far Right]
  ↓
Question 1-5 (Yes/No/Maybe) - with themed framing
  ↓
Scoring System (Yes=2, Maybe=1, No=0, Max=10)
  ↓
Result Router (based on score + theme)
  ↓
4 Result Pages:
  - Revenue Generation (Red)
  - Economic Impact (Gray)
  - National Security (Black)
  - Demographic Impact (Yellow)
  ↓
Conditional CTAs based on result page
```

---

## File Structure

```
why-not-act/
├── app/
│   ├── page.tsx                          # Landing page (theme selection)
│   ├── layout.tsx                        # Root layout
│   ├── form/[theme]/page.tsx             # Multi-step form
│   └── result/[type]/page.tsx            # Result pages
├── components/
│   ├── ThemeSelector.tsx                 # Theme selection UI
│   ├── FormWizard.tsx                    # Multi-step form container
│   ├── QuestionStep.tsx                  # Individual question step
│   ├── ResultCard.tsx                    # Result page content
│   └── CTASection.tsx                    # Conditional CTAs
├── lib/
│   ├── formStore.ts                      # Zustand store for form state
│   ├── resultRouter.ts                   # Logic to determine result page
│   ├── sanity.client.ts                  # Sanity client config
│   └── queries.ts                        # GROQ queries for Sanity
├── types/
│   └── form.ts                           # TypeScript types
├── sanity/
│   ├── sanity.config.ts                  # Sanity configuration
│   └── schemaTypes/
│       ├── index.ts
│       └── question.ts                   # Question schema (ALREADY CREATED)
└── .env.local                            # Environment variables
```

---

## Already Completed

✅ Next.js 15 project initialized
✅ Dependencies installed:
   - react-hook-form
   - zod
   - zustand
   - @hookform/resolvers
   - next-sanity
   - sanity
   - @sanity/vision
✅ Sanity schema created (`sanity/schemaTypes/question.ts`)
✅ Sanity config created (`sanity/sanity.config.ts`)

---

## Sanity Schema (Super Simple)

**Schema: `question`**

Fields:
- `order` (number 1-5)
- `topic` (string) - e.g., "Immigration Fine System"
- `coreIdea` (text) - The main question
- `farLeftHeadline` (string)
- `farLeftBullets` (array of strings)
- `midLeftHeadline` (string)
- `midLeftBullets` (array of strings)
- `midRightHeadline` (string)
- `midRightBullets` (array of strings)
- `farRightHeadline` (string)
- `farRightBullets` (array of strings)

**Client can edit questions in Sanity Studio without touching code.**

---

## Step-by-Step Implementation

### 1. Set Up Sanity Studio

**Create Sanity project:**
```bash
# You'll need to create a Sanity project at sanity.io/manage
# Then add the project ID to .env.local
```

**Add to `.env.local`:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-04
```

**Add Sanity Studio route (`app/studio/[[...tool]]/page.tsx`):**
```typescript
import {NextStudio} from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export const dynamic = 'force-static'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

---

### 2. Create TypeScript Types

**`types/form.ts`:**
```typescript
export type Theme = 'far-left' | 'mid-left' | 'mid-right' | 'far-right'

export type Answer = 'yes' | 'no' | 'maybe'

export interface ThemedFraming {
  headline: string
  bullets: string[]
}

export interface Question {
  order: number
  topic: string
  coreIdea: string
  farLeft: ThemedFraming
  midLeft: ThemedFraming
  midRight: ThemedFraming
  farRight: ThemedFraming
}

export interface FormState {
  theme: Theme | null
  answers: Record<number, Answer>
  score: number
}

export type ResultType = 'revenue' | 'economic' | 'security' | 'demographic'
```

---

### 3. Create Zustand Store

**`lib/formStore.ts`:**
```typescript
import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import type {Theme, Answer, FormState} from '@/types/form'

interface FormStore extends FormState {
  setTheme: (theme: Theme) => void
  setAnswer: (questionId: number, answer: Answer) => void
  calculateScore: () => void
  reset: () => void
}

const scoreMap: Record<Answer, number> = {
  yes: 2,
  maybe: 1,
  no: 0,
}

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      theme: null,
      answers: {},
      score: 0,

      setTheme: (theme) => set({theme}),

      setAnswer: (questionId, answer) =>
        set((state) => ({
          answers: {...state.answers, [questionId]: answer},
        })),

      calculateScore: () => {
        const {answers} = get()
        const score = Object.values(answers).reduce(
          (total, answer) => total + scoreMap[answer],
          0
        )
        set({score})
      },

      reset: () => set({theme: null, answers: {}, score: 0}),
    }),
    {name: 'whynotact-form'}
  )
)
```

---

### 4. Result Routing Logic

**`lib/resultRouter.ts`:**
```typescript
import type {Theme, ResultType} from '@/types/form'

export function getResultType(score: number, theme: Theme): ResultType {
  const isLeft = theme === 'far-left' || theme === 'mid-left'
  const isRight = theme === 'mid-right' || theme === 'far-right'

  // High engagement (8-10 points)
  if (score >= 8) {
    return isLeft ? 'revenue' : 'security'
  }

  // Moderate engagement (4-7 points)
  if (score >= 4) {
    return isLeft ? 'economic' : 'demographic'
  }

  // Low engagement (0-3 points)
  return isLeft ? 'economic' : 'demographic'
}

export const RESULT_PAGE_CONTENT = {
  revenue: {
    title: 'Revenue Generation',
    color: 'bg-red-500',
    bullets: [
      'Generated from a fine of $30,000 collected from each Undocumented Immigrant',
      'Increase in the number of taxing paying members/companies into the US society',
      'Lowered impact to the costs of the healthcare system',
      'Increased number of legal applications for the banking industry',
      'Lowered risk of monetary flight of off-shored monies when faced with deportation',
      'Increased ability of Undocumented Immigrant owned companies to expand the US economy',
    ],
    ctas: ['petition', 'contact-reps'],
  },
  economic: {
    title: 'Economic Impact',
    color: 'bg-gray-500',
    bullets: [
      'Percent of Undocumented Immigrants working in Elder Care',
      'Percent of Undocumented Immigrants working in Construction',
      'Percent of Undocumented Immigrants working in Agriculture',
      'Percent of Undocumented Immigrants working in Logistics/Warehousing',
      'Percent of Undocumented Immigrants working in Transportation / Shipping',
      'Percent of Undocumented Immigrants working in Manufacturing',
    ],
    ctas: ['donation', 'spread-word'],
  },
  security: {
    title: 'National Security',
    color: 'bg-black',
    bullets: [
      'By applying the collected fines, the Border Wall could be more quickly and easily funded and built',
      'Lowers the mission of ICE in finding the criminal Undocumented Immigrant elements',
      'Creates safer and more table communities',
      'Could create a method for Undocumented Immigrants to join the military',
      'Could create more aligned and unified countries in the NORTHCOM / SOUTHCOM Area of Responsibility',
    ],
    ctas: ['spread-word', 'donation'],
  },
  demographic: {
    title: 'Demographic Impact',
    color: 'bg-yellow-500',
    bullets: [
      'Future population growth with and without Undocumented Immigrants',
      'Increase the tax base of the of smaller communities currently struggling to keep their infrastructures intact',
      'Increased legal immigrants will reduce small town economies and increase overall participation in institutions like Schools (at all levels), Churches, Charities, etc...',
    ],
    ctas: ['contact-reps', 'petition'],
  },
}
```

---

### 5. Sanity Client

**`lib/sanity.client.ts`:**
```typescript
import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false,
})
```

**`lib/queries.ts`:**
```typescript
import {groq} from 'next-sanity'
import {client} from './sanity.client'
import type {Question} from '@/types/form'

export async function getQuestions(): Promise<Question[]> {
  const query = groq`*[_type == "question"] | order(order asc) {
    order,
    topic,
    coreIdea,
    "farLeft": {
      "headline": farLeftHeadline,
      "bullets": farLeftBullets
    },
    "midLeft": {
      "headline": midLeftHeadline,
      "bullets": midLeftBullets
    },
    "midRight": {
      "headline": midRightHeadline,
      "bullets": midRightBullets
    },
    "farRight": {
      "headline": farRightHeadline,
      "bullets": farRightBullets
    }
  }`

  return client.fetch(query)
}
```

---

### 6. Landing Page (Theme Selection)

**`app/page.tsx`:**
```typescript
'use client'

import {useRouter} from 'next/navigation'
import {useFormStore} from '@/lib/formStore'
import type {Theme} from '@/types/form'

export default function HomePage() {
  const router = useRouter()
  const setTheme = useFormStore((state) => state.setTheme)

  const handleThemeSelect = (theme: Theme) => {
    setTheme(theme)
    router.push(`/form/${theme}`)
  }

  const themes = [
    {id: 'far-left', label: 'Far Left', color: 'bg-blue-600'},
    {id: 'mid-left', label: 'Mid Left', color: 'bg-blue-400'},
    {id: 'mid-right', label: 'Mid Right', color: 'bg-red-400'},
    {id: 'far-right', label: 'Far Right', color: 'bg-red-600'},
  ]

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-4">WhyNotAct</h1>
        <p className="text-center text-gray-600 mb-12">
          Select your political perspective to begin
        </p>

        <div className="grid grid-cols-2 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id as Theme)}
              className={`${theme.color} text-white p-8 rounded-lg text-xl font-semibold hover:opacity-90 transition`}
            >
              {theme.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
```

---

### 7. Multi-Step Form

**`app/form/[theme]/page.tsx`:**
```typescript
import {getQuestions} from '@/lib/queries'
import FormWizard from '@/components/FormWizard'

export default async function FormPage({params}: {params: Promise<{theme: string}>}) {
  const {theme} = await params
  const questions = await getQuestions()

  return <FormWizard questions={questions} theme={theme} />
}
```

**`components/FormWizard.tsx`:**
```typescript
'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useFormStore} from '@/lib/formStore'
import {getResultType} from '@/lib/resultRouter'
import QuestionStep from './QuestionStep'
import type {Question, Theme} from '@/types/form'

interface Props {
  questions: Question[]
  theme: string
}

export default function FormWizard({questions, theme}: Props) {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()
  const {setAnswer, calculateScore, score} = useFormStore()

  const currentQuestion = questions[currentStep]

  const handleAnswer = (answer: 'yes' | 'no' | 'maybe') => {
    setAnswer(currentQuestion.order, answer)

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Final question - calculate score and route
      calculateScore()
      const resultType = getResultType(score, theme as Theme)
      router.push(`/result/${resultType}`)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="max-w-3xl w-full">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600 capitalize">{theme.replace('-', ' ')}</span>
          </div>
          <div className="w-full bg-gray-300 h-2 rounded">
            <div
              className="bg-blue-600 h-2 rounded transition-all"
              style={{width: `${((currentStep + 1) / questions.length) * 100}%`}}
            />
          </div>
        </div>

        <QuestionStep
          question={currentQuestion}
          theme={theme as Theme}
          onAnswer={handleAnswer}
        />
      </div>
    </main>
  )
}
```

**`components/QuestionStep.tsx`:**
```typescript
import type {Question, Theme, Answer} from '@/types/form'

interface Props {
  question: Question
  theme: Theme
  onAnswer: (answer: Answer) => void
}

export default function QuestionStep({question, theme, onAnswer}: Props) {
  const themeKey = theme.replace('-', '') as 'farLeft' | 'midLeft' | 'midRight' | 'farRight'
  const themedContent = question[themeKey]

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">{question.coreIdea}</h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">{themedContent.headline}</h3>
        <ul className="list-disc list-inside space-y-2">
          {themedContent.bullets.map((bullet, idx) => (
            <li key={idx} className="text-gray-700">{bullet}</li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => onAnswer('yes')}
          className="flex-1 bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Yes
        </button>
        <button
          onClick={() => onAnswer('maybe')}
          className="flex-1 bg-yellow-500 text-white py-4 rounded-lg font-semibold hover:bg-yellow-600 transition"
        >
          Maybe
        </button>
        <button
          onClick={() => onAnswer('no')}
          className="flex-1 bg-red-500 text-white py-4 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          No
        </button>
      </div>
    </div>
  )
}
```

---

### 8. Result Pages

**`app/result/[type]/page.tsx`:**
```typescript
import {RESULT_PAGE_CONTENT} from '@/lib/resultRouter'
import CTASection from '@/components/CTASection'
import type {ResultType} from '@/types/form'

export default async function ResultPage({params}: {params: Promise<{type: ResultType}>}) {
  const {type} = await params
  const content = RESULT_PAGE_CONTENT[type]

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className={`${content.color} text-white rounded-lg shadow-lg p-12 mb-8`}>
          <h1 className="text-4xl font-bold mb-8">{content.title}</h1>
          <ul className="space-y-4">
            {content.bullets.map((bullet, idx) => (
              <li key={idx} className="text-lg">{bullet}</li>
            ))}
          </ul>
        </div>

        <CTASection ctas={content.ctas} />
      </div>
    </main>
  )
}
```

**`components/CTASection.tsx`:**
```typescript
interface Props {
  ctas: string[]
}

const CTA_CONFIG = {
  'spread-word': {
    label: 'Spread the Word',
    color: 'bg-red-500',
    action: () => console.log('Share functionality'),
  },
  'petition': {
    label: 'Sign the Petition',
    color: 'bg-yellow-500',
    action: () => console.log('Petition functionality'),
  },
  'donation': {
    label: 'Make a Donation',
    color: 'bg-green-500',
    action: () => console.log('Donation functionality'),
  },
  'contact-reps': {
    label: 'Contact Your Representatives',
    color: 'bg-blue-500',
    action: () => console.log('Contact functionality'),
  },
}

export default function CTASection({ctas}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {ctas.map((ctaKey) => {
        const cta = CTA_CONFIG[ctaKey as keyof typeof CTA_CONFIG]
        return (
          <button
            key={ctaKey}
            onClick={cta.action}
            className={`${cta.color} text-white py-6 rounded-lg text-xl font-semibold hover:opacity-90 transition`}
          >
            {cta.label}
          </button>
        )
      })}
    </div>
  )
}
```

---

## 5 Placeholder Questions for Sanity

**Use Sanity Studio to create these 5 questions:**

### Question 1: Immigration Fine System
- **Topic:** "Immigration Fine System"
- **Core Idea:** "What if it is as simple as a $30,000 fine per year?"
- **Far Left:** "How this idea will benefit the Underserved..." + bullets from diagram
- **Mid Left:** "Pursuit of Independence from Big Tech 2.0" + bullets
- **Mid Right:** "Legislative substance - tax engagement principles" + bullets
- **Far Right:** "Extra-legislative growth via civil disobedience" + bullets

### Question 2-5: Placeholder Topics
Create variations for:
- Border security funding
- Labor market impact
- Community integration
- Economic contribution

---

## Next Steps

1. **Create Sanity project** at sanity.io/manage
2. **Add environment variables** to `.env.local`
3. **Run Sanity Studio:** `npm run dev` then visit `/studio`
4. **Add 5 questions** through Sanity Studio interface
5. **Test the flow:** Landing → Form → Result
6. **Customize styling** with Tailwind
7. **Add social media UTM tracking** (future)
8. **Implement actual CTA functionality** (future)

---

## Development Commands

```bash
# Start Next.js dev server
npm run dev

# Access Sanity Studio
# http://localhost:3000/studio

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

---

## Key Features Delivered

✅ Super simple Sanity CMS schema
✅ Client can edit questions without code
✅ Multi-step form with themed content
✅ Scoring system (Yes=2, Maybe=1, No=0)
✅ Automatic routing to result pages
✅ Conditional CTAs based on results
✅ Responsive design with Tailwind
✅ State persistence (Zustand + localStorage)
✅ Type-safe with TypeScript

---

## Future Enhancements

- Social media integration (UTM tracking)
- Email capture
- Analytics (PostHog, Plausible)
- A/B testing different framings
- CMS for result page content
- Share functionality
- PDF report generation

---

**Ready to hand off to Claude Code in VS Code!**
