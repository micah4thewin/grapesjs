import openCarouselSlidePicker from './openCarouselSlidePicker.js';
import openGalleryImagePicker from './openGalleryImagePicker.js';
import openImageAssetPicker from './openImageAssetPicker.js';
import registerCommandSet from '../support/registerCommandSet.js';
import resolveSelectedMediaContainer from './resolveSelectedMediaContainer.js';
import showToastNotice from '../support/showToastNotice.js';

const registerMediaCommands = (editor) =>
  registerCommandSet(editor, {
    'db:add-gallery-images': (commandEditor) => {
      const galleryComponent = resolveSelectedMediaContainer(commandEditor, 'db-gallery');
      if (galleryComponent) openGalleryImagePicker(commandEditor, galleryComponent);
      else showToastNotice(commandEditor, 'Select a gallery first, then add pictures.', { kind: 'warning' });
    },
    'db:add-carousel-slides': (commandEditor) => {
      const carouselComponent = resolveSelectedMediaContainer(commandEditor, 'db-carousel');
      if (carouselComponent) openCarouselSlidePicker(commandEditor, carouselComponent);
      else showToastNotice(commandEditor, 'Select a carousel first, then add slides.', { kind: 'warning' });
    },
    'db:replace-image': (commandEditor) => {
      const imageComponent = resolveSelectedMediaContainer(commandEditor, 'db-image');
      if (imageComponent) openImageAssetPicker(commandEditor, imageComponent);
      else showToastNotice(commandEditor, 'Select a picture first, then replace it.', { kind: 'warning' });
    },
  });

export default registerMediaCommands;
