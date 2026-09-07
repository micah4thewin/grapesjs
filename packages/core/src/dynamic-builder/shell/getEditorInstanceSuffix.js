const getEditorInstanceSuffix = (editor) => {
  const editorModel = editor.getModel();
  const existingSuffix = editorModel.get('dbShellInstanceSuffix');
  if (typeof existingSuffix === 'string') return existingSuffix;
  const containerElement = editor.getContainer && editor.getContainer();
  const ownerDocument = containerElement && containerElement.ownerDocument;
  const markedContainers = ownerDocument ? Array.from(ownerDocument.querySelectorAll('[data-db-shell-instance]')) : [];
  const highestNumber = markedContainers
    .filter((markedElement) => markedElement !== containerElement)
    .reduce((highest, markedElement) => {
      const instanceNumber = Number(markedElement.getAttribute('data-db-shell-instance')) || 0;
      return instanceNumber > highest ? instanceNumber : highest;
    }, 0);
  const instanceNumber = highestNumber + 1;
  const nextSuffix = instanceNumber === 1 ? '' : '-' + instanceNumber;
  if (containerElement && containerElement.setAttribute) {
    containerElement.setAttribute('data-db-shell-instance', String(instanceNumber));
  }
  editorModel.set('dbShellInstanceSuffix', nextSuffix, { silent: true });
  return nextSuffix;
};

export default getEditorInstanceSuffix;
