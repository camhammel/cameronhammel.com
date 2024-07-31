import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'

import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'CameronHammel.com',

  projectId: '9llpwxop',
  dataset: 'production',

  plugins: [structureTool(), colorInput(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
