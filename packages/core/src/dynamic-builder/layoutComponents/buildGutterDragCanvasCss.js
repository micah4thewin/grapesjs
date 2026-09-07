const buildGutterDragCanvasCss = () => `
.db-columns {
  cursor: col-resize;
}
body.db-gutter-dragging,
body.db-gutter-dragging * {
  cursor: col-resize !important;
  user-select: none !important;
}
.db-gutter-tooltip {
  position: fixed;
  z-index: 2147483000;
  transform: translateX(-50%);
  padding: 4px 10px;
  border-radius: 999px;
  background: #211e1b;
  color: #ede8e2;
  font: 600 12px/1.4 system-ui, sans-serif;
  letter-spacing: 0.02em;
  pointer-events: none;
  white-space: nowrap;
}
`;

export default buildGutterDragCanvasCss;
