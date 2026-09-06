import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildPaletteMarkup from './buildPaletteMarkup.js';
import collectPaletteActions from './collectPaletteActions.js';
import getEditorInstanceSuffix from './getEditorInstanceSuffix.js';
import openThemedModal from '../support/openThemedModal.js';
import wirePaletteInteractions from './wirePaletteInteractions.js';

const openCommandPalette = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const instanceSuffix = getEditorInstanceSuffix(editor);
  const paletteElement = buildElementFromMarkup(containerElement.ownerDocument, buildPaletteMarkup(instanceSuffix));
  if (!paletteElement) return;
  wirePaletteInteractions(editor, paletteElement, collectPaletteActions(editor), instanceSuffix);
  openThemedModal(editor, 'Command palette', paletteElement, { className: 'gjs-db-palette-modal' });
  const inputElement = paletteElement.querySelector('[data-db-palette-input]');
  if (inputElement) setTimeout(() => inputElement.focus(), 0);
};

export default openCommandPalette;
