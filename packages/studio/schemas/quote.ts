import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
    name: 'quote',
    type: 'document',
    title: 'Quote',
    fields: [
        defineField({
            name: 'quote',
            type: 'array',
            of: [
              defineArrayMember({
                type: 'block',
                marks: {
                  decorators: [
                    { title: 'Highlight', value: 'highlight', icon: () => 'H' }
                  ]
                }
              }),
            ],
            title: 'Quote'
          }),
        defineField({
            name: 'author',
            type: 'string',
            title: 'Author'
        })
    ]
});
