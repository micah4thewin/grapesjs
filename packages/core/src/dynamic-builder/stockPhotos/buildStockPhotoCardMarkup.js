import buildStockPhotoAttribution from './buildStockPhotoAttribution.js';
import buildStockPhotoLinkMarkup from './buildStockPhotoLinkMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildStockPhotoCardMarkup = (photoRecord, photoIndex) => {
  const creditText = buildStockPhotoAttribution(photoRecord);
  return [
    '<figure class="gjs-db-stock-card">',
    '<button type="button" class="gjs-db-stock-choice" data-db-stock-choose="' + photoIndex + '"',
    ' aria-label="' + escapeHtmlText('Use this photo. ' + creditText) + '">',
    '<img class="gjs-db-stock-thumb" src="' + escapeHtmlText(photoRecord.thumbnailUrl) + '" alt=""',
    ' loading="lazy" decoding="async">',
    '</button>',
    '<figcaption class="gjs-db-stock-credit">',
    buildStockPhotoLinkMarkup(photoRecord.photographerUrl, photoRecord.photographerName, 'gjs-db-stock-author'),
    buildStockPhotoLinkMarkup(photoRecord.licenceUrl, photoRecord.licenceName, 'gjs-db-stock-licence'),
    '</figcaption>',
    '</figure>',
  ].join('');
};

export default buildStockPhotoCardMarkup;
