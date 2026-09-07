import getSiteSeoMetaRecord from './getSiteSeoMetaRecord.js';
import toSlugText from '../support/toSlugText.js';

const buildSiteArchiveFileName = (editor) => {
  const siteSlug = toSlugText(getSiteSeoMetaRecord(editor).siteName).slice(0, 48).replace(/-+$/, '');
  return siteSlug ? siteSlug + '-site.zip' : 'site.zip';
};

export default buildSiteArchiveFileName;
