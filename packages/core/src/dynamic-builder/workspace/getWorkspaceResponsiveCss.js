import getWorkspacePhoneCss from './getWorkspacePhoneCss.js';

const getWorkspaceResponsiveCss = () => `
.gjs-db-ws[data-db-size='md'] {
  --gjs-db-rail-w: 56px;
  --gjs-db-dock-w: 252px;
  --gjs-db-inspector-w: 272px;
}
.gjs-db-ws[data-db-size='sm'] {
  --gjs-db-rail-w: 56px;
  --gjs-db-inspector-w: 280px;
  grid-template-columns: var(--gjs-db-rail-w) minmax(0, 1fr) var(--gjs-db-inspector-w);
  grid-template-areas: 'rail stage inspector';
}
.gjs-db-ws[data-db-size='sm'][data-db-inspector-open='0'] {
  grid-template-columns: var(--gjs-db-rail-w) minmax(0, 1fr) 0px;
}
.gjs-db-ws[data-db-size='sm'][data-db-inspector-open='0'] .gjs-db-ws-inspector {
  display: none;
}
.gjs-db-ws[data-db-size='sm'] .gjs-db-ws-dock {
  position: absolute;
  z-index: 30;
  top: 0;
  bottom: 0;
  left: var(--gjs-db-rail-w);
  width: 288px;
  max-width: calc(100% - var(--gjs-db-rail-w));
  margin: var(--gjs-db-gap-2) 0;
  visibility: visible;
  box-shadow: var(--gjs-db-lift-3);
}
.gjs-db-ws[data-db-size='sm'][data-db-dock-open='0'] .gjs-db-ws-dock {
  display: none;
}
${getWorkspacePhoneCss()}
`;

export default getWorkspaceResponsiveCss;
