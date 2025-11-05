import {defineField, defineType} from 'sanity'

export const petitionSignatureType = defineType({
  name: 'petitionSignature',
  title: 'Petition Signature',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'zipcode',
      title: 'ZIP Code',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^\d{5}$/, {
        name: 'zipcode',
        invert: false,
      }),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Optional phone number',
    }),
    defineField({
      name: 'reason',
      title: 'Reason for Signing',
      type: 'text',
      description: 'Optional explanation of why they are signing',
      validation: (Rule) => Rule.max(500),
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
      name: 'consent',
      title: 'Privacy Policy Consent',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'signedAt',
      title: 'Signed At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      description: 'IP address of the signer (for fraud prevention)',
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
      name: 'verified',
      title: 'Email Verified',
      type: 'boolean',
      description: 'Whether the email has been verified',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Flagged', value: 'flagged'},
          {title: 'Removed', value: 'removed'},
        ],
      },
      initialValue: 'active',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      theme: 'theme',
      date: 'signedAt',
    },
    prepare(selection) {
      const {title, subtitle, theme, date} = selection
      return {
        title: title,
        subtitle: `${subtitle} | ${theme} | ${new Date(date).toLocaleDateString()}`,
      }
    },
  },
  orderings: [
    {
      title: 'Signed Date (Newest First)',
      name: 'signedAtDesc',
      by: [{field: 'signedAt', direction: 'desc'}],
    },
    {
      title: 'Signed Date (Oldest First)',
      name: 'signedAtAsc',
      by: [{field: 'signedAt', direction: 'asc'}],
    },
    {
      title: 'Name (A-Z)',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
})
