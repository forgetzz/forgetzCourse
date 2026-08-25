import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { vidHtml } from './html/vidHtml'
import { pdfHtml } from './html/pdfHtml'
import { vidNextjs } from './nextjs/vidNextjs'
import { vidTypescript } from './typescript/vidTypescript'
import { announcement } from './annoucement/annouce'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType , vidHtml, pdfHtml, vidNextjs , vidTypescript, announcement],
}
