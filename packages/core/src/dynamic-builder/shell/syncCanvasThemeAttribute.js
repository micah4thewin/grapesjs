import resolveEffectiveThemeMode from './resolveEffectiveThemeMode.js';

const syncCanvasThemeAttribute = (editor) => {
  const applyThemeAttribute = () => {
    const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
    if (!canvasDocument || !canvasDocument.documentElement) return;
    canvasDocument.documentElement.setAttribute('data-db-editor-theme', resolveEffectiveThemeMode(editor));
  };
  const applyWithDeferredRetries = () => {
    applyThemeAttribute();
    setTimeout(applyThemeAttribute, 60);
    setTimeout(applyThemeAttribute, 300);
  };
  editor.on('db:theme:update', applyThemeAttribute);
  editor.on('canvas:frame:load:body', applyThemeAttribute);
  editor.on('page:select', applyWithDeferredRetries);
  applyWithDeferredRetries();
};

export default syncCanvasThemeAttribute;
