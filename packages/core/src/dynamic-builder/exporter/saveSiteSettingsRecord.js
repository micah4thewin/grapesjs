import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const saveSiteSettingsRecord = (editor, rootElement) => {
  const seoPatch = {};
  ['siteName', 'canonicalBase', 'language'].forEach((fieldKey) => {
    const inputElement = rootElement.querySelector('[data-db-site-field="' + fieldKey + '"]');
    if (inputElement) seoPatch[fieldKey] = String(inputElement.value || '').trim();
  });
  return updateSiteMetaRecord(editor, { seo: seoPatch });
};

export default saveSiteSettingsRecord;
