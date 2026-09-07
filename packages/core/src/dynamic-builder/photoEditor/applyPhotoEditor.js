import getAssetEditButtonCss from './getAssetEditButtonCss.js';
import getPhotoEditorEditorCss from './getPhotoEditorEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import isEditorLive from '../support/isEditorLive.js';
import openPhotoEditorForAsset from './openPhotoEditorForAsset.js';
import openPhotoEditorModal from './openPhotoEditorModal.js';
import registerCommandSet from '../support/registerCommandSet.js';
import showToastNotice from '../support/showToastNotice.js';
import wireAssetManagerEditButtons from './wireAssetManagerEditButtons.js';
import wireImageToolbarEditButton from './wireImageToolbarEditButton.js';
import watchUploadedImageAssets from './watchUploadedImageAssets.js';

const editableTypes = ['db-image', 'image'];

const applyPhotoEditor = (editor) => {
  registerCommandSet(editor, {
    'db:open-photo-editor': (commandEditor) => {
      const selectedComponent = commandEditor.getSelected && commandEditor.getSelected();
      const selectedType =
        selectedComponent && selectedComponent.get ? String(selectedComponent.get('type') || '') : '';
      if (editableTypes.indexOf(selectedType) < 0) {
        showToastNotice(commandEditor, 'Select an image on the page, then open the photo editor.', { kind: 'warning' });
        return;
      }
      openPhotoEditorModal(commandEditor, selectedComponent);
    },
    'db:edit-asset-photo': (commandEditor, senderRecord, commandOptions) => {
      const sourceValue = String((commandOptions && commandOptions.src) || '');
      const assetModel = sourceValue && commandEditor.AssetManager.get(sourceValue);
      if (assetModel) openPhotoEditorForAsset(commandEditor, assetModel);
      else commandEditor.runCommand('core:open-assets');
    },
  });
  wireImageToolbarEditButton(editor);
  wireAssetManagerEditButtons(editor);
  watchUploadedImageAssets(editor);
  const injectStyles = () => {
    if (!isEditorLive(editor) || !editor.getContainer || !editor.getContainer()) return;
    injectEditorStylesOnce(editor, 'db-css-photo-editor', getPhotoEditorEditorCss() + getAssetEditButtonCss());
  };
  injectStyles();
  if (editor.onReady) editor.onReady(() => injectStyles());
};

export default applyPhotoEditor;
