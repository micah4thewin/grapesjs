import buildAssetEditButtonElement from './buildAssetEditButtonElement.js';
import isEditableImageAsset from './isEditableImageAsset.js';
import isEditorLive from '../support/isEditorLive.js';
import openPhotoEditorForAsset from './openPhotoEditorForAsset.js';

const buttonMarker = '[data-db-asset-photo-edit]';

const insertAssetEditButtons = (editor) => {
  if (!isEditorLive(editor)) return 0;
  const assetManager = editor.AssetManager;
  const containerElement = assetManager && assetManager.getContainer ? assetManager.getContainer() : null;
  if (!containerElement || !containerElement.ownerDocument) return 0;
  let addedCount = 0;
  assetManager.getAll().forEach((assetModel) => {
    const assetView = assetModel.view;
    const cardElement = assetView && assetView.el;
    if (!cardElement || typeof cardElement.querySelector !== 'function') return;
    if (cardElement.querySelector(buttonMarker) || !isEditableImageAsset(assetModel)) return;
    const buttonElement = buildAssetEditButtonElement(containerElement.ownerDocument, () =>
      openPhotoEditorForAsset(editor, assetModel),
    );
    const metaElement = cardElement.querySelector('.gjs-am-meta') || cardElement;
    metaElement.appendChild(buttonElement);
    addedCount += 1;
  });
  return addedCount;
};

export default insertAssetEditButtons;
