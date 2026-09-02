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
.gjs-db-field-error-text:empty {
  display: none;
}
.gjs-db-field-error-text {
  color: var(--gjs-db-danger, #dc2626);
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
[data-db-panel='db-top'] {
  flex: 0 0 auto;
  flex-wrap: wrap;
  position: relative;
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
.gjs-db-menu-host {
  position: relative;
}
.gjs-db-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 240px;
  max-height: 70vh;
  overflow-y: auto;
  z-index: 40;
}
.gjs-db-menu-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  width: auto;
  padding: 0 0.6em;
}
.gjs-db-menu-trigger-label {
  font-size: 0.8rem;
  white-space: nowrap;
}
[data-db-pages-label] {
  max-width: 11rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.gjs-db-menu-row {
  display: flex;
  align-items: center;
  gap: 2px;
}
.gjs-db-menu-item-grow {
  flex: 1 1 auto;
  min-width: 0;
}
.gjs-db-menu-item-grow .gjs-db-menu-item-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gjs-db-download-button {
  white-space: nowrap;
}
`;

export default getShellLayoutCss;
