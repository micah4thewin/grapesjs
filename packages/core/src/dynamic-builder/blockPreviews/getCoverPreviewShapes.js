import buildPreviewCircleMarkup from './buildPreviewCircleMarkup.js';
import buildPreviewShapeMarkup from './buildPreviewShapeMarkup.js';

const buildCoverBaseMarkup = () =>
  [
    buildPreviewShapeMarkup(4, 4, 88, 52, { opacity: 0.22, radius: 4 }),
    '<path d="M4 50 L30 30 L46 42 L62 32 L92 50 L92 56 L4 56 Z" fill="currentColor" opacity="0.2"/>',
    buildPreviewShapeMarkup(24, 16, 48, 8, { opacity: 0.55, radius: 2 }),
    buildPreviewShapeMarkup(32, 29, 32, 4, { opacity: 0.35 }),
  ].join('');

const getCoverPreviewShapes = () => ({
  'db-cover-photo': buildCoverBaseMarkup() + buildPreviewCircleMarkup(74, 16, 5, { opacity: 0.45 }),
  'db-cover-video':
    buildCoverBaseMarkup() +
    '<path d="M42 38 L54 44 L42 50 Z" fill="var(--gjs-db-accent, currentColor)" opacity="0.75"/>',
});

export default getCoverPreviewShapes;
