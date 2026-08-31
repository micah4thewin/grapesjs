const buildMediaBaseCss = (mediaThemeRecord) => {
  const accentColor = mediaThemeRecord.accentColor;
  const controlColor = mediaThemeRecord.controlColor;
  return [
    '.db-image, .db-gallery-item img, .db-carousel-slide img { max-width: 100%; height: auto; }',
    '.db-image { display: block; }',
    '.db-radius-md { border-radius: 0.75rem; }',
    '.db-radius-pill { border-radius: 999px; }',
    '.db-radius-circle { border-radius: 50%; aspect-ratio: 1 / 1; object-fit: cover; }',
    '.db-carousel-control, .db-facade-button, .db-lightbox-control {',
    '  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;',
    '  border: 0; border-radius: 999px; cursor: pointer;',
    '  background: rgba(15, 23, 42, 0.65); color: ' + controlColor + ';',
    '}',
    '.db-carousel-control:hover, .db-facade-button:hover, .db-lightbox-control:hover {',
    '  background: rgba(15, 23, 42, 0.85);',
    '}',
    '.db-carousel-control:focus-visible, .db-facade-button:focus-visible,',
    '.db-lightbox-control:focus-visible, .db-carousel-dot:focus-visible {',
    '  outline: 3px solid ' + accentColor + '; outline-offset: 2px;',
    '}',
  ].join('\n');
};

export default buildMediaBaseCss;
