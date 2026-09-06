import buildMenuItemsTraitCss from './buildMenuItemsTraitCss.js';

const getTraitEditorCss = () =>
  [
    '.gjs-db-trait-invalid { outline: 2px solid #e05252; outline-offset: -1px; }',
    '.gjs-db-trait-slider { display: flex; align-items: center; gap: 8px; }',
    '.gjs-db-trait-slider input[type="range"] { flex: 1 1 auto; min-width: 0; padding: 0; }',
    '.gjs-db-trait-slider-readout { min-width: 34px; text-align: right; font-variant-numeric: tabular-nums; }',
    '.gjs-db-trait-json { font-family: monospace; resize: vertical; }',
    '.gjs-db-trait-asset { display: flex; align-items: center; gap: 8px; }',
    '.gjs-db-trait-asset-thumb { width: 38px; height: 38px; object-fit: cover; border-radius: 4px; }',
    '.gjs-db-trait-condition { display: flex; flex-direction: column; gap: 6px; }',
    buildMenuItemsTraitCss(),
  ].join('\n');

export default getTraitEditorCss;
