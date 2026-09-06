const applyEditedPhotoToComponent = (editor, imageComponent, dataUrl, sourceName) => {
  if (!imageComponent || !dataUrl) return;
  if (imageComponent.addAttributes) imageComponent.addAttributes({ src: dataUrl });
  if (imageComponent.set) imageComponent.set('src', dataUrl);
  const assetManager = editor.AssetManager;
  if (assetManager && assetManager.add) {
    assetManager.add({ type: 'image', src: dataUrl, name: `${sourceName || 'photo'} (edited)` });
  }
};

export default applyEditedPhotoToComponent;
