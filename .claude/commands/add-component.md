# Add Component Command

Create a new React component for the WhyNotAct application following project conventions.

## Context
- Stack: Next.js 15 + TypeScript + Tailwind CSS
- Component location: `components/`
- Always use proper TypeScript types from `types/form.ts`
- Client components need `'use client'` directive
- Follow existing naming conventions

## Steps
1. Ask user for component name and purpose
2. Determine if it needs to be a client component (has interactivity/hooks)
3. Create component with:
   - Proper TypeScript interfaces
   - Tailwind styling consistent with existing components
   - Error handling and null safety
   - Accessibility features (aria labels, keyboard nav)
4. Add component to appropriate page/parent component
5. Test the component works

## Example Structure
```typescript
'use client' // Only if needed

import type {SomeType} from '@/types/form'

interface Props {
  // Define props with TypeScript
}

export default function ComponentName({prop}: Props) {
  // Component logic
  return (
    // JSX with Tailwind classes
  )
}
```
