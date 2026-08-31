const buildCarouselMediaCss = (mediaThemeRecord) => {
  const accentColor = mediaThemeRecord.accentColor;
  return [
    '.db-carousel { position: relative; }',
    '.db-carousel-track {',
    '  display: flex; overflow: hidden; scroll-snap-type: x mandatory; border-radius: 0.75rem;',
    '}',
    '.db-carousel-slide { flex: 0 0 100%; min-width: 100%; scroll-snap-align: start; }',
    '.db-carousel-slide img { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }',
    '.db-carousel-control {',
    '  position: absolute; top: 50%; transform: translateY(-50%); width: 2.5rem; height: 2.5rem;',
    '}',
    '.db-carousel-prev { left: 0.75rem; }',
    '.db-carousel-next { right: 0.75rem; }',
    '.db-carousel-dots { display: flex; justify-content: center; gap: 0.5rem; padding: 0.75rem 0 0; }',
    ".db-carousel[data-db-dots='false'] .db-carousel-dots { display: none; }",
    '.db-carousel-dot {',
    '  width: 0.625rem; height: 0.625rem; padding: 0; border: 0; border-radius: 50%;',
    '  cursor: pointer; background: rgba(100, 116, 139, 0.55);',
    '}',
    ".db-carousel-dot[aria-current='true'] { background: " + accentColor + '; }',
    '.db-carousel-status {',
    '  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;',
    '  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;',
    '}',
  ].join('\n');
};

export default buildCarouselMediaCss;
