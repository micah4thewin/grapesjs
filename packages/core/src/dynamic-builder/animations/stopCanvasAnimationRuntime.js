const generatedAttributeNames = [
  'data-db-aos',
  'data-db-aos-duration',
  'data-db-aos-delay',
  'data-db-aos-easing',
  'data-db-aos-offset',
  'data-db-aos-once',
  'data-db-aos-generated',
];

const stopCanvasAnimationRuntime = (editor) => {
  const editorModel = editor.getModel();
  const pendingTimer = editorModel.get('dbAnimationPreviewTimer');
  if (pendingTimer) {
    clearTimeout(pendingTimer);
    editorModel.unset('dbAnimationPreviewTimer');
  }
  const canvasWindow = editor.Canvas && editor.Canvas.getWindow && editor.Canvas.getWindow();
  const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
  if (canvasWindow && Array.isArray(canvasWindow.dbAosObservers)) {
    canvasWindow.dbAosObservers.forEach((observer) => observer && observer.disconnect && observer.disconnect());
    canvasWindow.dbAosObservers = [];
  }
  if (!canvasDocument || !canvasDocument.documentElement) return;
  canvasDocument.documentElement.removeAttribute('data-db-aos-ready');
  canvasDocument.querySelectorAll('[data-db-aos-generated]').forEach((element) => {
    generatedAttributeNames.forEach((attributeName) => element.removeAttribute(attributeName));
  });
  canvasDocument.querySelectorAll('[data-db-aos-in], [data-db-aos]').forEach((element) => {
    element.removeAttribute('data-db-aos-in');
    element.style.removeProperty('--db-aos-duration');
    element.style.removeProperty('--db-aos-delay');
  });
};

export default stopCanvasAnimationRuntime;
