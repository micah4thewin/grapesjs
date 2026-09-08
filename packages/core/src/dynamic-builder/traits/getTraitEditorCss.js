import buildMenuItemsTraitCss from './buildMenuItemsTraitCss.js';
import buildTraitControlsCss from './buildTraitControlsCss.js';

const getTraitEditorCss = () =>
  [
    '.gjs-db-trait-invalid { outline: 2px solid var(--gjs-db-error); outline-offset: -1px; }',
    '.gjs-db-trait-error { margin: 4px 0 0; font-size: 0.78rem; line-height: 1.4; color: var(--gjs-db-error); }',
    '.gjs-db-trait-json { font-family: monospace; resize: vertical; }',
    '.gjs-db-trait-condition { display: flex; flex-direction: column; gap: 6px; }',
    buildTraitControlsCss(),
    buildMenuItemsTraitCss(),
  ].join('\n');

export default getTraitEditorCss;
