const handlePreflightClick = (editor, clickEvent) => {
  const targetElement = clickEvent.target;
  if (!targetElement || !targetElement.closest) return;
  if (targetElement.closest('[data-db-preflight-cancel]')) {
    editor.Modal && editor.Modal.close && editor.Modal.close();
    return;
  }
  if (!targetElement.closest('[data-db-preflight-continue]')) return;
  const editorModel = editor.getModel();
  const preflightOptions = editorModel.get('dbPreflightOptions') || {};
  const preflightResult = editorModel.get('dbPreflightResult') || { items: [], isReady: true };
  editor.Modal && editor.Modal.close && editor.Modal.close();
  if (typeof preflightOptions.onContinue === 'function') preflightOptions.onContinue(preflightResult);
};

export default handlePreflightClick;
