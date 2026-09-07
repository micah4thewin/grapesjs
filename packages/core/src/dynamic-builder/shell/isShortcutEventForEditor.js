import isPrimaryShellInstance from './isPrimaryShellInstance.js';

const isShortcutEventForEditor = (editor, keyEvent) => {
  const containerElement = editor.getContainer && editor.getContainer();
  const ownerDocument = containerElement && containerElement.ownerDocument;
  if (!ownerDocument) return false;
  const targetElement = keyEvent && keyEvent.target;
  if (targetElement && targetElement.nodeType === 1 && containerElement.contains(targetElement)) return true;
  const isDocumentLevelTarget =
    !targetElement ||
    targetElement === ownerDocument ||
    targetElement === ownerDocument.body ||
    targetElement === ownerDocument.documentElement;
  return isDocumentLevelTarget && isPrimaryShellInstance(editor);
};

export default isShortcutEventForEditor;
