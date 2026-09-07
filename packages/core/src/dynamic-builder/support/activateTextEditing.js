const activateTextEditing = async (editor, component, caretPosition = 'end') => {
  const componentView = component && component.getView && component.getView();
  if (!componentView || typeof componentView.onActive !== 'function') return false;
  editor.select(component);
  await componentView.onActive();
  const element = component.getEl && component.getEl();
  const ownerDocument = element && element.ownerDocument;
  const selection = ownerDocument && ownerDocument.getSelection && ownerDocument.getSelection();
  if (!selection || !element) return true;
  const caretRange = ownerDocument.createRange();
  caretRange.selectNodeContents(element);
  caretRange.collapse(caretPosition === 'start');
  selection.removeAllRanges();
  selection.addRange(caretRange);
  return true;
};

export default activateTextEditing;
