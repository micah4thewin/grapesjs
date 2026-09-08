const buildModalDialogCss = () => `
.gjs-mdl-container {
  background-color: var(--gjs-db-overlay);
  font-family: var(--gjs-db-font-ui);
}
.gjs-mdl-dialog {
  background-color: var(--gjs-db-panel);
  border: none;
  border-radius: var(--gjs-db-r-4);
  box-shadow: var(--gjs-db-lift-4);
  font-family: var(--gjs-db-font-ui);
  font-weight: var(--gjs-db-w-normal);
  color: var(--gjs-db-fg);
  text-shadow: none;
  overflow: hidden;
}
.gjs-mdl-header {
  background-color: transparent;
  border-bottom: 1px solid var(--gjs-db-line);
  padding: var(--gjs-db-gap-3) var(--gjs-db-gap-4);
}
.gjs-mdl-title {
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-display);
  font-size: 1rem;
  font-weight: var(--gjs-db-w-bold);
  letter-spacing: -0.01em;
}
.gjs-mdl-btn-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;
  top: 6px;
  right: 8px;
  color: var(--gjs-db-muted);
  cursor: pointer;
  border-radius: var(--gjs-db-r-2);
  transition:
    color var(--gjs-db-dur-2) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-2) var(--gjs-db-ease-soft);
}
.gjs-mdl-btn-close:hover {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
  box-shadow: var(--gjs-db-lift-1);
}
.gjs-mdl-content {
  background-color: transparent;
  border: none;
  padding: var(--gjs-db-gap-4);
  color: var(--gjs-db-fg);
}
.gjs-export-dl {
  color: var(--gjs-db-muted);
}
.gjs-cm-editor-c {
  color: var(--gjs-db-muted);
}
.gjs-cm-editor-c .CodeMirror {
  background-color: var(--gjs-db-sunken);
  box-shadow: var(--gjs-db-press-1);
  border-radius: var(--gjs-db-r-2);
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-mono);
}
.gjs-cm-editor {
  background-color: transparent;
}
.gjs-cm-editor #gjs-cm-title {
  background-color: transparent;
  color: var(--gjs-db-faint);
  font-family: var(--gjs-db-font-ui);
  font-size: var(--gjs-db-fs-2);
  letter-spacing: 0;
  padding: var(--gjs-db-gap-2) 0;
}
`;

export default buildModalDialogCss;
