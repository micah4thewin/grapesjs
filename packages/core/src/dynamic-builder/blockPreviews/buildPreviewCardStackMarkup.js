import buildPreviewCircleMarkup from './buildPreviewCircleMarkup.js';
import buildPreviewShapeMarkup from './buildPreviewShapeMarkup.js';

const buildPreviewCardStackMarkup = (cardX, cardWidth, accentKind) => {
  const innerX = cardX + 4;
  const innerWidth = cardWidth - 8;
  const accentMarkup =
    accentKind === 'portrait'
      ? buildPreviewCircleMarkup(cardX + cardWidth / 2, 20, 5, { opacity: 0.42, accent: true })
      : accentKind === 'quote'
        ? buildPreviewShapeMarkup(innerX, 14, 5, 5, { opacity: 0.55, accent: true, radius: 1 })
        : buildPreviewShapeMarkup(innerX, 14, innerWidth, 11, { opacity: 0.3, radius: 2 });
  return [
    buildPreviewShapeMarkup(cardX, 10, cardWidth, 40, { opacity: 0.12, radius: 3 }),
    accentMarkup,
    buildPreviewShapeMarkup(innerX, 30, innerWidth - 4, 4, { opacity: 0.32 }),
    buildPreviewShapeMarkup(innerX, 38, innerWidth - 8, 3, { opacity: 0.18 }),
  ].join('');
};

export default buildPreviewCardStackMarkup;
