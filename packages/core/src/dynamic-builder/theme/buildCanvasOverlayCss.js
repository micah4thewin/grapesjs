const buildCanvasOverlayCss = () => `
.gjs-resizer-h {
  border: 1px solid var(--gjs-db-focus);
  background-color: var(--gjs-db-page);
  border-radius: var(--gjs-db-r-pill);
}
.gjs-highlighter,
.gjs-highlighter-sel {
  outline-color: var(--gjs-db-focus);
  outline-width: 1px;
  outline-offset: -1px;
}
.gjs-highlighter-warning {
  outline-color: var(--gjs-db-warning);
  outline-width: 2px;
}
.gjs-placeholder {
  border-color: transparent;
}
.gjs-placeholder.horizontal {
  border-color: var(--gjs-db-focus) transparent;
}
.gjs-placeholder.vertical {
  border-color: transparent var(--gjs-db-focus);
}
.gjs-placeholder-int {
  background-color: var(--gjs-db-focus);
  box-shadow: none;
  border-radius: var(--gjs-db-r-pill);
}
.gjs-ghost {
  border: 1px dashed var(--gjs-db-faint);
  opacity: 0.5;
}
.gjs-guide-info__line {
  background-color: var(--gjs-db-focus);
}
.gjs-guide-info__content {
  background-color: var(--gjs-db-fg);
  color: var(--gjs-db-bg);
  border-radius: var(--gjs-db-r-1);
  font-family: var(--gjs-db-font-mono);
  font-size: var(--gjs-db-fs-1);
  padding: 2px 5px;
}
`;

export default buildCanvasOverlayCss;
