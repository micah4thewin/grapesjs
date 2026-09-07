const restoreCanvasElement = (element) => {
  const componentView = element && element.__gjsv;
  if (componentView && typeof componentView.render === 'function') {
    componentView.render();
    return;
  }
  ['tabindex', 'role', 'aria-hidden', 'hidden'].forEach((attributeName) => element.removeAttribute(attributeName));
  element.style.removeProperty('display');
};

const stopCanvasFlowRuntime = (editor) => {
  const canvasWindow = editor.Canvas && editor.Canvas.getWindow && editor.Canvas.getWindow();
  const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
  if (!canvasWindow || !canvasDocument) return;
  canvasWindow.dbFlowsPreview = false;
  canvasWindow.dbFlowsNotice = null;
  const registry = canvasWindow.dbFlows;
  canvasWindow.dbFlows = null;
  if (registry) {
    (registry.listeners || []).forEach((listenerRecord) =>
      listenerRecord.target.removeEventListener(listenerRecord.eventName, listenerRecord.handler),
    );
    (registry.timers || []).forEach((timerId) => {
      canvasWindow.clearTimeout(timerId);
      canvasWindow.clearInterval(timerId);
    });
    (registry.observers || []).forEach((observer) => observer && observer.disconnect && observer.disconnect());
  }
  canvasDocument.querySelectorAll('.db-dialog-overlay, .swal2-container').forEach((element) => element.remove());
  if (canvasDocument.body) canvasDocument.body.style.overflow = '';
  canvasDocument.querySelectorAll('[data-db-flows-ready]').forEach((element) => {
    delete element.dataset.dbFlowsReady;
  });
  ((registry && registry.touched) || []).forEach(restoreCanvasElement);
};

export default stopCanvasFlowRuntime;
