import {defineType, defineField} from 'sanity'

export const questionType = defineType({
  name: 'question',
  title: 'Question',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Question Order',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'topic',
      title: 'Topic',
      type: 'string',
      description: 'Short topic name (e.g., "Immigration Fine System")',
    }),
    defineField({
      name: 'coreIdea',
      title: 'Core Question',
      type: 'text',
      description: 'The main question/idea presented to all users',
    }),
    // Far Left Framing
    defineField({
      name: 'farLeftHeadline',
      title: 'Far Left - Headline',
      type: 'string',
    }),
    defineField({
      name: 'farLeftBullets',
      title: 'Far Left - Bullet Points',
      type: 'array',
      of: [{type: 'string'}],
    }),
    // Mid Left Framing
    defineField({
      name: 'midLeftHeadline',
      title: 'Mid Left - Headline',
      type: 'string',
    }),
    defineField({
      name: 'midLeftBullets',
      title: 'Mid Left - Bullet Points',
      type: 'array',
      of: [{type: 'string'}],
    }),
    // Mid Right Framing
    defineField({
      name: 'midRightHeadline',
      title: 'Mid Right - Headline',
      type: 'string',
    }),
    defineField({
      name: 'midRightBullets',
      title: 'Mid Right - Bullet Points',
      type: 'array',
      of: [{type: 'string'}],
    }),
    // Far Right Framing
    defineField({
      name: 'farRightHeadline',
      title: 'Far Right - Headline',
      type: 'string',
    }),
    defineField({
      name: 'farRightBullets',
      title: 'Far Right - Bullet Points',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  preview: {
    select: {
      title: 'topic',
      subtitle: 'order',
    },
    prepare({title, subtitle}) {
      return {
        title: `Q${subtitle}: ${title}`,
      }
    },
  },
})
