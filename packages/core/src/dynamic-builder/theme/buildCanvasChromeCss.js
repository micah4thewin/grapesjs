import buildCanvasOverlayCss from './buildCanvasOverlayCss.js';

const buildCanvasChromeCss = () => `
.gjs-cv-canvas {
  background-color: var(--gjs-db-canvas-ground);
}
.gjs-cv-canvas-bg {
  background-color: var(--gjs-db-canvas-ground);
}
.gjs-frame-wrapper .gjs-frame {
  box-shadow: var(--gjs-db-lift-2);
  background-color: #ffffff;
}
.gjs-frame-wrapper__name {
  color: var(--gjs-db-muted);
  font-family: var(--gjs-db-font-ui);
  font-size: var(--gjs-db-fs-2);
  font-weight: var(--gjs-db-w-medium);
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
  box-shadow: none;
  font-family: var(--gjs-db-font-ui);
  font-size: var(--gjs-db-fs-1);
  font-weight: var(--gjs-db-w-medium);
  letter-spacing: 0;
  line-height: 1.5;
  padding: 2px 7px;
}
.gjs-badge-warning {
  background-color: var(--gjs-db-warning);
  color: var(--gjs-db-bg);
}
.gjs-toolbar {
  display: flex;
  align-items: center;
  gap: 1px;
  padding: 2px;
  background-color: var(--gjs-db-panel);
  color: var(--gjs-db-fg);
  border: 1px solid var(--gjs-db-line);
  border-radius: var(--gjs-db-r-2);
  box-shadow: var(--gjs-db-float);
  overflow: hidden;
}
.gjs-toolbar-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 4px;
  border-radius: var(--gjs-db-r-1);
  color: var(--gjs-db-muted);
  transition:
    color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-toolbar-item:hover {
  opacity: 1;
  color: var(--gjs-db-accent);
  background-color: var(--gjs-db-accent-soft);
}
${buildCanvasOverlayCss()}
`;

export default buildCanvasChromeCss;
