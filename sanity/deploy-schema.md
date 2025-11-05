# Deploy Schema to Your Sanity Project

## Option 1: Using Sanity CLI (Recommended)

1. **Update your `.env.local` with your new project details:**
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-new-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

2. **Install Sanity CLI globally (if not already):**
   ```bash
   npm install -g @sanity/cli
   ```

3. **Login to Sanity:**
   ```bash
   sanity login
   ```

4. **Deploy the schema from the project directory:**
   ```bash
   npx sanity schema deploy
   ```

   OR use the Sanity manage interface to deploy the schema.

## Option 2: Manual Schema Setup via Sanity Studio

1. Update `.env.local` with your project ID
2. Restart the dev server
3. Visit http://localhost:3001/studio
4. The schema from `sanity/schemaTypes/question.ts` will automatically be available

## Option 3: Copy Schema Directly in Sanity Manage

If you have access to your project's schema via the Sanity Manage interface:

1. Go to https://sanity.io/manage
2. Select your project
3. Go to "Vision" or "Schema" section
4. Copy the schema definition from `sanity/schemaTypes/question.ts`

The schema you need is already defined in:
- `sanity/schemaTypes/question.ts`
- `sanity/schemaTypes/index.ts`
- `sanity/sanity.config.ts`
