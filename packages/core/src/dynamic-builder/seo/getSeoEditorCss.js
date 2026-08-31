const getSeoEditorCss = () =>
  [
    '.gjs-db-seo-modal { display: grid; gap: 16px; max-height: 72vh; overflow-y: auto; padding-right: 4px; }',
    '.gjs-db-seo-tabs { display: flex; gap: 8px; }',
    '.gjs-db-seo-section { display: grid; gap: 14px; align-content: start; }',
    '.gjs-db-seo-section[hidden] { display: none; }',
    '.gjs-db-seo-label-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }',
    '.gjs-db-seo-checkbox { display: flex; gap: 8px; align-items: center; cursor: pointer; }',
    '.gjs-db-seo-counter { white-space: nowrap; }',
    '.gjs-db-seo-modal textarea.gjs-db-field-input { min-height: 64px; resize: vertical; }',
    '.gjs-db-seo-previews { align-items: stretch; gap: 12px; }',
    '.gjs-db-seo-preview-heading { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; }',
    '.gjs-db-seo-search-preview .gjs-db-preview-title { color: var(--gjs-db-focus, #1a73e8); }',
    '.gjs-db-seo-search-preview .gjs-db-preview-url { overflow-wrap: anywhere; }',
    '.gjs-db-seo-social-image { height: 120px; border-radius: 6px; background-size: cover;',
    '  background-position: center; background-color: var(--gjs-db-sunken, rgba(127, 127, 127, 0.15));',
    '  display: flex; align-items: center; justify-content: center; font-size: 12px;',
    '  color: var(--gjs-db-faint, #8a8f98); }',
    '.gjs-db-seo-social-image-empty { border: 1px dashed var(--gjs-db-line, rgba(127, 127, 127, 0.4)); }',
  ].join('\n');

export default getSeoEditorCss;
