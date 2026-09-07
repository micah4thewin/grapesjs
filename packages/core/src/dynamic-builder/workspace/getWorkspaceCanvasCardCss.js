const getWorkspaceCanvasCardCss = () => `
.gjs-db-stage-canvas {
  flex: 1 1 auto;
  min-height: 0;
  position: relative;
  padding: var(--gjs-db-gap-3);
}
.gjs-db-ws .gjs-cv-canvas {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: var(--gjs-db-r-3);
  box-shadow: 0 0 0 1px var(--gjs-db-line), var(--gjs-db-float);
  background-color: var(--gjs-db-canvas-ground);
  overflow: hidden;
}
.gjs-db-ws .gjs-cv-canvas-bg {
  background-color: var(--gjs-db-canvas-ground);
}
.gjs-db-ws .gjs-frame-wrapper .gjs-frame {
  background-color: #ffffff;
  box-shadow: none;
}
`;

export default getWorkspaceCanvasCardCss;
