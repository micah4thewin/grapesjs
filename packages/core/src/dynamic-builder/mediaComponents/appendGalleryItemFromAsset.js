import deriveAltTextFromAssetName from './deriveAltTextFromAssetName.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const appendGalleryItemFromAsset = (galleryComponent, assetRecord) => {
  const assetSource = assetRecord && assetRecord.getSrc ? assetRecord.getSrc() : '';
  if (!assetSource || !galleryComponent || !galleryComponent.append) return null;
  const assetName = assetRecord.get ? assetRecord.get('name') : '';
  const altText = deriveAltTextFromAssetName(assetName, galleryComponent.components().length + 1);
  const showCaption = String(galleryComponent.getAttributes()['data-db-captions']) !== 'false';
  const appendedItems = galleryComponent.append({
    type: 'db-gallery-item',
    attributes: { 'data-db-show-caption': showCaption ? 'true' : 'false' },
    components: [
      { type: 'db-image', attributes: { src: assetSource, alt: altText } },
      { tagName: 'figcaption', type: 'text', classes: ['db-gallery-caption'], components: escapeHtmlText(altText) },
    ],
  });
  return appendedItems && appendedItems[0] ? appendedItems[0] : null;
};

export default appendGalleryItemFromAsset;
