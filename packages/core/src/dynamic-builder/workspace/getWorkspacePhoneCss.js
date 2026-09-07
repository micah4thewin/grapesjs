const getWorkspacePhoneCss = () => `
.gjs-db-ws[data-db-size='xs'] {
  --gjs-db-rail-h: 56px;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr) var(--gjs-db-rail-h);
  grid-template-areas: 'stage' 'rail';
}
.gjs-db-ws[data-db-size='xs'] .gjs-db-ws-rail {
  flex-direction: row;
  justify-content: space-around;
  gap: 0;
  padding: var(--gjs-db-gap-1) var(--gjs-db-gap-2);
  border: none;
  background-color: var(--gjs-db-panel);
  box-shadow: var(--gjs-db-seam);
  overflow-x: auto;
  z-index: 40;
}
.gjs-db-ws[data-db-size='xs'] .gjs-db-rail-divider,
.gjs-db-ws[data-db-size='xs'] .gjs-db-rail-tip {
  display: none;
}
.gjs-db-ws[data-db-size='xs'] .gjs-db-ws-dock,
.gjs-db-ws[data-db-size='xs'] .gjs-db-ws-inspector {
  position: absolute;
  z-index: 30;
  left: 0;
  right: 0;
  bottom: var(--gjs-db-rail-h);
  top: auto;
  width: auto;
  max-width: none;
  height: 58%;
  margin: 0;
  visibility: visible;
  border: none;
  border-radius: var(--gjs-db-r-4) var(--gjs-db-r-4) 0 0;
  box-shadow: var(--gjs-db-lift-4);
  animation: gjs-db-sheet-up var(--gjs-db-dur-3) var(--gjs-db-ease);
}
@keyframes gjs-db-sheet-up {
  from {
    transform: translateY(16px);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
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
.gjs-db-ws[data-db-size='xs'][data-db-dock-open='0'] .gjs-db-ws-dock,
.gjs-db-ws[data-db-size='xs'][data-db-inspector-open='0'] .gjs-db-ws-inspector {
  display: none;
}
.gjs-db-ws[data-db-size='sm'] .gjs-db-stage-canvas,
.gjs-db-ws[data-db-size='xs'] .gjs-db-stage-canvas {
  padding: var(--gjs-db-gap-2);
}
.gjs-db-ws:not([data-db-size='xs']) [data-db-inspector-toggle],
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
.gjs-db-ws[data-db-size='xs'] ~ .gjs-db-toast-host,
.gjs-db-ws-mounted .gjs-db-ws[data-db-size='xs'] .gjs-db-toast-host,
.gjs-db-ws-mounted:has(.gjs-db-ws[data-db-size='xs']) .gjs-db-toast-host {
  bottom: 76px;
}
`;

export default getWorkspacePhoneCss;
