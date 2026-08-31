const getShellLayoutCss = () => `
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
  z-index: 4;
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
`;

export default getShellLayoutCss;
