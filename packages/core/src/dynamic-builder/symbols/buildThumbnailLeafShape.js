import buildPreviewShapeMarkup from '../blockPreviews/buildPreviewShapeMarkup.js';

const buildThumbnailLeafShape = (leafKind, startX, startY) => {
  if (leafKind === 'heading') {
    return { markup: buildPreviewShapeMarkup(startX, startY, 40, 5, { opacity: 0.5 }), height: 5 };
  }
  if (leafKind === 'button') {
    return {
      markup: buildPreviewShapeMarkup(startX, startY, 20, 7, { accent: true, opacity: 0.65, radius: 3 }),
      height: 7,
    };
  }
  if (leafKind === 'image') {
    return { markup: buildPreviewShapeMarkup(startX, startY, 26, 12, { opacity: 0.2, radius: 2 }), height: 12 };
  }
  return {
    markup:
      buildPreviewShapeMarkup(startX, startY, 52, 3, { opacity: 0.25 }) +
      buildPreviewShapeMarkup(startX, startY + 5, 36, 3, { opacity: 0.25 }),
    height: 8,
  };
};

export default buildThumbnailLeafShape;
