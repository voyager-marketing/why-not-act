# Debug Issue Command

Systematically debug issues in the WhyNotAct application.

## Debugging Checklist

### 1. Identify the Issue
- What is the error message?
- Where does it occur? (which file/line)
- When does it happen? (which user action triggers it)
- What were you trying to do?

### 2. Check Common Issues
- **Client/Server component mismatch**: Event handlers in Server Components?
- **Null/undefined values**: Check Sanity data completeness
- **State not updating**: Check Zustand store updates, may need setTimeout
- **Theme mapping**: Verify URL format → camelCase conversion
- **Async params**: Using `await params` in Next.js 15?

### 3. Investigation Steps
1. Read the error file and surrounding context
2. Check browser console for client-side errors
3. Check terminal for server-side errors
4. Verify Sanity data exists and is complete
5. Check type definitions match actual data
6. Review recent changes

### 4. Fix and Verify
1. Apply fix with proper error handling
2. Test the specific scenario that failed
3. Test edge cases
4. Verify build still passes: `npm run build`

## Quick Fixes Reference

**Null safety:**
```typescript
if (!data || !Array.isArray(data.items)) {
  return <ErrorComponent />
}
```

**Client component:**
```typescript
'use client'
// At top of file when using hooks/events
```

**Zustand state:**
```typescript
// Read after update
setTimeout(() => {
  const value = useStore.getState().value
}, 0)
```
