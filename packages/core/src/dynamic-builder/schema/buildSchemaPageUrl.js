import getPageMetaRecord from '../support/getPageMetaRecord.js';
import getSchemaCanonicalBase from './getSchemaCanonicalBase.js';
import isPlainRecord from '../support/isPlainRecord.js';
import resolveSchemaPageSlug from './resolveSchemaPageSlug.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const buildSchemaPageUrl = (editor, page) => {
  if (!page) return '';
  const pageSeoRecord = getPageMetaRecord(editor, page).seo;
  const canonicalOverride = isPlainRecord(pageSeoRecord) ? sanitizeUrlValue(pageSeoRecord.canonical) : '';
  if (canonicalOverride) return canonicalOverride;
  const canonicalBase = getSchemaCanonicalBase(editor);
  if (!canonicalBase) return '';
  const slugText = resolveSchemaPageSlug(editor, page);
  return slugText ? canonicalBase + '/' + slugText : canonicalBase + '/';
};

export default buildSchemaPageUrl;
