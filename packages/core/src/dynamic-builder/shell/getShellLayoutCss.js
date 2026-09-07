import getShellCompactCss from './getShellCompactCss.js';
import getShellMenuLayoutCss from './getShellMenuLayoutCss.js';
import getShellPreviewCss from './getShellPreviewCss.js';
import getShellWizardCss from './getShellWizardCss.js';

const getShellLayoutCss = () => `
.gjs-db-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
.gjs-db-shell-host {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.gjs-db-shell-host > .gjs-editor,
.gjs-db-shell-host > .gjs-editor-cont {
  flex: 1 1 auto;
  min-height: 0;
}
.gjs-db-shell-host .gjs-cv-canvas {
  top: 0;
  height: 100%;
}
[data-db-panel='db-top'] {
  flex: 0 0 auto;
  flex-wrap: nowrap;
  position: relative;
  min-height: 2.5rem;
  z-index: 6;
}
[data-db-panel='db-top'] .gjs-db-shell-brand {
  white-space: nowrap;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}
[data-db-panel='db-top'] .gjs-db-shell-status-group {
  margin-left: auto;
}
[data-db-panel='db-top'] .gjs-db-panel-button[disabled] {
  opacity: 0.4;
  pointer-events: none;
}
[data-db-panel='db-top'] .gjs-db-panel-group {
  flex: 0 0 auto;
}
[data-db-panel='db-top'] .gjs-db-pages-menu-host {
  flex: 0 1 auto;
  min-width: 0;
}
.gjs-db-menu-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  width: auto;
  max-width: 100%;
  padding: 0 0.6em;
}
.gjs-db-menu-trigger-label {
  font-size: 0.8rem;
  white-space: nowrap;
}
[data-db-pages-label] {
  max-width: 11rem;
  min-width: 2.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.gjs-db-download-button {
  white-space: nowrap;
  min-height: 2rem;
}
.gjs-db-device-menu-host {
  display: none;
}
[data-db-preview-only] {
  display: none;
}
${getShellMenuLayoutCss()}
${getShellCompactCss()}
${getShellPreviewCss()}
${getShellWizardCss()}
`;

export default getShellLayoutCss;
