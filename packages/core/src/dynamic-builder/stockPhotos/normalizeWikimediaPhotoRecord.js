import buildStockPhotoRecord from './buildStockPhotoRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const stripMarkup = (textValue) =>
  String(textValue == null ? '' : textValue)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

const readFirstHref = (markupText) => {
  const hrefMatch = /href="([^"]+)"/i.exec(String(markupText || ''));
  const hrefValue = hrefMatch ? hrefMatch[1] : '';
  return /^\/\//.test(hrefValue) ? 'https:' + hrefValue : hrefValue;
};

const describeTitle = (titleText) =>
  String(titleText || '')
    .replace(/^File:/i, '')
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[_-]+/g, ' ')
    .trim();

const buildThumbnailUrl = (thumbUrl, targetWidth) =>
  /\/\d+px-/.test(thumbUrl) ? thumbUrl.replace(/\/\d+px-/, '/' + targetWidth + 'px-') : thumbUrl;

const normalizeWikimediaPhotoRecord = (pagePayload) => {
  const pageValues = isPlainRecord(pagePayload) ? pagePayload : {};
  const imageInfo =
    Array.isArray(pageValues.imageinfo) && isPlainRecord(pageValues.imageinfo[0]) ? pageValues.imageinfo[0] : {};
  const mimeType = String(imageInfo.mime || '').toLowerCase();
  if (mimeType && (mimeType.indexOf('image/') !== 0 || mimeType.indexOf('svg') >= 0)) return null;
  const metaRecord = isPlainRecord(imageInfo.extmetadata) ? imageInfo.extmetadata : {};
  const readMeta = (metaKey) => (isPlainRecord(metaRecord[metaKey]) ? metaRecord[metaKey].value : '');
  const licenceName = stripMarkup(readMeta('LicenseShortName')) || 'Free to use';
  const isPublicDomain = /public domain|cc0|pdm|no restrictions/i.test(licenceName);
  const downloadUrl = String(imageInfo.thumburl || imageInfo.url || '');
  return buildStockPhotoRecord({
    photoId: pageValues.pageid || pageValues.title,
    providerId: 'wikimedia',
    providerName: 'Wikimedia Commons',
    thumbnailUrl: buildThumbnailUrl(downloadUrl, 480),
    downloadUrl,
    width: imageInfo.width,
    height: imageInfo.height,
    description: stripMarkup(readMeta('ImageDescription')) || describeTitle(pageValues.title),
    photographerName: stripMarkup(readMeta('Artist')) || stripMarkup(readMeta('Credit')),
    photographerUrl: readFirstHref(readMeta('Artist')),
    sourceUrl: imageInfo.descriptionurl,
    licenceName,
    licenceUrl: stripMarkup(readMeta('LicenseUrl')),
    requiresAttribution: !isPublicDomain,
  });
};

export default normalizeWikimediaPhotoRecord;
