const buildCodeSurfaceCss = () => `
.gjs-editor-cont .CodeMirror,
.CodeMirror.cm-s-hopscotch {
  background-color: var(--gjs-db-sunken);
  border-radius: var(--gjs-db-r-2);
  box-shadow: var(--gjs-db-press-1);
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-mono);
  line-height: var(--gjs-db-lh);
}
.CodeMirror.cm-s-hopscotch .CodeMirror-gutters {
  background-color: var(--gjs-db-sunken);
  border-right: 1px solid var(--gjs-db-line);
}
.CodeMirror.cm-s-hopscotch .CodeMirror-linenumber {
  color: var(--gjs-db-faint);
}
.CodeMirror.cm-s-hopscotch .CodeMirror-cursor {
  border-left-color: var(--gjs-db-fg);
}
.CodeMirror.cm-s-hopscotch .CodeMirror-selected,
.CodeMirror.cm-s-hopscotch .CodeMirror-line::selection,
.CodeMirror.cm-s-hopscotch .CodeMirror-line > span::selection {
  background-color: var(--gjs-db-selection);
}
.CodeMirror.cm-s-hopscotch .CodeMirror-activeline-background {
  background-color: var(--gjs-db-hover);
}
.CodeMirror.cm-s-hopscotch .CodeMirror-matchingbracket {
  color: var(--gjs-db-fg);
  outline: 1px solid var(--gjs-db-line);
}
.gjs-cm-editor#gjs-cm-htmlmixed #gjs-cm-title,
.gjs-cm-editor#gjs-cm-css #gjs-cm-title {
  color: var(--gjs-db-faint);
}
.gjs-cm-editor#gjs-cm-htmlmixed {
  border-right: 1px solid var(--gjs-db-line);
}
`;

export default buildCodeSurfaceCss;
