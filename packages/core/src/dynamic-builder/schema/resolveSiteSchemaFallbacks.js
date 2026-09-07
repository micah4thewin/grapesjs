import getSiteSeoRecord from '../seo/getSiteSeoRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const applyIdentityFallbacks = (targetRecord, fallbackName, fallbackUrl) => ({
  ...targetRecord,
  name: String(targetRecord.name || '').trim() || fallbackName,
  url: String(targetRecord.url || '').trim() || fallbackUrl,
});

const resolveSiteSchemaFallbacks = (editor, siteSchemaRecord) => {
  const siteRecord = isPlainRecord(siteSchemaRecord) ? siteSchemaRecord : {};
  const siteSeoRecord = getSiteSeoRecord(editor);
  const fallbackName = String(siteSeoRecord.siteName || '').trim();
  const fallbackUrl = String(siteSeoRecord.canonicalBase || '').trim();
  return {
    ...siteRecord,
    website: applyIdentityFallbacks(
      isPlainRecord(siteRecord.website) ? siteRecord.website : {},
      fallbackName,
      fallbackUrl,
    ),
    organization: applyIdentityFallbacks(
      isPlainRecord(siteRecord.organization) ? siteRecord.organization : {},
      fallbackName,
      fallbackUrl,
    ),
  };
};

export default resolveSiteSchemaFallbacks;
