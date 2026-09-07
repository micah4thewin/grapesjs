import buildMapZoomGridCss from './buildMapZoomGridCss.js';

const buildFacadeMediaCss = (mediaThemeRecord) => {
  const controlColor = mediaThemeRecord.controlColor;
  const gridLine = 'rgba(15, 23, 42, 0.12)';
  return [
    '.db-video, .db-map {',
    '  position: relative; display: flex; flex-direction: column; align-items: center;',
    '  justify-content: center; gap: 0.75rem; aspect-ratio: 16 / 9; padding: 1.5rem;',
    '  border-radius: 0.75rem; overflow: hidden; text-align: center;',
    '  background-color: #0f172a; background-size: cover; background-position: center;',
    '  background-image: linear-gradient(135deg, #1e293b, #0f172a); color: ' + controlColor + ';',
    '}',
    '.db-map {',
    '  background-color: #e2e8f0; color: #0f172a; background-position: 0 0; background-size: 2rem 2rem;',
    '  background-image: linear-gradient(' + gridLine + ' 1px, transparent 1px),',
    '    linear-gradient(90deg, ' + gridLine + ' 1px, transparent 1px);',
    '}',
    buildMapZoomGridCss(),
    '.db-map-placeholder { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }',
    '.db-map-pin { display: inline-flex; }',
    '.db-map-address { margin: 0; font-weight: 600; }',
    '.db-facade-button { padding: 0.625rem 1.25rem; font-size: 0.9375rem; font-weight: 600; }',
    '.db-video .db-facade-button { background: ' + controlColor + '; color: #0f172a; }',
    '.db-video .db-facade-button:hover { background: rgba(248, 250, 252, 0.85); }',
    '.db-facade-note { margin: 0; max-width: 34rem; font-size: 0.8125rem; opacity: 0.85; }',
    '.db-facade-missing { padding: 0.35rem 0.75rem; border-radius: 0.5rem; background: #b45309; color: #fff; opacity: 1; }',
    '.db-video iframe, .db-video video, .db-map iframe {',
    '  position: absolute; inset: 0; width: 100%; height: 100%; border: 0;',
    '}',
  ].join('\n');
};

export default buildFacadeMediaCss;
