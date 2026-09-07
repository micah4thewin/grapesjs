const clearTokenUsageHighlight = (editor) => {
  const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
  if (!canvasDocument || !canvasDocument.body) return;
  canvasDocument.body
    .querySelectorAll('[data-db-token-hit]')
    .forEach((element) => element.removeAttribute('data-db-token-hit'));
};

export default clearTokenUsageHighlight;
