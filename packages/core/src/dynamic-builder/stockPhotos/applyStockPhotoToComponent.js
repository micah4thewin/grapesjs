import buildStockPhotoAltText from './buildStockPhotoAltText.js';
import buildStockPhotoAttribution from './buildStockPhotoAttribution.js';
import setStockPhotoCaption from './setStockPhotoCaption.js';

const applyStockPhotoToComponent = (imageComponent, photoRecord, imageSource) => {
  if (!imageComponent || !imageComponent.addAttributes || !photoRecord || !imageSource) return false;
  const attributionText = buildStockPhotoAttribution(photoRecord);
  const needsAttribution = photoRecord.requiresAttribution !== false;
  const captionUsed = needsAttribution ? setStockPhotoCaption(imageComponent, attributionText) : false;
  const attributeRecord = {
    src: imageSource,
    alt: buildStockPhotoAltText(photoRecord, captionUsed),
    'data-db-decorative': 'false',
    'data-db-photo-credit': attributionText,
  };
  if (photoRecord.sourceUrl) attributeRecord['data-db-photo-source'] = photoRecord.sourceUrl;
  imageComponent.addAttributes(attributeRecord);
  if (imageComponent.set) imageComponent.set('src', imageSource);
  return true;
};

export default applyStockPhotoToComponent;
