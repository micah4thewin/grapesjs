const buildCanvasSelectionCss = () => `
body .gjs-selected {
  outline: 2px solid #9d4a26 !important;
  outline-offset: -2px;
}
body .gjs-selected-parent {
  outline: 2px solid rgba(157, 74, 38, 0.45) !important;
}
body .gjs-hovered {
  outline-color: rgba(157, 74, 38, 0.55) !important;
}
html[data-db-editor-theme='dark'] body .gjs-selected {
  outline-color: #e09060 !important;
}
html[data-db-editor-theme='dark'] body .gjs-selected-parent {
  outline-color: rgba(224, 144, 96, 0.5) !important;
}
html[data-db-editor-theme='dark'] body .gjs-hovered {
  outline-color: rgba(224, 144, 96, 0.6) !important;
}
`;

export default buildCanvasSelectionCss;
