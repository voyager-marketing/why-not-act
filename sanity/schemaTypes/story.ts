import {defineField, defineType} from 'sanity'

export const storyType = defineType({
  name: 'story',
  title: 'Personal Story',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the story submitter (can be anonymous)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Contact email (not published)',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'content',
      title: 'Story Content',
      type: 'text',
      description: 'The personal story text',
      validation: (Rule) => Rule.required().min(50).max(2000),
    }),
    defineField({
      name: 'allowPublish',
      title: 'Allow Publishing',
      type: 'boolean',
      description: 'Permission to publish the story on the website',
      initialValue: false,
    }),
    defineField({
      name: 'allowContact',
      title: 'Allow Contact',
      type: 'boolean',
      description: 'Permission to contact for follow-up or media opportunities',
      initialValue: false,
    }),
    defineField({
      name: 'theme',
      title: 'Political Theme',
      type: 'string',
      options: {
        list: [
          {title: 'Far Left', value: 'far-left'},
          {title: 'Mid Left', value: 'mid-left'},
          {title: 'Mid Right', value: 'mid-right'},
          {title: 'Far Right', value: 'far-right'},
          {title: 'Default', value: 'default'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Moderation Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending Review', value: 'pending'},
          {title: 'Approved', value: 'approved'},
          {title: 'Published', value: 'published'},
          {title: 'Rejected', value: 'rejected'},
          {title: 'Flagged', value: 'flagged'},
        ],
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'moderationNotes',
      title: 'Moderation Notes',
      type: 'text',
      description: 'Internal notes for moderators',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'When the story was published (if published)',
    }),
    defineField({
      name: 'reviewedBy',
      title: 'Reviewed By',
      type: 'string',
      description: 'Admin/moderator who reviewed this story',
    }),
    defineField({
      name: 'reviewedAt',
      title: 'Reviewed At',
      type: 'datetime',
      description: 'When the story was reviewed',
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      description: 'IP address of the submitter (for moderation)',
      readOnly: true,
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      description: 'Browser/device information',
      readOnly: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Story',
      type: 'boolean',
      description: 'Mark as featured story to display prominently',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Tags for categorizing stories',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short excerpt for previews (auto-generated if not provided)',
      validation: (Rule) => Rule.max(200),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      content: 'content',
      status: 'status',
      date: 'submittedAt',
      featured: 'featured',
    },
    prepare(selection) {
      const {title, content, status, date, featured} = selection
      const excerpt = content.substring(0, 60) + '...'
      const featuredTag = featured ? ' ⭐' : ''
      return {
        title: `${title}${featuredTag}`,
        subtitle: `${status.toUpperCase()} | ${new Date(date).toLocaleDateString()} | ${excerpt}`,
      }
    },
  },
  orderings: [
    {
      title: 'Submitted Date (Newest First)',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
    {
      title: 'Submitted Date (Oldest First)',
      name: 'submittedAtAsc',
      by: [{field: 'submittedAt', direction: 'asc'}],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{field: 'status', direction: 'asc'}],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        {field: 'featured', direction: 'desc'},
        {field: 'submittedAt', direction: 'desc'},
      ],
    },
  ],
})
