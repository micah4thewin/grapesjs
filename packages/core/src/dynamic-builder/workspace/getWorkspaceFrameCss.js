const getWorkspaceFrameCss = () => `
.gjs-db-ws {
  --gjs-db-rail-w: 60px;
  --gjs-db-dock-w: 288px;
  --gjs-db-inspector-w: 300px;
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: var(--gjs-db-rail-w) var(--gjs-db-dock-w) minmax(0, 1fr) var(--gjs-db-inspector-w);
  grid-template-areas: 'rail dock stage inspector';
  background-color: var(--gjs-db-bg);
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
  font-size: var(--gjs-db-fs-3);
  line-height: var(--gjs-db-lh);
  overflow: hidden;
  z-index: 2;
}
.gjs-db-ws[data-db-dock-open='0'] {
  grid-template-columns: var(--gjs-db-rail-w) 0px minmax(0, 1fr) var(--gjs-db-inspector-w);
}
.gjs-db-ws[data-db-dock-open='0'] .gjs-db-ws-dock {
  visibility: hidden;
}
.gjs-db-ws-rail {
  grid-area: rail;
}
.gjs-db-ws-dock {
  grid-area: dock;
  min-width: 0;
}
.gjs-db-ws-stage {
  grid-area: stage;
  min-width: 0;
}
.gjs-db-ws-inspector {
  grid-area: inspector;
}
.gjs-db-ws-dock,
.gjs-db-ws-inspector {
  display: flex;
  flex-direction: column;
  min-height: 0;
  background-color: var(--gjs-db-panel);
  overflow: hidden;
}
.gjs-db-ws-dock {
  border-right: 1px solid var(--gjs-db-line);
}
.gjs-db-ws-inspector {
  border-left: 1px solid var(--gjs-db-line);
}
.gjs-db-ws-mounted .gjs-pn-panels,
.gjs-db-ws-mounted .gjs-db-device-readout,
.gjs-db-ws-mounted [data-db-panel='db-top'] .gjs-db-device-group,
.gjs-db-ws-mounted [data-db-panel='db-top'] .gjs-db-device-menu-host,
.gjs-db-ws-mounted [data-db-panel='db-top'] [data-db-command='core:preview'] {
  display: none !important;
}
.gjs-db-ws-mounted .gjs-editor {
  --gjs-canvas-top: 0px;
  --gjs-left-width: 0px;
}
`;

export default getWorkspaceFrameCss;
