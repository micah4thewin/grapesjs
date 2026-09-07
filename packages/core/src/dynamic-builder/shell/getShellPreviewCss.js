const getShellPreviewCss = () => `
[data-db-panel='db-top'][data-db-preview] [data-db-preview-only] {
  display: flex;
  margin-left: auto;
}
[data-db-panel='db-top'][data-db-preview] .gjs-db-shell-status-group,
[data-db-panel='db-top'][data-db-preview] [data-db-menu-trigger='tools'],
[data-db-panel='db-top'][data-db-preview] [data-db-command='core:undo'],
[data-db-panel='db-top'][data-db-preview] [data-db-command='core:redo'],
[data-db-panel='db-top'][data-db-preview] [data-db-command='core:component-outline'],
[data-db-panel='db-top'][data-db-preview] [data-db-command='core:fullscreen'],
[data-db-panel='db-top'][data-db-preview] [data-db-command='core:preview'] {
  display: none;
}
[data-db-panel='db-top'][data-db-preview] .gjs-db-panel-group:empty {
  display: none;
}
.gjs-db-preview-badge {
  color: var(--gjs-db-accent);
}
.gjs-db-preview-exit-button {
  min-height: 2rem;
  white-space: nowrap;
}
.gjs-db-shell-host.gjs-db-previewing .gjs-off-prv {
  display: none;
}
.gjs-db-status-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0 0.5em;
  min-height: 2rem;
  border-radius: var(--gjs-db-r-pill);
  font-family: var(--gjs-db-font-ui);
}
.gjs-db-status-button:hover {
  background-color: var(--gjs-db-hover);
  color: var(--gjs-db-fg);
}
.gjs-db-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--gjs-db-faint);
  flex: 0 0 auto;
}
.gjs-db-status[data-db-state='saved'] .gjs-db-status-dot {
  background-color: var(--gjs-db-success);
}
.gjs-db-status[data-db-state='dirty'] .gjs-db-status-dot,
.gjs-db-status[data-db-state='saving'] .gjs-db-status-dot {
  background-color: var(--gjs-db-warning);
}
.gjs-db-status[data-db-state='error'] {
  color: var(--gjs-db-error);
}
.gjs-db-status[data-db-state='error'] .gjs-db-status-dot {
  background-color: var(--gjs-db-error);
}
`;

export default getShellPreviewCss;
