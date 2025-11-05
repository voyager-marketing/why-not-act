# Add Page Command

Create a new page route in the Next.js 15 app router.

## Context
- Using Next.js 15 App Router
- Pages go in `app/` directory
- Use Server Components by default, Client Components only when needed
- Dynamic routes use `[param]` syntax
- Async params in Next.js 15: `{params}: {params: Promise<{param: string}>}`

## Steps
1. Ask user for route path and purpose
2. Create appropriate directory structure in `app/`
3. Create `page.tsx` with:
   - Proper async/await for params (Next.js 15 requirement)
   - Server Component by default
   - Error handling
   - Loading states if needed
4. Add any required layout.tsx if needed
5. Update navigation/links if applicable
6. Test the route works

## Example
```typescript
// app/new-route/[id]/page.tsx
import type {SomeType} from '@/types/form'

export default async function NewPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params
  
  // Server-side data fetching
  
  return (
    <main>
      {/* Page content */}
    </main>
  )
}
```
