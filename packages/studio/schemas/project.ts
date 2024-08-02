import {defineArrayMember, defineField, defineType} from 'sanity'

// schemas/project.js
export default defineType({
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    defineField({
      name: 'slug',
      type: 'string',
      title: 'Slug',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'colourset',
      type: 'reference',
      title: 'Colour Set',
      to: [{type: 'colourset'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero_banner',
      type: 'image',
      title: 'Hero Banner',
    }),
    defineField({
      name: 'summary',
      type: 'text',
      title: 'Summary',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'start_date',
      type: 'date',
      title: 'Start Date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tech_stack',
      type: 'array',
      title: 'Tech Stack',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'techstackitem'}],
        }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'section'}],
        }),
      ],
    }),
    defineField({
      name: 'quotes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          name: 'quote',
          to: [{type: 'quote'}],
        }),
      ],
      title: 'Quotes',
    }),
  ],
})
