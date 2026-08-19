import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { vidHtml } from './html/vidHtml'
import { pdfHtml } from './html/pdfHtml'
import { pdfJs } from './javascript/pdfJs'
import { pdfCss } from './css/pdfCss'
import { vidJs } from './javascript/pdfVid'
import { vidCss } from './css/vidCss'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType , vidHtml, pdfHtml, pdfJs, vidJs, pdfCss,vidCss, ],
}
