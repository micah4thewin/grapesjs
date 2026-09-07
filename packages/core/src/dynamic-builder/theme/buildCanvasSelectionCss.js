const buildCanvasSelectionCss = () => `
body.gjs-dashed * {
  outline: 1px dashed rgba(91, 96, 103, 0.26) !important;
  outline-offset: -1px;
}
html[data-db-editor-theme='dark'] body.gjs-dashed * {
  outline-color: rgba(162, 169, 178, 0.24) !important;
}
body .gjs-selected {
  outline: 1px solid #1b1d20 !important;
  outline-offset: -1px;
}
body .gjs-selected-parent {
  outline: 1px dashed rgba(27, 29, 32, 0.38) !important;
  outline-offset: -1px;
}
body .gjs-hovered {
  outline: 1px solid rgba(27, 29, 32, 0.42) !important;
  outline-offset: -1px;
}
html[data-db-editor-theme='dark'] body .gjs-selected {
  outline-color: #e7eaee !important;
}
html[data-db-editor-theme='dark'] body .gjs-selected-parent {
  outline-color: rgba(231, 234, 238, 0.42) !important;
}
html[data-db-editor-theme='dark'] body .gjs-hovered {
  outline-color: rgba(231, 234, 238, 0.5) !important;
}
`;

export default buildCanvasSelectionCss;
