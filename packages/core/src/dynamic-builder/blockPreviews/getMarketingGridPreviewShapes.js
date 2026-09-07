import buildPreviewCardStackMarkup from './buildPreviewCardStackMarkup.js';

const buildThreeUpMarkup = (accentKind) =>
  [8, 36, 64].map((cardX) => buildPreviewCardStackMarkup(cardX, 24, accentKind)).join('');

const getMarketingGridPreviewShapes = () => ({
  'db-card-grid': buildThreeUpMarkup('image'),
  'db-testimonial-trio': buildThreeUpMarkup('quote'),
  'db-team-grid': buildThreeUpMarkup('portrait'),
});

export default getMarketingGridPreviewShapes;
