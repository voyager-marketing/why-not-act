import {defineType, defineField} from 'sanity'

export const dataPointType = defineType({
  name: 'dataPoint',
  title: 'Data Point',
  type: 'document',
  description: 'Standalone data point with ideology-specific interpretations',
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
          {title: 'Environmental', value: 'environmental'},
          {title: 'Healthcare', value: 'healthcare'},
          {title: 'Education', value: 'education'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'statistic',
      title: 'Statistic',
      type: 'string',
      description: 'The raw statistic (e.g., "12 million", "67%", "$500 billion")',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'neutralContext',
      title: 'Neutral Context',
      type: 'text',
      description: 'What this statistic represents, stated neutrally',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Citation source (e.g., "U.S. Census Bureau, 2023")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'Link to the data source',
    }),
    defineField({
      name: 'yearCollected',
      title: 'Year Collected',
      type: 'number',
      description: 'Year the data was collected',
      validation: (rule) => rule.min(1900).max(2100),
    }),
    defineField({
      name: 'visualization',
      title: 'Visualization Settings',
      type: 'object',
      description: 'How to visually present this data',
      fields: [
        {
          name: 'type',
          title: 'Visualization Type',
          type: 'string',
          options: {
            list: [
              {title: 'Number Counter', value: 'counter'},
              {title: 'Progress Bar', value: 'progress'},
              {title: 'Pie Chart', value: 'pie'},
              {title: 'Line Graph', value: 'line'},
              {title: 'Bar Chart', value: 'bar'},
              {title: 'Icon Array', value: 'iconArray'},
              {title: 'Text Only', value: 'text'},
            ],
          },
        },
        {
          name: 'animationStyle',
          title: 'Animation Style',
          type: 'string',
          options: {
            list: [
              {title: 'Count Up', value: 'countUp'},
              {title: 'Fade In', value: 'fadeIn'},
              {title: 'Slide In', value: 'slideIn'},
              {title: 'None', value: 'none'},
            ],
          },
        },
        {
          name: 'colorScheme',
          title: 'Color Scheme',
          type: 'string',
          description: 'Base color scheme (ideology-specific colors override)',
          options: {
            list: [
              {title: 'Neutral Gray', value: 'neutral'},
              {title: 'Warning Red', value: 'warning'},
              {title: 'Success Green', value: 'success'},
              {title: 'Info Blue', value: 'info'},
            ],
          },
        },
      ],
    }),
    // Far Right Interpretation
    defineField({
      name: 'farRightInterpretation',
      title: 'Far Right Interpretation',
      type: 'object',
      description: 'How far-right ideology interprets this data',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'How to frame this statistic',
          validation: (rule) => rule.max(150),
        },
        {
          name: 'explanation',
          title: 'Explanation',
          type: 'text',
          description: 'What this means from this ideological perspective',
          validation: (rule) => rule.max(500),
        },
        {
          name: 'implication',
          title: 'Implication',
          type: 'string',
          description: 'The "so what?" - why this matters',
          validation: (rule) => rule.max(200),
        },
      ],
    }),
    // Center Right Interpretation
    defineField({
      name: 'centerRightInterpretation',
      title: 'Center Right Interpretation',
      type: 'object',
      description: 'How center-right ideology interprets this data',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'How to frame this statistic',
          validation: (rule) => rule.max(150),
        },
        {
          name: 'explanation',
          title: 'Explanation',
          type: 'text',
          description: 'What this means from this ideological perspective',
          validation: (rule) => rule.max(500),
        },
        {
          name: 'implication',
          title: 'Implication',
          type: 'string',
          description: 'The "so what?" - why this matters',
          validation: (rule) => rule.max(200),
        },
      ],
    }),
    // Center Left Interpretation
    defineField({
      name: 'centerLeftInterpretation',
      title: 'Center Left Interpretation',
      type: 'object',
      description: 'How center-left ideology interprets this data',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'How to frame this statistic',
          validation: (rule) => rule.max(150),
        },
        {
          name: 'explanation',
          title: 'Explanation',
          type: 'text',
          description: 'What this means from this ideological perspective',
          validation: (rule) => rule.max(500),
        },
        {
          name: 'implication',
          title: 'Implication',
          type: 'string',
          description: 'The "so what?" - why this matters',
          validation: (rule) => rule.max(200),
        },
      ],
    }),
    // Far Left Interpretation
    defineField({
      name: 'farLeftInterpretation',
      title: 'Far Left Interpretation',
      type: 'object',
      description: 'How far-left ideology interprets this data',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'How to frame this statistic',
          validation: (rule) => rule.max(150),
        },
        {
          name: 'explanation',
          title: 'Explanation',
          type: 'text',
          description: 'What this means from this ideological perspective',
          validation: (rule) => rule.max(500),
        },
        {
          name: 'implication',
          title: 'Implication',
          type: 'string',
          description: 'The "so what?" - why this matters',
          validation: (rule) => rule.max(200),
        },
      ],
    }),
    defineField({
      name: 'relatedQuestions',
      title: 'Related Questions',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'layeredQuestion'}]}],
      description: 'Questions that reference or use this data point',
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
    defineField({
      name: 'isVerified',
      title: 'Is Verified',
      type: 'boolean',
      description: 'Has this data been fact-checked and verified?',
      initialValue: false,
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      description: 'When this data was last reviewed/updated',
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
