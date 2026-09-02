const buildCanvasChromeCss = () => `
.gjs-cv-canvas {
  background-color: var(--gjs-db-bg);
}
.gjs-cv-canvas-bg {
  background-color: var(--gjs-db-bg);
}
.gjs-frame-wrapper .gjs-frame {
  box-shadow: var(--gjs-db-lift-3);
  background-color: #ffffff;
}
.gjs-frame-wrapper__name {
  color: var(--gjs-db-muted);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.72rem;
  font-weight: var(--gjs-db-w-bold);
}
.gjs-frame-wrapper__top {
  background-color: transparent;
  color: var(--gjs-db-muted);
}
.gjs-frame-wrapper__icon {
  color: var(--gjs-db-faint);
}
.gjs-badge,
.gjs-com-badge {
  background-color: var(--gjs-db-accent);
  color: var(--gjs-db-accent-fg);
  border-radius: var(--gjs-db-r-1);
  box-shadow: var(--gjs-db-lift-1);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.66rem;
  font-weight: var(--gjs-db-w-bold);
  letter-spacing: 0.04em;
  padding: 2px 7px;
}
.gjs-badge-warning {
  background-color: var(--gjs-db-warning);
  color: var(--gjs-db-bg);
}
.gjs-toolbar {
  background-color: var(--gjs-db-accent);
  color: var(--gjs-db-accent-fg);
  border-radius: var(--gjs-db-r-2);
  box-shadow: var(--gjs-db-lift-2);
  overflow: hidden;
}
.gjs-toolbar-item {
  transition: opacity var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-toolbar-item:hover {
  opacity: 0.72;
}
.gjs-resizer-h {
  border: 2px solid var(--gjs-db-focus);
  background-color: var(--gjs-db-page);
  border-radius: var(--gjs-db-r-pill);
}
.gjs-highlighter,
.gjs-highlighter-sel {
  outline-color: var(--gjs-db-focus);
}
.gjs-highlighter-warning {
  outline-color: var(--gjs-db-warning);
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
  box-shadow: 0 0 4px var(--gjs-db-shade);
  border-radius: var(--gjs-db-r-pill);
}
.gjs-ghost {
  border: 2px dashed var(--gjs-db-faint);
  opacity: 0.55;
}
.gjs-guide-info__line {
  background-color: var(--gjs-db-focus);
}
.gjs-guide-info__content {
  background-color: var(--gjs-db-fg);
  color: var(--gjs-db-bg);
  border-radius: var(--gjs-db-r-1);
  font-family: var(--gjs-db-font-mono);
  font-size: 0.66rem;
  padding: 2px 5px;
}
`;

export default buildCanvasChromeCss;
