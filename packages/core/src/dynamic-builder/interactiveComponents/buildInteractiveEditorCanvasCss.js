const buildInteractiveEditorCanvasCss = () => `
[data-db-editor-canvas] [data-db-live-hidden] {
  position: relative;
  opacity: 0.55;
  outline: 1px dashed rgba(120, 120, 120, 0.8);
  outline-offset: 2px;
}
[data-db-editor-canvas] [data-db-live-hidden]::after {
  content: "Hidden on the live site";
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 5;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(31, 31, 31, 0.85);
  color: #ffffff;
  font: 600 11px/1.5 system-ui, sans-serif;
  letter-spacing: 0.02em;
  pointer-events: none;
}
[data-db-editor-canvas] .db-social-links li:has(> .db-social-link:not([href])) {
  display: block;
}
[data-db-editor-canvas] .db-social-link:not([href]) {
  opacity: 0.5;
  outline: 1px dashed currentColor;
  outline-offset: 2px;
}
[data-db-editor-canvas] .db-announcement:not([data-db-announcement-ready]) {
  visibility: visible;
}
`;

export default buildInteractiveEditorCanvasCss;
