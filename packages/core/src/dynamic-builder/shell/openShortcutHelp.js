import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildShortcutHelpMarkup from './buildShortcutHelpMarkup.js';
import collectShortcutEntries from './collectShortcutEntries.js';
import openThemedModal from '../support/openThemedModal.js';

const openShortcutHelp = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const helpMarkup = buildShortcutHelpMarkup(collectShortcutEntries(editor));
  const helpElement = buildElementFromMarkup(containerElement.ownerDocument, helpMarkup);
  if (!helpElement) return;
  openThemedModal(editor, 'Keyboard shortcuts', helpElement, { className: 'gjs-db-shortcut-help-modal' });
};

export default openShortcutHelp;
