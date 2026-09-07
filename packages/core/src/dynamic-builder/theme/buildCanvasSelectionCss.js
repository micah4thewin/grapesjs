const buildCanvasSelectionCss = () => `
body.gjs-dashed * {
  outline: 1px dashed rgba(140, 132, 122, 0.3) !important;
  outline-offset: -1px;
}
html[data-db-editor-theme='dark'] body.gjs-dashed * {
  outline-color: rgba(214, 206, 196, 0.22) !important;
}
body .gjs-selected {
  outline: 1px solid #9d4a26 !important;
  outline-offset: -1px;
}
body .gjs-selected-parent {
  outline: 1px dashed rgba(157, 74, 38, 0.38) !important;
  outline-offset: -1px;
}
body .gjs-hovered {
  outline: 1px solid rgba(157, 74, 38, 0.42) !important;
  outline-offset: -1px;
}
html[data-db-editor-theme='dark'] body .gjs-selected {
  outline-color: #e09060 !important;
}
html[data-db-editor-theme='dark'] body .gjs-selected-parent {
  outline-color: rgba(224, 144, 96, 0.42) !important;
}
html[data-db-editor-theme='dark'] body .gjs-hovered {
  outline-color: rgba(224, 144, 96, 0.5) !important;
}
`;

export default buildCanvasSelectionCss;
