const buildDataBindingEditorOnlyCss = () =>
  [
    '.db-repeater [data-db-repeater-item] { position: relative; outline: 1px dashed rgba(79, 70, 229, 0.6);',
    '  outline-offset: 2px; }',
    '.db-repeater [data-db-repeater-item]::after { content: "Item template"; position: absolute; top: 0; right: 0;',
    '  transform: translateY(-100%); padding: 2px 6px; border-radius: 4px 4px 0 0;',
    '  background: rgba(79, 70, 229, 0.9); color: #fff; font: 600 10px/1.4 system-ui, sans-serif;',
    '  letter-spacing: 0.04em; pointer-events: none; }',
    '[data-db-repeater-preview] { cursor: pointer; }',
    '.db-repeater-empty { display: flex; flex-direction: column; align-items: center; gap: 12px; }',
    '.db-repeater-empty-text { margin: 0; }',
    '.db-repeater-empty-action { min-height: 44px; padding: 0 18px; border-radius: 8px; cursor: pointer;',
    '  border: 1px solid rgba(79, 70, 229, 0.6); background: #fff; color: #4f46e5;',
    '  font: 600 14px/1.2 system-ui, sans-serif; }',
    '[data-db-bound-preview] { text-decoration-line: underline; text-decoration-style: dotted;',
    '  text-decoration-color: rgba(79, 70, 229, 0.55); text-underline-offset: 3px; }',
    'img[data-db-bound-preview] { outline: 1px dotted rgba(79, 70, 229, 0.55); outline-offset: 1px; }',
    '[data-db-condition-state="hidden"] { position: relative; opacity: 0.4;',
    '  outline: 1px dashed rgba(217, 119, 6, 0.85); outline-offset: 2px; }',
    '[data-db-condition-state="hidden"]::after { content: "Hidden by condition"; position: absolute; top: 0;',
    '  left: 0; transform: translateY(-100%); padding: 2px 6px; border-radius: 4px 4px 0 0;',
    '  background: rgba(217, 119, 6, 0.95); color: #fff; font: 600 10px/1.4 system-ui, sans-serif;',
    '  letter-spacing: 0.04em; pointer-events: none; }',
  ].join('\n');

export default buildDataBindingEditorOnlyCss;
