const buildCodeTokenCss = () => `
.CodeMirror.cm-s-hopscotch span.cm-keyword,
.CodeMirror.cm-s-hopscotch span.cm-atom {
  color: var(--gjs-db-syn-keyword);
  font-weight: var(--gjs-db-w-bold);
}
.CodeMirror.cm-s-hopscotch span.cm-tag {
  color: var(--gjs-db-syn-def);
  font-weight: var(--gjs-db-w-bold);
}
.CodeMirror.cm-s-hopscotch span.cm-def,
.CodeMirror.cm-s-hopscotch span.cm-variable-2,
.CodeMirror.cm-s-hopscotch span.cm-variable-3,
.CodeMirror.cm-s-hopscotch span.cm-builtin,
.CodeMirror.cm-s-hopscotch span.cm-link {
  color: var(--gjs-db-syn-def);
}
.CodeMirror.cm-s-hopscotch span.cm-attribute,
.CodeMirror.cm-s-hopscotch span.cm-property,
.CodeMirror.cm-s-hopscotch span.cm-qualifier {
  color: var(--gjs-db-syn-type);
  font-style: italic;
}
.CodeMirror.cm-s-hopscotch span.cm-string,
.CodeMirror.cm-s-hopscotch span.cm-string-2 {
  color: var(--gjs-db-syn-string);
  font-style: italic;
}
.CodeMirror.cm-s-hopscotch span.cm-number {
  color: var(--gjs-db-syn-literal);
}
.CodeMirror.cm-s-hopscotch span.cm-comment {
  color: var(--gjs-db-syn-comment);
  font-style: italic;
}
.CodeMirror.cm-s-hopscotch span.cm-meta {
  color: var(--gjs-db-syn-meta);
}
.CodeMirror.cm-s-hopscotch span.cm-header {
  color: var(--gjs-db-syn-heading);
  font-weight: var(--gjs-db-w-bold);
}
.CodeMirror.cm-s-hopscotch span.cm-variable {
  color: var(--gjs-db-fg);
}
.CodeMirror.cm-s-hopscotch span.cm-operator {
  color: var(--gjs-db-muted);
}
.CodeMirror.cm-s-hopscotch span.cm-bracket,
.CodeMirror.cm-s-hopscotch span.cm-tag.cm-bracket,
.CodeMirror.cm-s-hopscotch span.cm-punctuation {
  color: var(--gjs-db-faint);
  font-weight: var(--gjs-db-w-normal);
}
.CodeMirror.cm-s-hopscotch span.cm-error {
  color: var(--gjs-db-syn-removed);
  text-decoration: underline wavy var(--gjs-db-syn-removed);
}
`;

export default buildCodeTokenCss;
