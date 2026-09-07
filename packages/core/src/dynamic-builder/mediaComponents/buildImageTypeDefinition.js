import buildImagePlaceholderDataUri from './buildImagePlaceholderDataUri.js';
import getImageTraitDefinitions from './getImageTraitDefinitions.js';
import openImageAssetPicker from './openImageAssetPicker.js';

const buildImageTypeDefinition = (editor) => ({
  type: 'db-image',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'image') && { type: 'db-image' },
  model: {
    defaults: {
      tagName: 'img',
      name: 'Picture',
      void: true,
      draggable: true,
      droppable: false,
      resizable: { tl: 0, tc: 0, tr: 0, cl: 0, cr: 1, bl: 0, bc: 1, br: 1 },
      classes: ['db-image'],
      attributes: {
        'data-db-type': 'image',
        src: buildImagePlaceholderDataUri(),
        alt: 'Placeholder image',
        loading: 'lazy',
        decoding: 'async',
        fetchpriority: 'auto',
        'data-db-decorative': 'false',
        'data-db-radius': 'none',
      },
      traits: getImageTraitDefinitions(),
    },
  },
  view: {
    events: { dblclick: 'openReplacePicker' },
    openReplacePicker: (domEvent) => {
      if (domEvent && domEvent.stopPropagation) domEvent.stopPropagation();
      const selectedComponent = editor.getSelected && editor.getSelected();
      if (!selectedComponent || !selectedComponent.is || !selectedComponent.is('db-image')) return;
      openImageAssetPicker(editor, selectedComponent);
    },
  },
});

export default buildImageTypeDefinition;
