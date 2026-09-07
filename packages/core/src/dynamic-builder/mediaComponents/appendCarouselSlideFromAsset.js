import deriveAltTextFromAssetName from './deriveAltTextFromAssetName.js';
import findDescendantWithAttribute from './findDescendantWithAttribute.js';

const appendCarouselSlideFromAsset = (carouselComponent, assetRecord) => {
  const assetSource = assetRecord && assetRecord.getSrc ? assetRecord.getSrc() : '';
  const trackComponent = findDescendantWithAttribute(carouselComponent, 'data-db-carousel-track');
  if (!assetSource || !trackComponent || !trackComponent.append) return null;
  const assetName = assetRecord.get ? assetRecord.get('name') : '';
  const altText = deriveAltTextFromAssetName(assetName, trackComponent.components().length + 1);
  const appendedSlides = trackComponent.append({
    type: 'db-carousel-slide',
    attributes: { 'aria-label': altText },
    components: [{ type: 'db-image', attributes: { src: assetSource, alt: altText } }],
  });
  return appendedSlides && appendedSlides[0] ? appendedSlides[0] : null;
};

export default appendCarouselSlideFromAsset;
