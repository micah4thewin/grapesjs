const getInteractiveEditorCss = () => `
.gjs-db-list-editor-actions {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.gjs-db-list-editor-actions .gjs-db-button {
  justify-content: center;
  width: 100%;
  min-height: 32px;
}
.gjs-db-list-editor .gjs-db-section-title {
  font-size: 0.78rem;
}
.gjs-db-list-editor .gjs-db-field-help {
  margin: 0;
}
.gjs-db-list-check {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 24px;
  font-size: 0.74rem;
  color: var(--gjs-db-muted);
  cursor: pointer;
}
.gjs-db-list-check input {
  margin: 0;
}
.gjs-db-menu-row-fields select.gjs-db-field-input {
  font-size: 0.74rem;
}
`;

export default getInteractiveEditorCss;
