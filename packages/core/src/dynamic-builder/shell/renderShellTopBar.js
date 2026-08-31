import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildTopBarMarkup from './buildTopBarMarkup.js';
import wireDeviceButtons from './wireDeviceButtons.js';
import wireHistoryButtons from './wireHistoryButtons.js';
import wireSaveStatus from './wireSaveStatus.js';
import wireTopBarClickActions from './wireTopBarClickActions.js';
import wireViewToggleButtons from './wireViewToggleButtons.js';

const renderShellTopBar = (editor, shellOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  if (containerElement.querySelector('[data-db-panel="db-top"]')) return;
  const stripElement = buildElementFromMarkup(containerElement.ownerDocument, buildTopBarMarkup(editor, shellOptions));
  if (!stripElement) return;
  containerElement.classList.add('gjs-db-shell-host');
  containerElement.insertBefore(stripElement, containerElement.firstChild);
  wireTopBarClickActions(editor, stripElement);
  wireDeviceButtons(editor, stripElement);
  wireViewToggleButtons(editor, stripElement);
  wireHistoryButtons(editor, stripElement);
  wireSaveStatus(editor, stripElement);
};

export default renderShellTopBar;
