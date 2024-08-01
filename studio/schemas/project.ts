import { defineArrayMember, defineField, defineType } from "sanity"

// schemas/project.js
export default defineType({
    name: 'project',
    type: 'document',
    title: 'Project',
    fields: [
      defineField({
        name: 'slug',
        type: 'string',
        title: 'Slug'
      }),
      defineField({
        name: 'name',
        type: 'string',
        title: 'Name'
      }),
      defineField({
        name: 'colours',
        type: 'document',
        title: 'Colours',
        fields: [
          defineField({
            name: 'primary',
            type: 'document',
            title: 'Primary Colours',
            fields: [
              defineField({
                name: 'light',
                type: 'color',
                title: 'Light Colour'
              }),
              defineField({
                name: 'lighter',
                type: 'color',
                title: 'Lighter Colour'
              }),
              defineField({
                name: 'main',
                type: 'color',
                title: 'Main Colour'
              }),
              defineField({
                name: 'dark',
                type: 'color',
                title: 'Dark Colour'
              }),
            ]
          }),
        ]
      }),
      defineField({
        name: 'hero_banner',
        type: 'image',
        title: 'Hero Banner'
      }),
      defineField({
        name: 'summary',
        type: 'text',
        title: 'Summary'
      }),
      defineField({
        name: 'start_date',
        type: 'date',
        title: 'Start Date'
      }),
      defineField({
        name: 'tech_stack',
        type: 'array',
        title: 'Tech Stack',
        of: [
          defineArrayMember({
            type: 'string',
            name: 'Tech Stack Item'
          })
        ]
      }),
      defineField({
        name: 'sections',
        title: 'Sections',
        type: 'array',
        of: [
          defineArrayMember({
            type:'document',
            fields: [
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
                    { title: 'Left', value: 'left' },
                    { title: 'Center', value: 'center' },
                    { title: 'Right',  value: 'right' },
                  ],
                }
              }),
              defineField({
                name: 'content',
                title: 'Content',
                type: 'array',
                of: [
                  defineArrayMember({
                    type: 'block',
                    name: 'Content Item'
                  })
                ]
              })
            ]
          })
        ]
      }),
      defineField({
        name: 'quotes',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'document',
            fields: [
              defineField({
                name: 'quote',
                type: 'array',
                of: [
                  defineArrayMember({
                    type: 'block',
                    name: 'Quote Item',
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
          })],
        title: 'Quotes'
      }),
    ]
  })