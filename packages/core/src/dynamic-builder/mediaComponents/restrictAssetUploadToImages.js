import isEditorLive from '../support/isEditorLive.js';

const restrictAssetUploadToImages = (editor) => {
  const applyAcceptAttribute = () => {
    const assetManager = editor.AssetManager;
    const containerElement = assetManager && assetManager.getContainer ? assetManager.getContainer() : null;
    if (!containerElement || !containerElement.querySelectorAll) return;
    containerElement
      .querySelectorAll('input[type=file]')
      .forEach((inputElement) => inputElement.setAttribute('accept', 'image/*'));
  };
  const applyAfterRender = () => {
    if (!isEditorLive(editor)) return;
    setTimeout(() => isEditorLive(editor) && applyAcceptAttribute(), 0);
  };
  editor.on('asset:open', applyAcceptAttribute);
  editor.on('command:run:core:open-assets', applyAfterRender);
};

export default restrictAssetUploadToImages;
