import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildFontLibraryModalMarkup from './buildFontLibraryModalMarkup.js';
import injectFontPreviewStyles from './injectFontPreviewStyles.js';
import openThemedModal from '../support/openThemedModal.js';
import resolveCurrentFontChoices from './resolveCurrentFontChoices.js';
import wireFontLibraryEvents from './wireFontLibraryEvents.js';

const openFontLibraryModal = (editor, designTokenOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  injectFontPreviewStyles(editor);
  const currentChoices = resolveCurrentFontChoices(editor);
  const modalElement = buildElementFromMarkup(
    containerElement.ownerDocument,
    buildFontLibraryModalMarkup(currentChoices),
  );
  if (!modalElement) return;
  wireFontLibraryEvents(editor, designTokenOptions, modalElement, currentChoices);
  openThemedModal(editor, 'Fonts', modalElement, { className: 'gjs-db-font-library-modal' });
  setTimeout(() => {
    const searchElement = modalElement.querySelector('[data-db-font-search]');
    if (searchElement) searchElement.focus();
  }, 60);
};

export default openFontLibraryModal;
