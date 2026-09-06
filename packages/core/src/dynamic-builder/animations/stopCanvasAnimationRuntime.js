const stopCanvasAnimationRuntime = (editor) => {
  const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
  if (!canvasDocument || !canvasDocument.documentElement) return;
  canvasDocument.documentElement.removeAttribute('data-db-aos-ready');
  canvasDocument.querySelectorAll('[data-db-aos-in]').forEach((element) => {
    element.removeAttribute('data-db-aos-in');
    element.style.removeProperty('--db-aos-duration');
    element.style.removeProperty('--db-aos-delay');
  });
};

export default stopCanvasAnimationRuntime;
