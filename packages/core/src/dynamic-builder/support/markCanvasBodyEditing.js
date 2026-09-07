const markCanvasBodyEditing = (editor) => {
  const editorModel = editor.getModel();
  if (editorModel.get('dbCanvasEditingFlag')) return;
  editorModel.set('dbCanvasEditingFlag', true);
  const setEditingFlag = (isEditing) => {
    const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
    if (!canvasDocument || !canvasDocument.body) return;
    if (isEditing) canvasDocument.body.setAttribute('data-db-editing', 'true');
    else canvasDocument.body.removeAttribute('data-db-editing');
  };
  const isPreviewing = () =>
    Boolean(editor.Commands && editor.Commands.isActive && editor.Commands.isActive('core:preview'));
  const refreshEditingFlag = () => setEditingFlag(!isPreviewing());
  refreshEditingFlag();
  editor.on('canvas:frame:load:body', refreshEditingFlag);
  editor.on('command:run:core:preview', () => setEditingFlag(false));
  editor.on('command:stop:core:preview', () => setEditingFlag(true));
};

export default markCanvasBodyEditing;
