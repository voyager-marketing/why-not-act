# Update Sanity Schema Command

Add or modify Sanity CMS schema types for WhyNotAct.

## Context
- Schema files: `sanity/schemaTypes/`
- Main config: `sanity/sanity.config.ts`
- Export schemas from `sanity/schemaTypes/index.ts`
- Update TypeScript types in `types/form.ts` to match

## Steps
1. Understand what data structure is needed
2. Create or modify schema file in `sanity/schemaTypes/`
3. Export schema from `sanity/schemaTypes/index.ts`
4. Update TypeScript interfaces in `types/form.ts`
5. Update GROQ queries in `lib/queries.ts` if needed
6. Test in Sanity Studio at http://localhost:3333/studio

## Schema Template
```typescript
import {defineType, defineField} from 'sanity'

export const myType = defineType({
  name: 'myType',
  title: 'My Type',
  type: 'document',
  fields: [
    defineField({
      name: 'fieldName',
      title: 'Field Title',
      type: 'string', // string, number, text, array, object, etc.
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'arrayField',
      title: 'Array Field',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})
```

## Don't Forget
- Add to `schemaTypes` array in `sanity/schemaTypes/index.ts`
- Update TypeScript types
- Update queries to fetch new fields
- Restart dev server for schema changes
