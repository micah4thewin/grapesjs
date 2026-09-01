import applyStoredThemePreference from './applyStoredThemePreference.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildTopBarMarkup from './buildTopBarMarkup.js';
import updatePagesTriggerLabel from './updatePagesTriggerLabel.js';
import wireDeviceButtons from './wireDeviceButtons.js';
import wireDropdownMenus from './wireDropdownMenus.js';
import wireHistoryButtons from './wireHistoryButtons.js';
import wirePagesMenuActions from './wirePagesMenuActions.js';
import wireSaveStatus from './wireSaveStatus.js';
import wireThemeToggle from './wireThemeToggle.js';
import wireTopBarClickActions from './wireTopBarClickActions.js';
import wireViewToggleButtons from './wireViewToggleButtons.js';

const renderShellTopBar = (editor, shellOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  if (containerElement.querySelector('[data-db-panel="db-top"]')) return;
  applyStoredThemePreference(editor);
  const stripElement = buildElementFromMarkup(containerElement.ownerDocument, buildTopBarMarkup(editor, shellOptions));
  if (!stripElement) return;
  containerElement.classList.add('gjs-db-shell-host');
  containerElement.insertBefore(stripElement, containerElement.firstChild);
  wirePagesMenuActions(editor, stripElement);
  wireDropdownMenus(editor, stripElement);
  wireTopBarClickActions(editor, stripElement);
  wireDeviceButtons(editor, stripElement);
  wireViewToggleButtons(editor, stripElement);
  wireHistoryButtons(editor, stripElement);
  wireSaveStatus(editor, stripElement);
  wireThemeToggle(editor, stripElement);
  updatePagesTriggerLabel(editor, stripElement);
};

export default renderShellTopBar;
