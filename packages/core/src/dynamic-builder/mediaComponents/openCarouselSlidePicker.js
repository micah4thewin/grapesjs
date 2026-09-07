import appendCarouselSlideFromAsset from './appendCarouselSlideFromAsset.js';
import openMediaAssetPicker from './openMediaAssetPicker.js';

const openCarouselSlidePicker = (editor, carouselComponent) => {
  if (!carouselComponent) return;
  openMediaAssetPicker(
    editor,
    (chosenAsset) => appendCarouselSlideFromAsset(carouselComponent, chosenAsset),
    'Click a picture to add it as a slide. Double-click a picture to add it and finish.',
  );
};

export default openCarouselSlidePicker;
