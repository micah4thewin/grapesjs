import getMarketingLookRootSelectors from './getMarketingLookRootSelectors.js';

const buildMarketingLookSurfaceCss = () => {
  const photoRoots = getMarketingLookRootSelectors('photo');
  return [
    '.db-hero, .db-pricing, .db-footer { position: relative; }',
    getMarketingLookRootSelectors('light').join(', ') +
      ' { background-color: var(--db-color-surface-alt, #f4f6fa); color: var(--db-color-text, #111827); }',
    getMarketingLookRootSelectors('dark').join(', ') +
      ' { background-color: var(--db-color-text, #111827); color: var(--db-color-surface, #ffffff); }',
    getMarketingLookRootSelectors('brand').join(', ') +
      ' { background-color: var(--db-color-brand, #4f46e5); color: var(--db-color-brand-contrast, #ffffff); }',
    photoRoots.join(', ') +
      ' { background-color: #1f2937; background-image: var(--db-section-bg-image, linear-gradient(135deg, #1e293b, #475569));' +
      ' background-size: cover; background-position: center; background-repeat: no-repeat; color: #ffffff; }',
    photoRoots.map((rootSelector) => rootSelector + '::before').join(', ') +
      ' { content: ""; position: absolute; inset: 0; background: linear-gradient(rgba(15, 23, 42, 0.58), rgba(15, 23, 42, 0.58)); pointer-events: none; }',
    photoRoots.map((rootSelector) => rootSelector + ' > *').join(', ') + ' { position: relative; z-index: 1; }',
    '[data-db-theme=dark], [data-db-theme=photo], [data-db-overlay=true] {' +
      ' --db-color-text-muted: rgba(255, 255, 255, 0.76); --db-color-line: rgba(255, 255, 255, 0.22); }',
    '[data-db-theme=brand] {' +
      ' --db-color-text-muted: color-mix(in srgb, var(--db-color-brand-contrast, #ffffff) 80%, transparent);' +
      ' --db-color-line: color-mix(in srgb, var(--db-color-brand-contrast, #ffffff) 30%, transparent); }',
  ].join('\n');
};

export default buildMarketingLookSurfaceCss;
