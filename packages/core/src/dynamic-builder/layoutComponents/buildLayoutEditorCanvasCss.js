const buildLayoutEditorCanvasCss = () => `
.db-container:empty,
.db-column:empty {
  display: grid;
  place-items: center;
  min-height: 4.5rem;
  border: 1px dashed var(--db-color-line, #cbd5e1);
  border-radius: var(--db-radius-md, 0.5rem);
  color: var(--db-color-text-muted, #5b6472);
}
.db-container:empty::before,
.db-column:empty::before {
  content: 'Drop blocks here';
  font: 500 0.875rem/1.4 system-ui, sans-serif;
  letter-spacing: 0.01em;
  pointer-events: none;
}
.db-columns:empty::before {
  content: 'Choose a layout in the settings panel to add columns';
}
`;

export default buildLayoutEditorCanvasCss;
