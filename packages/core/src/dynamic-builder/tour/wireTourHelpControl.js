import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildTourHelpMarkup from './buildTourHelpMarkup.js';
import isEditorLive from '../support/isEditorLive.js';

const wireTourHelpControl = (editor) => {
  if (!isEditorLive(editor)) return null;
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return null;
  const existingButton = containerElement.querySelector('[data-db-tour-help]');
  if (existingButton) return existingButton;
  const helpButton = buildElementFromMarkup(containerElement.ownerDocument, buildTourHelpMarkup());
  if (!helpButton) return null;
  helpButton.addEventListener('click', () => editor.runCommand('db:open-tour'));
  containerElement.appendChild(helpButton);
  editor.on('destroy', () => helpButton.remove());
  return helpButton;
};

export default wireTourHelpControl;
