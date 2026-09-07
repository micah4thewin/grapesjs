import openMediaAssetPicker from './openMediaAssetPicker.js';

const openImageAssetPicker = (editor, imageComponent) => {
  if (!imageComponent || !imageComponent.addAttributes) return;
  openMediaAssetPicker(editor, (chosenAsset) => {
    const assetSource = chosenAsset && chosenAsset.getSrc ? chosenAsset.getSrc() : '';
    if (assetSource) imageComponent.addAttributes({ src: assetSource });
  });
};

export default openImageAssetPicker;
