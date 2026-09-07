const buildCarouselMediaCss = (mediaThemeRecord) => {
  const accentColor = mediaThemeRecord.accentColor;
  return [
    '.db-carousel { position: relative; }',
    '.db-carousel-track {',
    '  display: flex; overflow: hidden; scroll-snap-type: x mandatory; border-radius: 0.75rem; touch-action: pan-y;',
    '}',
    '.db-carousel-slide { flex: 0 0 100%; min-width: 100%; scroll-snap-align: start; }',
    ':where(.db-carousel-slide) img { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }',
    '.db-carousel-control { position: absolute; width: 2.75rem; height: 2.75rem; }',
    '.db-carousel-prev, .db-carousel-next { top: 50%; transform: translateY(-50%); }',
    '.db-carousel-prev { left: 0.75rem; }',
    '.db-carousel-next { right: 0.75rem; }',
    '.db-carousel-pause { right: 0.75rem; bottom: 3.5rem; }',
    ".db-carousel:not([data-db-autoplay='true']) .db-carousel-pause { display: none; }",
    '.db-carousel-pause svg:last-child { display: none; }',
    ".db-carousel-pause[aria-pressed='true'] svg:first-child { display: none; }",
    ".db-carousel-pause[aria-pressed='true'] svg:last-child { display: block; }",
    '.db-carousel-dots { display: flex; justify-content: center; gap: 0; padding: 0.25rem 0 0; }',
    ".db-carousel[data-db-dots='false'] .db-carousel-dots { display: none; }",
    '.db-carousel-dot {',
    '  position: relative; width: 2.75rem; height: 2.75rem; padding: 0; border: 0; background: transparent;',
    '  cursor: pointer;',
    '}',
    '.db-carousel-dot::before {',
    "  content: ''; position: absolute; top: 50%; left: 50%; width: 0.625rem; height: 0.625rem;",
    '  transform: translate(-50%, -50%); border-radius: 50%; background: rgba(100, 116, 139, 0.55);',
    '}',
    ".db-carousel-dot[aria-current='true']::before { background: " + accentColor + '; }',
    '.db-carousel-status {',
    '  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;',
    '  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;',
    '}',
  ].join('\n');
};

export default buildCarouselMediaCss;
