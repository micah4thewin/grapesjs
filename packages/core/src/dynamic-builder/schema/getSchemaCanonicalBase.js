import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const getSchemaCanonicalBase = (editor) => {
  const siteSeoRecord = getSiteMetaRecord(editor).seo;
  const canonicalBase = isPlainRecord(siteSeoRecord) ? siteSeoRecord.canonicalBase : '';
  return sanitizeUrlValue(String(canonicalBase || ''))
    .trim()
    .replace(/\/+$/, '');
};

export default getSchemaCanonicalBase;
