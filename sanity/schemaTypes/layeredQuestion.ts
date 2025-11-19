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
          type: 'text',
          description: 'Question text for far-right audience',
          validation: (rule) => rule.max(500),
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
          type: 'text',
          description: 'Question text for center-right audience',
          validation: (rule) => rule.max(500),
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
          type: 'text',
          description: 'Question text for center-left audience',
          validation: (rule) => rule.max(500),
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
          type: 'text',
          description: 'Question text for far-left audience',
          validation: (rule) => rule.max(500),
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
