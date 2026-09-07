import appendGalleryItemFromAsset from './appendGalleryItemFromAsset.js';
import openMediaAssetPicker from './openMediaAssetPicker.js';

const openGalleryImagePicker = (editor, galleryComponent) => {
  if (!galleryComponent) return;
  openMediaAssetPicker(
    editor,
    (chosenAsset) => appendGalleryItemFromAsset(galleryComponent, chosenAsset),
    'Click a picture to add it to the gallery. Double-click a picture to add it and finish.',
  );
};

export default openGalleryImagePicker;
