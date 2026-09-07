import isSymbolInstanceEditing from './isSymbolInstanceEditing.js';

const wireSymbolCanvasDoubleClick = (editor) => {
  const attachDoubleClickHandler = () => {
    const bodyElement = editor.Canvas && editor.Canvas.getBody ? editor.Canvas.getBody() : null;
    if (!bodyElement || !bodyElement.dataset || bodyElement.dataset.dbSymbolDblclick === 'true') return;
    bodyElement.dataset.dbSymbolDblclick = 'true';
    bodyElement.addEventListener('dblclick', () => {
      const selectedComponent = editor.getSelected && editor.getSelected();
      if (!selectedComponent || typeof selectedComponent.get !== 'function') return;
      if (selectedComponent.get('type') !== 'db-symbol' || isSymbolInstanceEditing(selectedComponent)) return;
      editor.runCommand('db:edit-symbol');
    });
  };
  editor.on('canvas:frame:load:body', attachDoubleClickHandler);
  if (editor.onReady) editor.onReady(attachDoubleClickHandler);
};

export default wireSymbolCanvasDoubleClick;
