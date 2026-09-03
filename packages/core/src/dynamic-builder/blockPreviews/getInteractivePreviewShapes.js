import buildPreviewCircleMarkup from './buildPreviewCircleMarkup.js';
import buildPreviewRowMarkup from './buildPreviewRowMarkup.js';
import buildPreviewShapeMarkup from './buildPreviewShapeMarkup.js';

const getInteractivePreviewShapes = () => ({
  'db-navbar': [
    buildPreviewShapeMarkup(6, 18, 84, 24, { opacity: 0.12, radius: 4 }),
    buildPreviewShapeMarkup(13, 27, 18, 6, { opacity: 0.45, accent: true }),
    buildPreviewShapeMarkup(44, 28, 12, 4, { opacity: 0.28 }),
    buildPreviewShapeMarkup(60, 28, 12, 4, { opacity: 0.28 }),
    buildPreviewShapeMarkup(76, 25, 10, 10, { opacity: 0.34, radius: 2 }),
  ].join(''),
  'db-breadcrumb': [
    buildPreviewShapeMarkup(10, 27, 16, 5, { opacity: 0.3 }),
    buildPreviewCircleMarkup(31, 30, 1.6, { opacity: 0.3 }),
    buildPreviewShapeMarkup(36, 27, 20, 5, { opacity: 0.3 }),
    buildPreviewCircleMarkup(61, 30, 1.6, { opacity: 0.3 }),
    buildPreviewShapeMarkup(66, 27, 18, 5, { opacity: 0.45, accent: true }),
  ].join(''),
  'db-accordion-faq': [
    buildPreviewShapeMarkup(10, 10, 76, 12, { opacity: 0.24, radius: 3 }),
    buildPreviewShapeMarkup(10, 25, 76, 12, { opacity: 0.12, radius: 3 }),
    buildPreviewShapeMarkup(10, 40, 76, 12, { opacity: 0.12, radius: 3 }),
    buildPreviewShapeMarkup(76, 15, 6, 2, { opacity: 0.5, accent: true, radius: 1 }),
  ].join(''),
  'db-tabs': [
    buildPreviewShapeMarkup(10, 12, 22, 8, { opacity: 0.45, accent: true, radius: 2 }),
    buildPreviewShapeMarkup(35, 12, 22, 8, { opacity: 0.16, radius: 2 }),
    buildPreviewShapeMarkup(60, 12, 22, 8, { opacity: 0.16, radius: 2 }),
    buildPreviewShapeMarkup(10, 26, 76, 24, { opacity: 0.14, radius: 3 }),
  ].join(''),
  'db-countdown': buildPreviewRowMarkup(18, 4, { height: 24, radius: 3, opacity: 0.26 }),
  'db-social-links': [
    buildPreviewCircleMarkup(24, 30, 7, { opacity: 0.28 }),
    buildPreviewCircleMarkup(42, 30, 7, { opacity: 0.28 }),
    buildPreviewCircleMarkup(60, 30, 7, { opacity: 0.28 }),
    buildPreviewCircleMarkup(78, 30, 7, { opacity: 0.28 }),
  ].join(''),
  'db-announcement-bar': [
    buildPreviewShapeMarkup(6, 22, 84, 16, { opacity: 0.4, accent: true, radius: 3 }),
    buildPreviewShapeMarkup(22, 28, 44, 4, { opacity: 0.3 }),
  ].join(''),
  'db-alert-button': [
    buildPreviewShapeMarkup(18, 10, 60, 28, { opacity: 0.16, radius: 4 }),
    buildPreviewShapeMarkup(28, 17, 40, 5, { opacity: 0.3 }),
    buildPreviewShapeMarkup(34, 27, 28, 6, { opacity: 0.5, accent: true, radius: 3 }),
    buildPreviewShapeMarkup(34, 44, 28, 9, { opacity: 0.34, radius: 4 }),
  ].join(''),
});

export default getInteractivePreviewShapes;
