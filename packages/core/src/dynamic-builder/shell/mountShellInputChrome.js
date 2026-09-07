import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildPaletteTriggerMarkup from './buildPaletteTriggerMarkup.js';
import getShellInputCss from './getShellInputCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import wireModalDialogAccessibility from '../support/wireModalDialogAccessibility.js';

const mountShellInputChrome = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  injectEditorStylesOnce(editor, 'db-css-shell-input', getShellInputCss());
  wireModalDialogAccessibility(editor);
  const stripElement = containerElement.querySelector('[data-db-panel="db-top"]');
  if (!stripElement || stripElement.querySelector('.gjs-db-palette-trigger')) return;
  const triggerGroup = buildElementFromMarkup(containerElement.ownerDocument, buildPaletteTriggerMarkup());
  if (!triggerGroup) return;
  const toolsTrigger = stripElement.querySelector('[data-db-menu-trigger="tools"]');
  const anchorElement = toolsTrigger ? toolsTrigger.closest('.gjs-db-panel-group') : null;
  if (anchorElement) stripElement.insertBefore(triggerGroup, anchorElement);
  else stripElement.appendChild(triggerGroup);
};

export default mountShellInputChrome;
