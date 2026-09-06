import buildPreviewCircleMarkup from './buildPreviewCircleMarkup.js';
import buildPreviewShapeMarkup from './buildPreviewShapeMarkup.js';

const getTypographyPreviewShapes = () => ({
  'db-heading': [
    buildPreviewShapeMarkup(10, 18, 62, 9, { opacity: 0.42, radius: 3 }),
    buildPreviewShapeMarkup(10, 33, 40, 5, { opacity: 0.18 }),
  ].join(''),
  'db-text': [
    buildPreviewShapeMarkup(10, 16, 76, 5, { opacity: 0.24 }),
    buildPreviewShapeMarkup(10, 26, 76, 5, { opacity: 0.24 }),
    buildPreviewShapeMarkup(10, 36, 50, 5, { opacity: 0.24 }),
  ].join(''),
  'db-lead-text': [
    buildPreviewShapeMarkup(10, 18, 76, 7, { opacity: 0.32 }),
    buildPreviewShapeMarkup(10, 31, 60, 7, { opacity: 0.32 }),
  ].join(''),
  'db-eyebrow-heading': [
    buildPreviewShapeMarkup(10, 15, 26, 4, { opacity: 0.5, accent: true }),
    buildPreviewShapeMarkup(10, 25, 66, 9, { opacity: 0.38, radius: 3 }),
  ].join(''),
  'db-quote': [
    buildPreviewShapeMarkup(10, 14, 3, 32, { opacity: 0.5, accent: true, radius: 2 }),
    buildPreviewShapeMarkup(19, 17, 64, 6, { opacity: 0.28 }),
    buildPreviewShapeMarkup(19, 27, 52, 6, { opacity: 0.28 }),
    buildPreviewShapeMarkup(19, 38, 28, 4, { opacity: 0.16 }),
  ].join(''),
  'db-list': [
    buildPreviewCircleMarkup(13, 18, 2.5, { opacity: 0.45, accent: true }),
    buildPreviewShapeMarkup(21, 15, 62, 5, { opacity: 0.24 }),
    buildPreviewCircleMarkup(13, 30, 2.5, { opacity: 0.45, accent: true }),
    buildPreviewShapeMarkup(21, 27, 54, 5, { opacity: 0.24 }),
    buildPreviewCircleMarkup(13, 42, 2.5, { opacity: 0.45, accent: true }),
    buildPreviewShapeMarkup(21, 39, 58, 5, { opacity: 0.24 }),
  ].join(''),
  'db-callout-info': [
    buildPreviewShapeMarkup(8, 15, 80, 30, { opacity: 0.14, radius: 4 }),
    buildPreviewShapeMarkup(8, 15, 3, 30, { opacity: 0.55, accent: true, radius: 2 }),
    buildPreviewShapeMarkup(18, 22, 44, 5, { opacity: 0.32 }),
    buildPreviewShapeMarkup(18, 32, 60, 4, { opacity: 0.2 }),
  ].join(''),
  'db-figure': [
    buildPreviewShapeMarkup(12, 10, 72, 30, { opacity: 0.22, radius: 3 }),
    buildPreviewCircleMarkup(26, 22, 4, { opacity: 0.4 }),
    buildPreviewShapeMarkup(12, 46, 44, 4, { opacity: 0.18 }),
  ].join(''),
  'db-icon-text-row': [
    buildPreviewCircleMarkup(18, 30, 8, { opacity: 0.32, accent: true }),
    buildPreviewShapeMarkup(32, 24, 52, 5, { opacity: 0.28 }),
    buildPreviewShapeMarkup(32, 34, 38, 4, { opacity: 0.18 }),
  ].join(''),
  'db-icon': [buildPreviewCircleMarkup(48, 30, 13, { opacity: 0.3, accent: true })].join(''),
});

export default getTypographyPreviewShapes;
