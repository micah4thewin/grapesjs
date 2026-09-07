import buildSiteStorageKey from './buildSiteStorageKey.js';
import createSiteIdentifier from './createSiteIdentifier.js';
import toSlugText from '../support/toSlugText.js';

const buildSiteRecord = (siteValues = {}) => {
  const siteId = String(siteValues.id || createSiteIdentifier());
  const siteName = String(siteValues.name || '').trim() || 'Untitled site';
  const timestampText = new Date().toISOString();
  return {
    id: siteId,
    name: siteName,
    slug: toSlugText(siteValues.slug || siteName) || siteId,
    description: String(siteValues.description || '').trim(),
    createdAt: String(siteValues.createdAt || timestampText),
    updatedAt: String(siteValues.updatedAt || timestampText),
    storageKey: String(siteValues.storageKey || buildSiteStorageKey(siteId)),
    pageCount: Number.isFinite(siteValues.pageCount) ? siteValues.pageCount : 1,
  };
};

export default buildSiteRecord;
