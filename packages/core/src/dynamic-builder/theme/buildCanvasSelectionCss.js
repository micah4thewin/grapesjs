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
`;

export default buildCanvasSelectionCss;
