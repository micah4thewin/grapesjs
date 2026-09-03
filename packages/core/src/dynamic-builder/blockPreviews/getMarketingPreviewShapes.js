import buildPreviewCircleMarkup from './buildPreviewCircleMarkup.js';
import buildPreviewRowMarkup from './buildPreviewRowMarkup.js';
import buildPreviewShapeMarkup from './buildPreviewShapeMarkup.js';

const getMarketingPreviewShapes = () => ({
  'db-hero-centered': [
    buildPreviewShapeMarkup(4, 6, 88, 48, { opacity: 0.1, radius: 4 }),
    buildPreviewShapeMarkup(24, 16, 48, 9, { opacity: 0.4, radius: 3 }),
    buildPreviewShapeMarkup(18, 30, 60, 4, { opacity: 0.2 }),
    buildPreviewShapeMarkup(36, 40, 24, 9, { opacity: 0.55, accent: true, radius: 4 }),
  ].join(''),
  'db-hero-split': [
    buildPreviewShapeMarkup(8, 14, 38, 9, { opacity: 0.4, radius: 3 }),
    buildPreviewShapeMarkup(8, 28, 32, 4, { opacity: 0.2 }),
    buildPreviewShapeMarkup(8, 38, 22, 8, { opacity: 0.55, accent: true, radius: 4 }),
    buildPreviewShapeMarkup(52, 10, 38, 40, { opacity: 0.22, radius: 4 }),
  ].join(''),
  'db-features-three-up': [
    buildPreviewShapeMarkup(28, 8, 40, 5, { opacity: 0.34 }),
    buildPreviewCircleMarkup(20, 26, 4.5, { opacity: 0.45, accent: true }),
    buildPreviewCircleMarkup(48, 26, 4.5, { opacity: 0.45, accent: true }),
    buildPreviewCircleMarkup(76, 26, 4.5, { opacity: 0.45, accent: true }),
    buildPreviewRowMarkup(36, 3, { height: 12, radius: 3, opacity: 0.16 }),
  ].join(''),
  'db-card': [
    buildPreviewShapeMarkup(20, 8, 56, 44, { opacity: 0.14, radius: 4 }),
    buildPreviewShapeMarkup(26, 14, 44, 16, { opacity: 0.26, radius: 3 }),
    buildPreviewShapeMarkup(26, 34, 34, 5, { opacity: 0.3 }),
    buildPreviewShapeMarkup(26, 43, 26, 4, { opacity: 0.16 }),
  ].join(''),
  'db-testimonial': [
    buildPreviewShapeMarkup(10, 12, 76, 36, { opacity: 0.12, radius: 4 }),
    buildPreviewShapeMarkup(20, 19, 56, 5, { opacity: 0.28 }),
    buildPreviewShapeMarkup(20, 28, 44, 5, { opacity: 0.28 }),
    buildPreviewCircleMarkup(24, 41, 4.5, { opacity: 0.42, accent: true }),
    buildPreviewShapeMarkup(33, 39, 26, 4, { opacity: 0.18 }),
  ].join(''),
  'db-logo-cloud': [
    buildPreviewRowMarkup(16, 4, { height: 10, radius: 2, opacity: 0.2 }),
    buildPreviewRowMarkup(34, 4, { height: 10, radius: 2, opacity: 0.12 }),
  ].join(''),
  'db-stats-row': [
    buildPreviewShapeMarkup(12, 16, 20, 12, { opacity: 0.45, accent: true, radius: 2 }),
    buildPreviewShapeMarkup(38, 16, 20, 12, { opacity: 0.45, accent: true, radius: 2 }),
    buildPreviewShapeMarkup(64, 16, 20, 12, { opacity: 0.45, accent: true, radius: 2 }),
    buildPreviewRowMarkup(33, 3, { height: 4, radius: 2, opacity: 0.18, x: 12, width: 72 }),
  ].join(''),
  'db-pricing': [
    buildPreviewShapeMarkup(8, 14, 24, 34, { opacity: 0.14, radius: 3 }),
    buildPreviewShapeMarkup(36, 8, 24, 44, { opacity: 0.3, radius: 3 }),
    buildPreviewShapeMarkup(64, 14, 24, 34, { opacity: 0.14, radius: 3 }),
    buildPreviewShapeMarkup(42, 38, 12, 6, { opacity: 0.55, accent: true, radius: 3 }),
  ].join(''),
  'db-cta-banner': [
    buildPreviewShapeMarkup(6, 16, 84, 28, { opacity: 0.34, accent: true, radius: 4 }),
    buildPreviewShapeMarkup(16, 24, 40, 5, { opacity: 0.4 }),
    buildPreviewShapeMarkup(16, 34, 28, 4, { opacity: 0.24 }),
    buildPreviewShapeMarkup(64, 26, 18, 9, { opacity: 0.5, radius: 4 }),
  ].join(''),
  'db-contact': [
    buildPreviewShapeMarkup(8, 12, 36, 36, { opacity: 0.14, radius: 3 }),
    buildPreviewShapeMarkup(50, 12, 38, 8, { opacity: 0.22, radius: 2 }),
    buildPreviewShapeMarkup(50, 24, 38, 8, { opacity: 0.22, radius: 2 }),
    buildPreviewShapeMarkup(50, 38, 22, 9, { opacity: 0.5, accent: true, radius: 3 }),
  ].join(''),
  'db-footer': [
    buildPreviewShapeMarkup(6, 10, 84, 40, { opacity: 0.1, radius: 4 }),
    buildPreviewShapeMarkup(14, 17, 20, 5, { opacity: 0.36, accent: true }),
    buildPreviewRowMarkup(28, 3, { height: 4, radius: 2, opacity: 0.2, x: 14, width: 68 }),
    buildPreviewShapeMarkup(14, 40, 40, 3, { opacity: 0.14 }),
  ].join(''),
});

export default getMarketingPreviewShapes;
