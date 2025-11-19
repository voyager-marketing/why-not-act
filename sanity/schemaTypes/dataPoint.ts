import {defineType, defineField} from 'sanity'

export const dataPointType = defineType({
  name: 'dataPoint',
  title: 'Did You Know?',
  type: 'document',
  description: 'Immigration facts with ideology-specific interpretations for Layer 3',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'The type of data this represents',
      options: {
        list: [
          {title: 'Economic Data', value: 'economic'},
          {title: 'Security/Safety', value: 'security'},
          {title: 'Demographic', value: 'demographic'},
          {title: 'Legal/Policy', value: 'legal'},
          {title: 'Social Impact', value: 'social'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'statistic',
      title: 'Statistic',
      type: 'string',
      description: 'The key number (e.g., "$315 billion", "90-95%")',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'neutralContext',
      title: 'Neutral Context',
      type: 'text',
      description: 'What this statistic represents, stated neutrally',
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Citation source (e.g., "U.S. Census Bureau, 2023")',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'Link to the data source',
    }),
    // Far Right Interpretation
    defineField({
      name: 'farRightInterpretation',
      title: 'Far Right Interpretation',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'text',
          description: 'How to frame this for far-right audience',
          validation: (rule) => rule.max(500),
        },
      ],
    }),
    // Center Right Interpretation
    defineField({
      name: 'centerRightInterpretation',
      title: 'Center Right Interpretation',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'text',
          description: 'How to frame this for center-right audience',
          validation: (rule) => rule.max(500),
        },
      ],
    }),
    // Center Left Interpretation
    defineField({
      name: 'centerLeftInterpretation',
      title: 'Center Left Interpretation',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'text',
          description: 'How to frame this for center-left audience',
          validation: (rule) => rule.max(500),
        },
      ],
    }),
    // Far Left Interpretation
    defineField({
      name: 'farLeftInterpretation',
      title: 'Far Left Interpretation',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'text',
          description: 'How to frame this for far-left audience',
          validation: (rule) => rule.max(500),
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Tags for categorization',
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      statistic: 'statistic',
      context: 'neutralContext',
      category: 'category',
    },
    prepare({statistic, context, category}) {
      return {
        title: statistic,
        subtitle: `${category || 'Uncategorized'} - ${context?.substring(0, 60)}...`,
      }
    },
  },
})
