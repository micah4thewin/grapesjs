const getWorkspacePreviewCss = () => `
.gjs-db-ws[data-db-preview='1'] .gjs-db-ws-rail,
.gjs-db-ws[data-db-preview='1'] .gjs-db-ws-dock,
.gjs-db-ws[data-db-preview='1'] .gjs-db-ws-inspector,
.gjs-db-ws[data-db-preview='1'] .gjs-db-stage-bar {
  display: none;
}
.gjs-db-ws[data-db-preview='1'] {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  grid-template-areas: 'stage';
}
.gjs-db-ws[data-db-preview='1'] .gjs-db-stage-canvas {
  padding: 0;
}
.gjs-db-ws[data-db-preview='1'] .gjs-cv-canvas {
  border-radius: 0;
  box-shadow: none;
}
`;

export default getWorkspacePreviewCss;
