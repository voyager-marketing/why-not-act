import {defineType, defineField} from 'sanity'

export const layeredQuestionType = defineType({
  name: 'layeredQuestion',
  title: 'Layered Question',
  type: 'document',
  description: 'Multi-layered question with ideology-specific framings and data points',
  fields: [
    defineField({
      name: 'layer',
      title: 'Question Layer',
      type: 'string',
      description: 'Which layer of the onion this question belongs to',
      options: {
        list: [
          {title: 'Layer 1: Surface Issue', value: 'layer1'},
          {title: 'Layer 2: Immediate Concerns', value: 'layer2'},
          {title: 'Layer 3: System Analysis', value: 'layer3'},
          {title: 'Layer 4: Power Dynamics', value: 'layer4'},
          {title: 'Layer 5: Root Causes', value: 'layer5'},
          {title: 'Layer 6: Systemic Solutions', value: 'layer6'},
          {title: 'Layer 7: Transformative Vision', value: 'layer7'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'questionType',
      title: 'Question Type',
      type: 'string',
      description: 'The type of question being asked',
      options: {
        list: [
          {title: 'Awareness Check', value: 'awareness'},
          {title: 'Opinion/Stance', value: 'opinion'},
          {title: 'Knowledge Test', value: 'knowledge'},
          {title: 'Values Exploration', value: 'values'},
          {title: 'Action Readiness', value: 'action'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order within the layer (1, 2, 3...)',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'topic',
      title: 'Topic',
      type: 'string',
      description: 'Short topic name (e.g., "Immigration Fine System")',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'coreQuestion',
      title: 'Core Question',
      type: 'text',
      description: 'The neutral, core question presented to all users',
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'context',
      title: 'Background Context',
      type: 'text',
      description: 'Optional neutral context or background information',
    }),
    defineField({
      name: 'dataPoint',
      title: 'Associated Data Point',
      type: 'object',
      description: 'Optional data/statistic to display with this question',
      fields: [
        {
          name: 'statistic',
          title: 'Statistic',
          type: 'string',
          description: 'The data point (e.g., "12 million")',
        },
        {
          name: 'context',
          title: 'Context',
          type: 'string',
          description: 'What the statistic refers to',
        },
        {
          name: 'source',
          title: 'Source',
          type: 'string',
          description: 'Source citation',
        },
        {
          name: 'sourceUrl',
          title: 'Source URL',
          type: 'url',
          description: 'Link to source',
        },
      ],
    }),
    // Far Right Framing
    defineField({
      name: 'farRightFraming',
      title: 'Far Right Framing',
      type: 'object',
      description: 'How this question is framed for far-right ideology',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Attention-grabbing headline',
          validation: (rule) => rule.max(150),
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'string',
          description: 'Supporting subheadline',
          validation: (rule) => rule.max(200),
        },
        {
          name: 'bullets',
          title: 'Bullet Points',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Key points in this ideological framing',
          validation: (rule) => rule.max(5),
        },
        {
          name: 'narrative',
          title: 'Narrative',
          type: 'text',
          description: 'Longer-form explanation (optional)',
        },
        {
          name: 'emotionalTone',
          title: 'Emotional Tone',
          type: 'string',
          description: 'The emotional appeal being used',
          options: {
            list: [
              {title: 'Fear/Security', value: 'fear'},
              {title: 'Anger/Outrage', value: 'anger'},
              {title: 'Pride/Tradition', value: 'pride'},
              {title: 'Hope/Optimism', value: 'hope'},
              {title: 'Neutral/Factual', value: 'neutral'},
            ],
          },
        },
        {
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'string',
          description: 'Hex color for this framing (e.g., #8B0000 for dark red)',
          validation: (rule) =>
            rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
              name: 'hex color',
              invert: false,
            }),
        },
      ],
    }),
    // Center Right Framing
    defineField({
      name: 'centerRightFraming',
      title: 'Center Right Framing',
      type: 'object',
      description: 'How this question is framed for center-right ideology',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Attention-grabbing headline',
          validation: (rule) => rule.max(150),
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'string',
          description: 'Supporting subheadline',
          validation: (rule) => rule.max(200),
        },
        {
          name: 'bullets',
          title: 'Bullet Points',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Key points in this ideological framing',
          validation: (rule) => rule.max(5),
        },
        {
          name: 'narrative',
          title: 'Narrative',
          type: 'text',
          description: 'Longer-form explanation (optional)',
        },
        {
          name: 'emotionalTone',
          title: 'Emotional Tone',
          type: 'string',
          description: 'The emotional appeal being used',
          options: {
            list: [
              {title: 'Fear/Security', value: 'fear'},
              {title: 'Anger/Outrage', value: 'anger'},
              {title: 'Pride/Tradition', value: 'pride'},
              {title: 'Hope/Optimism', value: 'hope'},
              {title: 'Neutral/Factual', value: 'neutral'},
            ],
          },
        },
        {
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'string',
          description: 'Hex color for this framing (e.g., #B22222 for firebrick)',
          validation: (rule) =>
            rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
              name: 'hex color',
              invert: false,
            }),
        },
      ],
    }),
    // Center Left Framing
    defineField({
      name: 'centerLeftFraming',
      title: 'Center Left Framing',
      type: 'object',
      description: 'How this question is framed for center-left ideology',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Attention-grabbing headline',
          validation: (rule) => rule.max(150),
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'string',
          description: 'Supporting subheadline',
          validation: (rule) => rule.max(200),
        },
        {
          name: 'bullets',
          title: 'Bullet Points',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Key points in this ideological framing',
          validation: (rule) => rule.max(5),
        },
        {
          name: 'narrative',
          title: 'Narrative',
          type: 'text',
          description: 'Longer-form explanation (optional)',
        },
        {
          name: 'emotionalTone',
          title: 'Emotional Tone',
          type: 'string',
          description: 'The emotional appeal being used',
          options: {
            list: [
              {title: 'Fear/Security', value: 'fear'},
              {title: 'Anger/Outrage', value: 'anger'},
              {title: 'Pride/Tradition', value: 'pride'},
              {title: 'Hope/Optimism', value: 'hope'},
              {title: 'Neutral/Factual', value: 'neutral'},
            ],
          },
        },
        {
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'string',
          description: 'Hex color for this framing (e.g., #4169E1 for royal blue)',
          validation: (rule) =>
            rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
              name: 'hex color',
              invert: false,
            }),
        },
      ],
    }),
    // Far Left Framing
    defineField({
      name: 'farLeftFraming',
      title: 'Far Left Framing',
      type: 'object',
      description: 'How this question is framed for far-left ideology',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Attention-grabbing headline',
          validation: (rule) => rule.max(150),
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'string',
          description: 'Supporting subheadline',
          validation: (rule) => rule.max(200),
        },
        {
          name: 'bullets',
          title: 'Bullet Points',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Key points in this ideological framing',
          validation: (rule) => rule.max(5),
        },
        {
          name: 'narrative',
          title: 'Narrative',
          type: 'text',
          description: 'Longer-form explanation (optional)',
        },
        {
          name: 'emotionalTone',
          title: 'Emotional Tone',
          type: 'string',
          description: 'The emotional appeal being used',
          options: {
            list: [
              {title: 'Fear/Security', value: 'fear'},
              {title: 'Anger/Outrage', value: 'anger'},
              {title: 'Pride/Tradition', value: 'pride'},
              {title: 'Hope/Optimism', value: 'hope'},
              {title: 'Neutral/Factual', value: 'neutral'},
            ],
          },
        },
        {
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'string',
          description: 'Hex color for this framing (e.g., #DC143C for crimson)',
          validation: (rule) =>
            rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
              name: 'hex color',
              invert: false,
            }),
        },
      ],
    }),
    defineField({
      name: 'persuasionWeight',
      title: 'Persuasion Weight',
      type: 'number',
      description:
        'How influential this question is in moving users toward action (0-100)',
      validation: (rule) => rule.required().min(0).max(100),
      initialValue: 50,
    }),
    defineField({
      name: 'isGatekeeping',
      title: 'Is Gatekeeping Question',
      type: 'boolean',
      description:
        'If true, user must engage meaningfully before proceeding to next layer',
      initialValue: false,
    }),
    defineField({
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'object',
      description: 'Conditions that must be met before showing this question',
      fields: [
        {
          name: 'minLayer',
          title: 'Minimum Layer Completed',
          type: 'string',
          description: 'User must complete this layer first',
          options: {
            list: [
              {title: 'None', value: 'none'},
              {title: 'Layer 1', value: 'layer1'},
              {title: 'Layer 2', value: 'layer2'},
              {title: 'Layer 3', value: 'layer3'},
              {title: 'Layer 4', value: 'layer4'},
              {title: 'Layer 5', value: 'layer5'},
              {title: 'Layer 6', value: 'layer6'},
            ],
          },
        },
        {
          name: 'minPersuasionScore',
          title: 'Minimum Persuasion Score',
          type: 'number',
          description: 'User must have at least this persuasion score',
          validation: (rule) => rule.min(0).max(100),
        },
        {
          name: 'requiredQuestions',
          title: 'Required Questions',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'layeredQuestion'}]}],
          description: 'User must answer these questions first',
        },
      ],
    }),
    defineField({
      name: 'answerOptions',
      title: 'Answer Options',
      type: 'array',
      description: 'Predefined answer choices (leave empty for open-ended)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Option Label',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'Internal value stored',
              validation: (rule) => rule.required(),
            },
            {
              name: 'persuasionDelta',
              title: 'Persuasion Delta',
              type: 'number',
              description: 'How this answer affects persuasion score (-50 to +50)',
              validation: (rule) => rule.min(-50).max(50),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Tags for filtering/categorization (e.g., "immigration", "economy")',
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      topic: 'topic',
      layer: 'layer',
      order: 'order',
    },
    prepare({topic, layer, order}) {
      const layerNum = layer?.replace('layer', '') || '?'
      return {
        title: `L${layerNum}.${order}: ${topic}`,
        subtitle: layer?.replace('layer', 'Layer ') || 'No layer',
      }
    },
  },
})
