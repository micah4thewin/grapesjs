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
  color: var(--gjs-db-fg);
  overflow: hidden;
}
.gjs-mdl-header {
  background-color: transparent;
  border-bottom: 1px solid var(--gjs-db-line);
  padding: var(--gjs-db-gap-3) var(--gjs-db-gap-4);
}
.gjs-mdl-title {
  color: var(--gjs-db-fg);
  font-size: 0.92rem;
  font-weight: var(--gjs-db-w-bold);
}
.gjs-mdl-btn-close {
  color: var(--gjs-db-muted);
  cursor: pointer;
  border-radius: var(--gjs-db-r-2);
  transition:
    color var(--gjs-db-dur-2) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-2) var(--gjs-db-ease-soft);
}
.gjs-mdl-btn-close:hover {
  color: var(--gjs-db-fg);
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
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: var(--gjs-db-gap-2) 0;
}
`;

export default buildModalDialogCss;
