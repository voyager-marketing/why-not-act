import {defineType, defineField} from 'sanity'

export const callToActionType = defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'document',
  description: 'Action prompts with ideology-specific messaging',
  fields: [
    defineField({
      name: 'actionType',
      title: 'Action Type',
      type: 'string',
      description: 'The type of action being requested',
      options: {
        list: [
          {title: 'Sign Petition', value: 'petition'},
          {title: 'Make Donation', value: 'donate'},
          {title: 'Share Content', value: 'share'},
          {title: 'Write Letter/Email', value: 'letter'},
          {title: 'Submit Personal Story', value: 'story-submit'},
          {title: 'Sign Up to Volunteer', value: 'volunteer'},
          {title: 'Attend Event', value: 'event'},
          {title: 'Contact Representative', value: 'contact-rep'},
          {title: 'Subscribe to Updates', value: 'subscribe'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'CTA Title',
      type: 'string',
      description: 'Internal title for this CTA',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Display priority (0-100, higher = more important)',
      validation: (rule) => rule.required().min(0).max(100),
      initialValue: 50,
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'Link to external action page (petition site, donation page, etc.)',
    }),
    defineField({
      name: 'embedCode',
      title: 'Embed Code',
      type: 'text',
      description: 'Optional embed code for inline forms (e.g., ActionNetwork, Change.org)',
    }),
    // Far Right Framing
    defineField({
      name: 'farRightFraming',
      title: 'Far Right Framing',
      type: 'object',
      description: 'How this CTA is presented to far-right users',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Main CTA headline',
          validation: (rule) => rule.max(100),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          description: 'Supporting text explaining the action',
          validation: (rule) => rule.max(300),
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          description: 'Text on the action button',
          validation: (rule) => rule.max(50),
        },
        {
          name: 'icon',
          title: 'Icon',
          type: 'string',
          description: 'Lucide icon name (e.g., "shield", "flag", "megaphone")',
        },
        {
          name: 'urgencyLevel',
          title: 'Urgency Level',
          type: 'string',
          description: 'How urgent to make this feel',
          options: {
            list: [
              {title: 'Low', value: 'low'},
              {title: 'Medium', value: 'medium'},
              {title: 'High', value: 'high'},
              {title: 'Critical', value: 'critical'},
            ],
          },
        },
      ],
    }),
    // Center Right Framing
    defineField({
      name: 'centerRightFraming',
      title: 'Center Right Framing',
      type: 'object',
      description: 'How this CTA is presented to center-right users',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Main CTA headline',
          validation: (rule) => rule.max(100),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          description: 'Supporting text explaining the action',
          validation: (rule) => rule.max(300),
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          description: 'Text on the action button',
          validation: (rule) => rule.max(50),
        },
        {
          name: 'icon',
          title: 'Icon',
          type: 'string',
          description: 'Lucide icon name (e.g., "briefcase", "scale", "clipboard")',
        },
        {
          name: 'urgencyLevel',
          title: 'Urgency Level',
          type: 'string',
          description: 'How urgent to make this feel',
          options: {
            list: [
              {title: 'Low', value: 'low'},
              {title: 'Medium', value: 'medium'},
              {title: 'High', value: 'high'},
              {title: 'Critical', value: 'critical'},
            ],
          },
        },
      ],
    }),
    // Center Left Framing
    defineField({
      name: 'centerLeftFraming',
      title: 'Center Left Framing',
      type: 'object',
      description: 'How this CTA is presented to center-left users',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Main CTA headline',
          validation: (rule) => rule.max(100),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          description: 'Supporting text explaining the action',
          validation: (rule) => rule.max(300),
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          description: 'Text on the action button',
          validation: (rule) => rule.max(50),
        },
        {
          name: 'icon',
          title: 'Icon',
          type: 'string',
          description: 'Lucide icon name (e.g., "users", "heart", "handshake")',
        },
        {
          name: 'urgencyLevel',
          title: 'Urgency Level',
          type: 'string',
          description: 'How urgent to make this feel',
          options: {
            list: [
              {title: 'Low', value: 'low'},
              {title: 'Medium', value: 'medium'},
              {title: 'High', value: 'high'},
              {title: 'Critical', value: 'critical'},
            ],
          },
        },
      ],
    }),
    // Far Left Framing
    defineField({
      name: 'farLeftFraming',
      title: 'Far Left Framing',
      type: 'object',
      description: 'How this CTA is presented to far-left users',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Main CTA headline',
          validation: (rule) => rule.max(100),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          description: 'Supporting text explaining the action',
          validation: (rule) => rule.max(300),
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          description: 'Text on the action button',
          validation: (rule) => rule.max(50),
        },
        {
          name: 'icon',
          title: 'Icon',
          type: 'string',
          description: 'Lucide icon name (e.g., "megaphone", "users", "zap")',
        },
        {
          name: 'urgencyLevel',
          title: 'Urgency Level',
          type: 'string',
          description: 'How urgent to make this feel',
          options: {
            list: [
              {title: 'Low', value: 'low'},
              {title: 'Medium', value: 'medium'},
              {title: 'High', value: 'high'},
              {title: 'Critical', value: 'critical'},
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'conversionMetrics',
      title: 'Conversion Metrics',
      type: 'object',
      description: 'When and how to show this CTA',
      fields: [
        {
          name: 'showIfPersuasionAbove',
          title: 'Show If Persuasion Score Above',
          type: 'number',
          description: 'Only show if user persuasion score is above this threshold',
          validation: (rule) => rule.min(0).max(100),
        },
        {
          name: 'showIfPersuasionBelow',
          title: 'Show If Persuasion Score Below',
          type: 'number',
          description: 'Only show if user persuasion score is below this threshold',
          validation: (rule) => rule.min(0).max(100),
        },
        {
          name: 'showIfLayersCompleted',
          title: 'Show If Layers Completed',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Show after completing these layers',
          options: {
            list: [
              {title: 'Layer 1', value: 'layer1'},
              {title: 'Layer 2', value: 'layer2'},
              {title: 'Layer 3', value: 'layer3'},
              {title: 'Layer 4', value: 'layer4'},
              {title: 'Layer 5', value: 'layer5'},
              {title: 'Layer 6', value: 'layer6'},
              {title: 'Layer 7', value: 'layer7'},
            ],
          },
        },
        {
          name: 'maxDisplays',
          title: 'Maximum Displays',
          type: 'number',
          description: 'Maximum times to show this CTA to a user (0 = unlimited)',
          validation: (rule) => rule.min(0),
          initialValue: 0,
        },
        {
          name: 'cooldownHours',
          title: 'Cooldown Hours',
          type: 'number',
          description: 'Hours to wait before showing again after dismissal',
          validation: (rule) => rule.min(0),
          initialValue: 24,
        },
      ],
    }),
    defineField({
      name: 'successMetrics',
      title: 'Success Metrics',
      type: 'object',
      description: 'Track conversion and engagement',
      fields: [
        {
          name: 'goalConversions',
          title: 'Goal Conversions',
          type: 'number',
          description: 'Target number of conversions',
        },
        {
          name: 'trackingId',
          title: 'Tracking ID',
          type: 'string',
          description: 'Analytics tracking ID',
        },
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Whether this CTA is currently active',
      initialValue: true,
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      description: 'When to start showing this CTA',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'When to stop showing this CTA',
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
      title: 'title',
      actionType: 'actionType',
      priority: 'priority',
      isActive: 'isActive',
    },
    prepare({title, actionType, priority, isActive}) {
      return {
        title: `${isActive ? '✓' : '✗'} ${title}`,
        subtitle: `${actionType} (Priority: ${priority})`,
      }
    },
  },
})
