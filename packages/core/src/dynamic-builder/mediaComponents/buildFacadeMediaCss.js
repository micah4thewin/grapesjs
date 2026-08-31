const buildFacadeMediaCss = (mediaThemeRecord) => {
  const controlColor = mediaThemeRecord.controlColor;
  return [
    '.db-video, .db-map {',
    '  position: relative; display: flex; flex-direction: column; align-items: center;',
    '  justify-content: center; gap: 0.75rem; aspect-ratio: 16 / 9; padding: 1.5rem;',
    '  border-radius: 0.75rem; overflow: hidden; text-align: center;',
    '  background-color: #0f172a; background-size: cover; background-position: center;',
    '  color: ' + controlColor + ';',
    '}',
    '.db-map { background-color: #e2e8f0; color: #0f172a; }',
    '.db-map-placeholder { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }',
    '.db-map-pin { display: inline-flex; }',
    '.db-map-address { margin: 0; font-weight: 600; }',
    '.db-facade-button { padding: 0.625rem 1.25rem; font-size: 0.9375rem; font-weight: 600; }',
    '.db-facade-note { margin: 0; max-width: 34rem; font-size: 0.8125rem; opacity: 0.85; }',
    '.db-video iframe, .db-video video, .db-map iframe {',
    '  position: absolute; inset: 0; width: 100%; height: 100%; border: 0;',
    '}',
  ].join('\n');
};

export default buildFacadeMediaCss;
