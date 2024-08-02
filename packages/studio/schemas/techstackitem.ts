import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'techstackitem',
  type: 'document',
  title: 'Tech Stack Item',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rule) => rule.required(),
    }),
  ],
})
