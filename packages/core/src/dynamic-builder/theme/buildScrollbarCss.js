const buildScrollbarCss = () => `
.gjs-editor-cont,
.gjs-editor-cont * {
  scrollbar-width: thin;
  scrollbar-color: var(--gjs-db-line) transparent;
}
.gjs-editor-cont ::-webkit-scrollbar {
  width: 0.65rem;
  height: 0.65rem;
}
.gjs-editor-cont ::-webkit-scrollbar-track {
  background: transparent;
}
.gjs-editor-cont ::-webkit-scrollbar-thumb {
  background-color: var(--gjs-db-line);
  border: 3px solid transparent;
  border-radius: var(--gjs-db-r-pill);
  background-clip: content-box;
}
.gjs-editor-cont ::-webkit-scrollbar-thumb:hover {
  background-color: var(--gjs-db-faint);
  background-clip: content-box;
}
.gjs-editor-cont ::-webkit-scrollbar-corner {
  background: transparent;
}
`;

export default buildScrollbarCss;
