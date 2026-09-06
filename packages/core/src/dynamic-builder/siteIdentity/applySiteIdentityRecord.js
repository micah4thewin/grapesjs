import applyLogoToNavbarBrands from './applyLogoToNavbarBrands.js';
import applyTokenRecordUpdate from '../designTokens/applyTokenRecordUpdate.js';
import generateBrandPalette from './generateBrandPalette.js';
import getSiteIdentityRecord from './getSiteIdentityRecord.js';
import replaceBrandTextAcrossPages from './replaceBrandTextAcrossPages.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const applySiteIdentityRecord = (editor, designTokenOptions, identityRecord) => {
  const previousRecord = getSiteIdentityRecord(editor);
  const previousName = previousRecord.siteName || 'Acme Studio';
  updateSiteMetaRecord(editor, {
    identity: identityRecord,
    seo: { siteName: identityRecord.siteName, defaultDescription: identityRecord.description },
  });
  applyTokenRecordUpdate(editor, designTokenOptions, {
    color: generateBrandPalette(identityRecord.brandColor, identityRecord.moodId),
  });
  const replacedCount = replaceBrandTextAcrossPages(editor, previousName, identityRecord.siteName);
  applyLogoToNavbarBrands(editor, identityRecord);
  editor.trigger('db:site-identity:applied', identityRecord);
  return replacedCount;
};

export default applySiteIdentityRecord;
