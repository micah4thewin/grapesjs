import buildPreviewCircleMarkup from './buildPreviewCircleMarkup.js';
import buildPreviewRowMarkup from './buildPreviewRowMarkup.js';
import buildPreviewShapeMarkup from './buildPreviewShapeMarkup.js';

const buildCodePreviewShapes = (accentLineIndex) =>
  [
    buildPreviewShapeMarkup(8, 10, 80, 40, { opacity: 0.1, radius: 4 }),
    buildPreviewShapeMarkup(16, 18, 34, 4, {
      opacity: accentLineIndex === 0 ? 0.5 : 0.22,
      accent: accentLineIndex === 0,
    }),
    buildPreviewShapeMarkup(22, 27, 46, 4, {
      opacity: accentLineIndex === 1 ? 0.5 : 0.22,
      accent: accentLineIndex === 1,
    }),
    buildPreviewShapeMarkup(22, 36, 28, 4, {
      opacity: accentLineIndex === 2 ? 0.5 : 0.22,
      accent: accentLineIndex === 2,
    }),
  ].join('');

const getUtilityPreviewShapes = () => ({
  'db-contact-form': [
    buildPreviewShapeMarkup(14, 10, 68, 9, { opacity: 0.18, radius: 2 }),
    buildPreviewShapeMarkup(14, 23, 68, 9, { opacity: 0.18, radius: 2 }),
    buildPreviewShapeMarkup(14, 36, 30, 10, { opacity: 0.5, accent: true, radius: 3 }),
  ].join(''),
  'db-form-field': [
    buildPreviewShapeMarkup(14, 16, 26, 4, { opacity: 0.3 }),
    buildPreviewShapeMarkup(14, 25, 68, 12, { opacity: 0.16, radius: 3 }),
  ].join(''),
  'db-radio-group': [
    buildPreviewCircleMarkup(18, 18, 4, { opacity: 0.5, accent: true }),
    buildPreviewShapeMarkup(28, 16, 48, 4, { opacity: 0.24 }),
    buildPreviewCircleMarkup(18, 32, 4, { opacity: 0.18 }),
    buildPreviewShapeMarkup(28, 30, 40, 4, { opacity: 0.24 }),
    buildPreviewCircleMarkup(18, 45, 4, { opacity: 0.18 }),
    buildPreviewShapeMarkup(28, 43, 44, 4, { opacity: 0.24 }),
  ].join(''),
  'db-repeater': [
    buildPreviewShapeMarkup(10, 10, 76, 11, { opacity: 0.26, radius: 3 }),
    buildPreviewShapeMarkup(10, 25, 76, 11, { opacity: 0.18, radius: 3 }),
    buildPreviewShapeMarkup(10, 40, 76, 11, { opacity: 0.1, radius: 3 }),
  ].join(''),
  'db-custom-html': buildCodePreviewShapes(0),
  'db-custom-css': buildCodePreviewShapes(1),
  'db-custom-script': buildCodePreviewShapes(2),
  'db-symbol': [
    buildPreviewShapeMarkup(10, 12, 34, 36, { opacity: 0.3, accent: true, radius: 4 }),
    buildPreviewShapeMarkup(52, 12, 34, 36, { opacity: 0.16, radius: 4 }),
    buildPreviewRowMarkup(20, 2, { height: 4, radius: 2, opacity: 0.4, x: 16, width: 64, gap: 22 }),
  ].join(''),
});

export default getUtilityPreviewShapes;
