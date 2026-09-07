const getWorkspaceResponsiveCss = () => `
.gjs-db-ws[data-db-size='md'] {
  --gjs-db-rail-w: 56px;
  --gjs-db-dock-w: 248px;
  --gjs-db-inspector-w: 268px;
}
.gjs-db-ws[data-db-size='sm'],
.gjs-db-ws[data-db-size='xs'] {
  grid-template-columns: var(--gjs-db-rail-w) minmax(0, 1fr);
  grid-template-areas: 'rail stage';
}
.gjs-db-ws[data-db-size='sm'] .gjs-db-ws-dock,
.gjs-db-ws[data-db-size='sm'] .gjs-db-ws-inspector,
.gjs-db-ws[data-db-size='xs'] .gjs-db-ws-dock,
.gjs-db-ws[data-db-size='xs'] .gjs-db-ws-inspector {
  position: absolute;
  z-index: 30;
  box-shadow: var(--gjs-db-float);
  visibility: visible;
}
.gjs-db-ws[data-db-size='sm'] .gjs-db-ws-dock {
  top: 0;
  bottom: 0;
  left: var(--gjs-db-rail-w);
  width: 288px;
  max-width: calc(100% - var(--gjs-db-rail-w));
}
.gjs-db-ws[data-db-size='sm'] .gjs-db-ws-inspector {
  top: 0;
  bottom: 0;
  right: 0;
  width: 300px;
  max-width: calc(100% - var(--gjs-db-rail-w));
}
.gjs-db-ws[data-db-size='xs'] {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr) auto;
  grid-template-areas: 'stage' 'rail';
}
.gjs-db-ws[data-db-size='xs'] .gjs-db-ws-rail {
  flex-direction: row;
  justify-content: space-between;
  gap: 0;
  padding: var(--gjs-db-gap-1) var(--gjs-db-gap-2);
  border-right: none;
  border-top: 1px solid var(--gjs-db-line);
  overflow-x: auto;
}
.gjs-db-ws[data-db-size='xs'] .gjs-db-rail-divider,
.gjs-db-ws[data-db-size='xs'] .gjs-db-rail-tip {
  display: none;
}
.gjs-db-ws[data-db-size='xs'] .gjs-db-ws-dock,
.gjs-db-ws[data-db-size='xs'] .gjs-db-ws-inspector {
  left: 0;
  right: 0;
  bottom: 0;
  top: auto;
  width: auto;
  max-width: none;
  height: 62%;
  border: none;
  border-top: 1px solid var(--gjs-db-line);
  border-radius: var(--gjs-db-r-4) var(--gjs-db-r-4) 0 0;
  transform: translateY(0);
  transition: transform var(--gjs-db-dur-3) var(--gjs-db-ease);
}
.gjs-db-ws[data-db-size='xs'] .gjs-db-ws-dock::before,
.gjs-db-ws[data-db-size='xs'] .gjs-db-ws-inspector::before {
  content: '';
  flex: 0 0 auto;
  width: 36px;
  height: 4px;
  margin: var(--gjs-db-gap-2) auto 0;
  border-radius: var(--gjs-db-r-pill);
  background-color: var(--gjs-db-line);
}
.gjs-db-ws[data-db-size='sm'][data-db-dock-open='0'] .gjs-db-ws-dock,
.gjs-db-ws[data-db-size='xs'][data-db-dock-open='0'] .gjs-db-ws-dock,
.gjs-db-ws[data-db-size='sm'][data-db-inspector-open='0'] .gjs-db-ws-inspector,
.gjs-db-ws[data-db-size='xs'][data-db-inspector-open='0'] .gjs-db-ws-inspector {
  display: none;
}
.gjs-db-ws[data-db-size='sm'] .gjs-db-stage-canvas,
.gjs-db-ws[data-db-size='xs'] .gjs-db-stage-canvas {
  padding: var(--gjs-db-gap-2);
}
.gjs-db-ws:not([data-db-size='sm']):not([data-db-size='xs']) [data-db-inspector-toggle],
.gjs-db-ws:not([data-db-size='sm']):not([data-db-size='xs']) [data-db-dock-close] {
  display: none;
}
.gjs-db-ws[data-db-size='xs'] .gjs-db-stage-readout,
.gjs-db-ws[data-db-size='xs'] [data-db-zoom-cluster],
.gjs-db-ws[data-db-size='sm'] .gjs-db-stage-readout,
.gjs-db-ws[data-db-size='xs'] [data-db-device-seg] .gjs-db-stage-button:nth-child(n + 4) {
  display: none;
}
.gjs-db-ws[data-db-size='xs'] .gjs-db-stage-bar {
  padding: var(--gjs-db-gap-2) var(--gjs-db-gap-2) 0;
  gap: var(--gjs-db-gap-1);
}
`;

export default getWorkspaceResponsiveCss;
