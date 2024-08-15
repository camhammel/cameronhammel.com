import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  type: 'document',
  name: 'section',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
    }),
    defineField({
      type: 'string',
      name: 'image_placement',
      title: 'Image Placement',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          name: 'Content Item',
        }),
      ],
    }),
  ],
})
