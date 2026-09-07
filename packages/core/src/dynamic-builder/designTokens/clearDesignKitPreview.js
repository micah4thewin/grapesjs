const clearDesignKitPreview = (editor) => {
  const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
  if (!canvasDocument) return;
  ['db-css-designkit-preview', 'db-css-designkit-preview-fonts'].forEach((styleId) => {
    const styleElement = canvasDocument.getElementById(styleId);
    if (styleElement) styleElement.remove();
  });
};

export default clearDesignKitPreview;
