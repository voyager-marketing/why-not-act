import {defineType, defineField} from 'sanity'

export const impactPointType = defineType({
  name: 'impactPoint',
  title: 'Real Impact',
  type: 'document',
  description: 'Impact points for Layer 5 - Real Impact Visualization',
  fields: [
    defineField({
      name: 'lens',
      title: 'Political Lens',
      type: 'string',
      description: 'Which political lens this impact is for',
      options: {
        list: [
          {title: 'Far Left', value: 'far-left'},
          {title: 'Center Left', value: 'center-left'},
          {title: 'Center Right', value: 'center-right'},
          {title: 'Far Right', value: 'far-right'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order within the lens (1, 2, 3, 4)',
      validation: (rule) => rule.required().min(1).max(4),
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      description: 'Single emoji icon for this impact (e.g., 💰, 🛡️, ❤️)',
      validation: (rule) => rule.required().max(10),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Short impact title (e.g., "Saves $315–$960 Billion")',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Detailed explanation of the impact',
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'reflectionQuestion',
      title: 'Reflection Question',
      type: 'text',
      description: 'Reflection question for this lens (only set on the first impact point per lens)',
      validation: (rule) => rule.max(500),
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
      lens: 'lens',
      order: 'order',
      emoji: 'emoji',
    },
    prepare({title, lens, order, emoji}) {
      return {
        title: `${emoji} ${title}`,
        subtitle: `${lens} - Position ${order}`,
      }
    },
  },
})
