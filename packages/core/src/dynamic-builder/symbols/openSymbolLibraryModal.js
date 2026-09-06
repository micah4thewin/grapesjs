import attachSymbolLibraryHandlers from './attachSymbolLibraryHandlers.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildSymbolLibraryMarkup from './buildSymbolLibraryMarkup.js';
import createModalHostElement from '../support/createModalHostElement.js';

const openSymbolLibraryModal = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const ownerDocument = containerElement.ownerDocument;
  const modalHost = createModalHostElement(editor, 'Reusable components', { className: 'gjs-db-symbol-modal' });
  if (!modalHost) return;
  const renderLibrary = () => {
    const libraryElement = buildElementFromMarkup(ownerDocument, buildSymbolLibraryMarkup(editor));
    if (!libraryElement) return;
    attachSymbolLibraryHandlers(editor, libraryElement, {
      refresh: renderLibrary,
      reopen: () => openSymbolLibraryModal(editor),
    });
    modalHost.render(libraryElement);
  };
  renderLibrary();
};

export default openSymbolLibraryModal;
