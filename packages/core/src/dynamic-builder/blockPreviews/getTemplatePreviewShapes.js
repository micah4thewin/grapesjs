import buildPreviewRowMarkup from './buildPreviewRowMarkup.js';
import buildPreviewShapeMarkup from './buildPreviewShapeMarkup.js';

const buildPageTemplateShapes = (bodyShapes) =>
  [
    buildPreviewShapeMarkup(8, 4, 80, 52, { opacity: 0.08, radius: 4 }),
    buildPreviewShapeMarkup(14, 9, 30, 4, { opacity: 0.4, accent: true }),
    bodyShapes,
  ].join('');

const getTemplatePreviewShapes = () => ({
  'db-template-landing': buildPageTemplateShapes(
    [
      buildPreviewShapeMarkup(14, 18, 46, 8, { opacity: 0.32, radius: 2 }),
      buildPreviewShapeMarkup(14, 30, 26, 6, { opacity: 0.5, accent: true, radius: 3 }),
      buildPreviewRowMarkup(42, 3, { height: 8, radius: 2, opacity: 0.16, x: 14, width: 68 }),
    ].join(''),
  ),
  'db-template-about': buildPageTemplateShapes(
    [
      buildPreviewShapeMarkup(14, 18, 30, 22, { opacity: 0.26, radius: 3 }),
      buildPreviewShapeMarkup(50, 18, 32, 5, { opacity: 0.28 }),
      buildPreviewShapeMarkup(50, 27, 26, 5, { opacity: 0.18 }),
      buildPreviewRowMarkup(44, 4, { height: 6, radius: 2, opacity: 0.14, x: 14, width: 68 }),
    ].join(''),
  ),
  'db-template-contact': buildPageTemplateShapes(
    [
      buildPreviewShapeMarkup(14, 18, 32, 30, { opacity: 0.2, radius: 3 }),
      buildPreviewShapeMarkup(52, 18, 30, 7, { opacity: 0.16, radius: 2 }),
      buildPreviewShapeMarkup(52, 29, 30, 7, { opacity: 0.16, radius: 2 }),
      buildPreviewShapeMarkup(52, 40, 20, 8, { opacity: 0.5, accent: true, radius: 3 }),
    ].join(''),
  ),
  'db-template-portfolio': buildPageTemplateShapes(
    [
      buildPreviewRowMarkup(18, 3, { height: 14, radius: 3, opacity: 0.26, x: 14, width: 68 }),
      buildPreviewRowMarkup(35, 3, { height: 14, radius: 3, opacity: 0.16, x: 14, width: 68 }),
    ].join(''),
  ),
  'db-template-services': buildPageTemplateShapes(
    [
      buildPreviewShapeMarkup(14, 18, 40, 7, { opacity: 0.3, radius: 2 }),
      buildPreviewRowMarkup(29, 3, { height: 10, radius: 3, opacity: 0.18, x: 14, width: 68 }),
      buildPreviewShapeMarkup(14, 43, 24, 8, { opacity: 0.5, accent: true, radius: 3 }),
    ].join(''),
  ),
  'db-template-pricing': buildPageTemplateShapes(
    [
      buildPreviewShapeMarkup(14, 20, 20, 28, { opacity: 0.14, radius: 3 }),
      buildPreviewShapeMarkup(38, 16, 20, 32, { opacity: 0.32, radius: 3 }),
      buildPreviewShapeMarkup(62, 20, 20, 28, { opacity: 0.14, radius: 3 }),
    ].join(''),
  ),
  'db-template-support': buildPageTemplateShapes(
    [
      buildPreviewShapeMarkup(14, 18, 68, 8, { opacity: 0.24, radius: 2 }),
      buildPreviewShapeMarkup(14, 29, 68, 8, { opacity: 0.14, radius: 2 }),
      buildPreviewShapeMarkup(14, 40, 68, 8, { opacity: 0.14, radius: 2 }),
    ].join(''),
  ),
  'db-template-launch': buildPageTemplateShapes(
    [
      buildPreviewShapeMarkup(22, 18, 52, 8, { opacity: 0.32, radius: 2 }),
      buildPreviewRowMarkup(30, 4, { height: 10, radius: 2, opacity: 0.24, x: 22, width: 52 }),
      buildPreviewShapeMarkup(30, 45, 36, 7, { opacity: 0.5, accent: true, radius: 3 }),
    ].join(''),
  ),
  'db-template-article': buildPageTemplateShapes(
    [
      buildPreviewShapeMarkup(14, 18, 54, 7, { opacity: 0.32, radius: 2 }),
      buildPreviewShapeMarkup(14, 30, 68, 4, { opacity: 0.18 }),
      buildPreviewShapeMarkup(14, 38, 68, 4, { opacity: 0.18 }),
      buildPreviewShapeMarkup(14, 46, 44, 4, { opacity: 0.18 }),
    ].join(''),
  ),
});

export default getTemplatePreviewShapes;
