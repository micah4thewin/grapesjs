import buildPreviewShapeMarkup from './buildPreviewShapeMarkup.js';

const getFormPreviewShapes = () => ({
  'db-select-field': [
    buildPreviewShapeMarkup(14, 16, 26, 4, { opacity: 0.3 }),
    buildPreviewShapeMarkup(14, 25, 68, 14, { opacity: 0.16, radius: 3 }),
    buildPreviewShapeMarkup(20, 30, 30, 4, { opacity: 0.26 }),
    '<path d="M70 30 L74 34 L78 30" stroke="var(--gjs-db-accent, currentColor)" stroke-width="2" fill="none" opacity="0.7"/>',
  ].join(''),
  'db-file-upload-field': [
    buildPreviewShapeMarkup(14, 12, 26, 4, { opacity: 0.3 }),
    '<rect x="14" y="21" width="68" height="26" rx="3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.4"/>',
    '<path d="M48 40 L48 28 M43 33 L48 28 L53 33" stroke="var(--gjs-db-accent, currentColor)" stroke-width="2" fill="none" opacity="0.7"/>',
  ].join(''),
  'db-newsletter-signup': [
    buildPreviewShapeMarkup(22, 12, 52, 6, { opacity: 0.34, radius: 2 }),
    buildPreviewShapeMarkup(14, 26, 46, 12, { opacity: 0.16, radius: 3 }),
    buildPreviewShapeMarkup(62, 26, 20, 12, { opacity: 0.5, accent: true, radius: 3 }),
    buildPreviewShapeMarkup(14, 44, 40, 3, { opacity: 0.16 }),
  ].join(''),
});

export default getFormPreviewShapes;
