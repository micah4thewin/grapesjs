import buildPreviewRowMarkup from './buildPreviewRowMarkup.js';
import buildPreviewShapeMarkup from './buildPreviewShapeMarkup.js';

const getLayoutPreviewShapes = () => ({
  'db-section': [
    buildPreviewShapeMarkup(6, 8, 84, 44, { opacity: 0.12, radius: 4 }),
    buildPreviewShapeMarkup(16, 18, 64, 6, { opacity: 0.34 }),
    buildPreviewShapeMarkup(16, 30, 44, 4, { opacity: 0.2 }),
    buildPreviewShapeMarkup(16, 38, 52, 4, { opacity: 0.2 }),
  ].join(''),
  'db-container': [
    buildPreviewShapeMarkup(4, 8, 88, 44, { opacity: 0.1, radius: 4 }),
    buildPreviewShapeMarkup(20, 14, 56, 32, { opacity: 0.26, radius: 3 }),
  ].join(''),
  'db-columns-two': buildPreviewRowMarkup(14, 2, { height: 32, radius: 3 }),
  'db-columns-three': buildPreviewRowMarkup(16, 3, { height: 28, radius: 3 }),
  'db-columns-four': buildPreviewRowMarkup(18, 4, { height: 24, radius: 3 }),
  'db-sidebar-layout': [
    buildPreviewShapeMarkup(10, 14, 22, 32, { opacity: 0.18, radius: 3 }),
    buildPreviewShapeMarkup(36, 14, 50, 32, { opacity: 0.3, radius: 3 }),
  ].join(''),
  'db-spacer': [
    buildPreviewShapeMarkup(10, 12, 76, 5, { opacity: 0.24 }),
    buildPreviewShapeMarkup(10, 43, 76, 5, { opacity: 0.24 }),
    buildPreviewShapeMarkup(44, 24, 8, 12, { opacity: 0.14, radius: 4 }),
  ].join(''),
  'db-divider': [
    buildPreviewShapeMarkup(10, 18, 76, 4, { opacity: 0.16 }),
    buildPreviewShapeMarkup(10, 29, 76, 3, { opacity: 0.42, accent: true, radius: 2 }),
    buildPreviewShapeMarkup(10, 40, 76, 4, { opacity: 0.16 }),
  ].join(''),
});

export default getLayoutPreviewShapes;
