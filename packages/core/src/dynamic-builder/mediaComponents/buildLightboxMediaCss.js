const buildLightboxMediaCss = (mediaThemeRecord) => {
  const controlColor = mediaThemeRecord.controlColor;
  return [
    '.db-lightbox {',
    '  position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center;',
    '  justify-content: center; background: ' + mediaThemeRecord.overlayColor + ';',
    '  opacity: 0; transition: opacity 0.2s ease;',
    '}',
    '.db-lightbox-open, .db-lightbox-instant { opacity: 1; }',
    '.db-lightbox-instant { transition: none; }',
    '.db-lightbox-frame { margin: 0; max-width: min(90vw, 70rem); }',
    '.db-lightbox-image {',
    '  display: block; max-width: 100%; max-height: 82vh; object-fit: contain; border-radius: 0.5rem;',
    '}',
    '.db-lightbox-control { position: absolute; width: 2.75rem; height: 2.75rem; font-size: 1.25rem; }',
    '.db-lightbox-close { top: 1rem; right: 1rem; }',
    '.db-lightbox-prev { top: 50%; left: 1rem; transform: translateY(-50%); }',
    '.db-lightbox-next { top: 50%; right: 1rem; transform: translateY(-50%); }',
    '.db-lightbox-counter {',
    '  position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%);',
    '  margin: 0; font-size: 0.875rem; color: ' + controlColor + ';',
    '}',
    '@media (prefers-reduced-motion: reduce) {',
    '  .db-lightbox { transition: none; opacity: 1; }',
    '}',
  ].join('\n');
};

export default buildLightboxMediaCss;
