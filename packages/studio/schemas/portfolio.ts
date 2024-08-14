import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'portfolio',
  type: 'document',
  title: 'Portfolio',
  fields: [
    defineField({
      name: 'profile_image',
      type: 'image',
      title: 'Profile Image',
      validation: (rule) => rule.required(),
    }),
  ],
})
