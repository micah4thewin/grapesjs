const getPreviewShellCss = () =>
  [
    'html, body { margin: 0; height: 100%; font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }',
    'body { display: flex; flex-direction: column; background: #f3f4f6; color: #16181d; }',
    '.db-preview-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; padding: 8px 14px;',
    ' background: #16181d; color: #fff; font-size: 13px; }',
    '.db-preview-bar strong { font-size: 14px; }',
    '.db-preview-bar select, .db-preview-bar button { min-height: 32px; border-radius: 6px; border: 1px solid #555;',
    ' background: #2a2d34; color: #fff; padding: 0 10px; font: inherit; cursor: pointer; }',
    '.db-preview-bar button[aria-pressed="true"] { background: #4f46e5; border-color: #4f46e5; }',
    '.db-preview-hint { opacity: 0.7; margin-left: auto; }',
    '[data-db-preview-errors][data-db-tone="error"] { color: #fca5a5; }',
    '.db-preview-stage { flex: 1; display: flex; justify-content: center; padding: 12px; min-height: 0; }',
    '[data-db-preview-host] { width: 100%; max-width: 100%; height: 100%; background: #fff;',
    ' box-shadow: 0 8px 24px rgba(0,0,0,0.15); transition: width 200ms ease; }',
    '[data-db-preview-frame] { width: 100%; height: 100%; border: 0; }',
  ].join('\n');

export default getPreviewShellCss;
