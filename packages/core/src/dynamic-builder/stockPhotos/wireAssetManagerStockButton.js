import getIconMarkup from '../support/getIconMarkup.js';
import isEditorLive from '../support/isEditorLive.js';

const buttonMarkerName = 'data-db-stock-open';

const insertStockPhotoButton = (editor) => {
  if (!isEditorLive(editor)) return false;
  const assetManager = editor.AssetManager;
  const containerElement = assetManager && assetManager.getContainer ? assetManager.getContainer() : null;
  if (!containerElement || !containerElement.querySelector) return false;
  if (containerElement.querySelector('[' + buttonMarkerName + ']')) return false;
  const headerElement = containerElement.querySelector('.gjs-am-assets-header') || containerElement;
  const buttonElement = containerElement.ownerDocument.createElement('button');
  buttonElement.type = 'button';
  buttonElement.className = 'gjs-db-button gjs-db-button-primary gjs-db-stock-open';
  buttonElement.setAttribute(buttonMarkerName, 'true');
  buttonElement.innerHTML = getIconMarkup('camera', { size: 15 }) + 'Find a free photo';
  buttonElement.addEventListener('click', () => editor.runCommand('db:open-stock-photos'));
  headerElement.insertBefore(buttonElement, headerElement.firstChild);
  return true;
};

const wireAssetManagerStockButton = (editor) => {
  const scheduleButtonInsert = () => setTimeout(() => insertStockPhotoButton(editor), 0);
  editor.on('asset:open', scheduleButtonInsert);
  editor.on('command:run:core:open-assets', scheduleButtonInsert);
};

export default wireAssetManagerStockButton;
