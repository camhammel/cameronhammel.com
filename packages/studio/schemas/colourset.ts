import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'colourset',
  type: 'document',
  title: 'Colour Sets',
  validation: (rule) => rule.required(),
  fields: [
    defineField({
      name: 'light',
      type: 'color',
      title: 'Light Colour',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lighter',
      type: 'color',
      title: 'Lighter Colour',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'main',
      type: 'color',
      title: 'Main Colour',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dark',
      type: 'color',
      title: 'Dark Colour',
      validation: (rule) => rule.required(),
    }),
  ],
})
