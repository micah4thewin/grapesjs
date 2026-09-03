import buildPreviewCircleMarkup from './buildPreviewCircleMarkup.js';
import buildPreviewRowMarkup from './buildPreviewRowMarkup.js';
import buildPreviewShapeMarkup from './buildPreviewShapeMarkup.js';

const getMediaPreviewShapes = () => ({
  'db-image': [
    buildPreviewShapeMarkup(12, 12, 72, 36, { opacity: 0.2, radius: 4 }),
    buildPreviewCircleMarkup(28, 24, 4, { opacity: 0.42 }),
    '<path d="M16 44 L34 28 L46 38 L58 30 L80 44 Z" fill="currentColor" opacity="0.34"/>',
  ].join(''),
  'db-gallery': [
    buildPreviewRowMarkup(12, 3, { height: 16, radius: 3 }),
    buildPreviewRowMarkup(32, 3, { height: 16, radius: 3, opacity: 0.16 }),
  ].join(''),
  'db-carousel': [
    buildPreviewShapeMarkup(4, 16, 12, 28, { opacity: 0.12, radius: 3 }),
    buildPreviewShapeMarkup(20, 12, 56, 36, { opacity: 0.26, radius: 4 }),
    buildPreviewShapeMarkup(80, 16, 12, 28, { opacity: 0.12, radius: 3 }),
  ].join(''),
  'db-video': [
    buildPreviewShapeMarkup(12, 12, 72, 36, { opacity: 0.2, radius: 4 }),
    '<path d="M42 22 L58 30 L42 38 Z" fill="var(--gjs-db-accent, currentColor)" opacity="0.6"/>',
  ].join(''),
  'db-map': [
    buildPreviewShapeMarkup(12, 12, 72, 36, { opacity: 0.16, radius: 4 }),
    '<path d="M12 38 L32 26 L52 34 L84 20" stroke="currentColor" stroke-width="2" fill="none" opacity="0.3"/>',
    buildPreviewCircleMarkup(58, 26, 5, { opacity: 0.55, accent: true }),
  ].join(''),
});

export default getMediaPreviewShapes;
