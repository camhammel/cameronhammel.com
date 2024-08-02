import { defineConfig } from 'sanity'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {structureTool} from 'sanity/structure'

import types from './schemas'

const config = defineConfig({
  name: 'default',
  title: 'CameronHammel.com',

  projectId: '9llpwxop',
  dataset: 'production',

  plugins: [structureTool(), colorInput(), visionTool()],

  schema: {
    types,
  },
});

export default config;
