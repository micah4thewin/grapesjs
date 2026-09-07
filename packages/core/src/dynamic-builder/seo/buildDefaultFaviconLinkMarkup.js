import buildHeadLinkTagMarkup from './buildHeadLinkTagMarkup.js';
import buildInitialFaviconDataUri from './buildInitialFaviconDataUri.js';
import getSeoModuleOptions from './getSeoModuleOptions.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import getSiteSeoRecord from './getSiteSeoRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildDefaultFaviconLinkMarkup = (editor) => {
  const defaultFavicon = getSeoModuleOptions(editor).defaultFavicon;
  if (defaultFavicon === false) return '';
  if (typeof defaultFavicon === 'string' && defaultFavicon.trim())
    return buildHeadLinkTagMarkup('icon', defaultFavicon);
  const designTokens = getSiteMetaRecord(editor).designTokens;
  const colorTokens = isPlainRecord(designTokens) && isPlainRecord(designTokens.color) ? designTokens.color : {};
  const faviconDataUri = buildInitialFaviconDataUri(getSiteSeoRecord(editor).siteName, colorTokens.brand);
  return '<link rel="icon" type="image/svg+xml" href="' + faviconDataUri + '">';
};

export default buildDefaultFaviconLinkMarkup;
