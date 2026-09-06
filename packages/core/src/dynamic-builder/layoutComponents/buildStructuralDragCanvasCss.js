const buildStructuralDragCanvasCss = () => `
body.db-drag-structural [data-gjs-type='wrapper'] > [data-db-type] {
  outline: 1px dashed rgba(157, 74, 38, 0.55);
  outline-offset: -1px;
  transition: outline-color 160ms ease;
}
body.db-drag-structural [data-db-type='card'],
body.db-drag-structural [data-db-type='feature-card'],
body.db-drag-structural [data-db-type='column'],
body.db-drag-structural [data-db-type='testimonial'],
body.db-drag-structural [data-db-type='team-member'] {
  opacity: 0.55;
  transition: opacity 160ms ease;
}
body.db-drag-structural [data-gjs-type='wrapper']::after {
  content: 'Drop between sections';
  position: fixed;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2147483000;
  padding: 6px 14px;
  border-radius: 999px;
  background: #211e1b;
  color: #ede8e2;
  font: 600 12px/1.4 system-ui, sans-serif;
  letter-spacing: 0.02em;
  pointer-events: none;
}
`;

export default buildStructuralDragCanvasCss;
