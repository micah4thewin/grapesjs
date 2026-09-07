const restrictAssetUploadToImages = (editor) => {
  const applyAcceptAttribute = () => {
    const assetManager = editor.AssetManager;
    const containerElement = assetManager && assetManager.getContainer ? assetManager.getContainer() : null;
    if (!containerElement || !containerElement.querySelectorAll) return;
    containerElement
      .querySelectorAll('input[type=file]')
      .forEach((inputElement) => inputElement.setAttribute('accept', 'image/*'));
  };
  editor.on('asset:open', applyAcceptAttribute);
  editor.on('run:open-assets', () => setTimeout(applyAcceptAttribute, 0));
};

export default restrictAssetUploadToImages;
