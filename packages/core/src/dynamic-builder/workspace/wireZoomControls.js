import isEditorLive from '../support/isEditorLive.js';

const wireZoomControls = (editor, workspaceElement) => {
  const zoomLabelElement = workspaceElement.querySelector('[data-db-zoom-reset]');
  const readZoomLevel = () => {
    const zoomValue = editor.Canvas && editor.Canvas.getZoom ? Number(editor.Canvas.getZoom()) : 100;
    return Number.isFinite(zoomValue) && zoomValue > 0 ? zoomValue : 100;
  };
  const refreshZoomLabel = () => {
    if (!isEditorLive(editor) || !zoomLabelElement) return;
    zoomLabelElement.textContent = `${Math.round(readZoomLevel())}%`;
  };
  const applyZoomLevel = (requestedZoom) => {
    const clampedZoom = Math.min(200, Math.max(25, Math.round(requestedZoom)));
    if (editor.Canvas && editor.Canvas.setZoom) editor.Canvas.setZoom(clampedZoom);
    refreshZoomLabel();
  };
  workspaceElement.addEventListener('click', (clickEvent) => {
    const closest = clickEvent.target.closest && clickEvent.target.closest.bind(clickEvent.target);
    if (!closest) return;
    const stepButton = closest('[data-db-zoom-step]');
    if (stepButton && workspaceElement.contains(stepButton)) {
      applyZoomLevel(readZoomLevel() + Number(stepButton.getAttribute('data-db-zoom-step')));
      return;
    }
    const resetButton = closest('[data-db-zoom-reset]');
    if (resetButton && workspaceElement.contains(resetButton)) applyZoomLevel(100);
  });
  editor.on('canvas:zoom change:canvas:zoom', refreshZoomLabel);
  refreshZoomLabel();
};

export default wireZoomControls;
