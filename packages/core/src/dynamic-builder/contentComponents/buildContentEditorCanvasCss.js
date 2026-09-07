const buildContentEditorCanvasCss = () => `
[data-db-placeholder] {
  color: var(--db-color-text-muted, #5b6472) !important;
  opacity: 0.85;
}
[data-db-placeholder]::after {
  content: 'Sample text';
  display: inline-block;
  vertical-align: middle;
  margin-left: 0.5em;
  padding: 0.1em 0.55em;
  border: 1px solid currentColor;
  border-radius: 999px;
  font: 600 0.62rem/1.6 system-ui, sans-serif;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.75;
  pointer-events: none;
}
.db-button:not([href]) {
  outline: 2px dashed rgba(217, 119, 6, 0.75);
  outline-offset: 2px;
}
.db-button:not([href])::after {
  content: 'Set a link';
  font-size: 0.7em;
  font-weight: 500;
  opacity: 0.85;
  white-space: nowrap;
}
.db-list > li:empty {
  min-height: 1.65em;
}
`;

export default buildContentEditorCanvasCss;
