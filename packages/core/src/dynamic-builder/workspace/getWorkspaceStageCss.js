import getWorkspaceCanvasCardCss from './getWorkspaceCanvasCardCss.js';

const getWorkspaceStageCss = () => `
.gjs-db-ws-stage {
  display: flex;
  flex-direction: column;
  min-height: 0;
  background-color: var(--gjs-db-bg);
}
.gjs-db-stage-bar {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--gjs-db-gap-2);
  padding: var(--gjs-db-gap-2) var(--gjs-db-gap-3) 0;
  min-height: 44px;
}
.gjs-db-stage-cluster {
  display: flex;
  align-items: center;
  gap: var(--gjs-db-gap-1);
  padding: 3px;
  border: 1px solid var(--gjs-db-line);
  border-radius: var(--gjs-db-r-pill);
  background-color: var(--gjs-db-panel);
}
.gjs-db-stage-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gjs-db-gap-1);
  min-height: var(--gjs-db-tap);
  min-width: var(--gjs-db-tap);
  padding: 0 var(--gjs-db-gap-2);
  border: none;
  border-radius: var(--gjs-db-r-pill);
  background-color: transparent;
  color: var(--gjs-db-faint);
  font-family: var(--gjs-db-font-ui);
  font-size: var(--gjs-db-fs-2);
  font-weight: var(--gjs-db-w-medium);
  cursor: pointer;
  transition:
    color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-db-stage-button:hover {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
}
.gjs-db-stage-button[aria-pressed='true'] {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-active);
}
.gjs-db-stage-button[data-db-stage-preview][aria-pressed='true'] {
  color: var(--gjs-db-accent-fg);
  background-color: var(--gjs-db-accent);
}
.gjs-db-stage-readout {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: calc(var(--gjs-db-tap) + 6px);
  min-width: 7rem;
  padding: 0 var(--gjs-db-gap-3);
  border: 1px solid var(--gjs-db-line);
  border-radius: var(--gjs-db-r-pill);
  background-color: var(--gjs-db-panel);
  color: var(--gjs-db-muted);
  font-family: var(--gjs-db-font-ui);
  font-size: var(--gjs-db-fs-2);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  cursor: pointer;
  transition:
    color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-db-stage-readout:hover {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
}
.gjs-db-stage-zoom {
  min-width: 3.2rem;
  text-align: center;
  font-variant-numeric: tabular-nums;
}
${getWorkspaceCanvasCardCss()}
`;

export default getWorkspaceStageCss;
