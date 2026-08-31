import buildImagePlaceholderDataUri from './buildImagePlaceholderDataUri.js';

const buildImageTypeDefinition = () => ({
  type: 'db-image',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'image') && { type: 'db-image' },
  model: {
    defaults: {
      tagName: 'img',
      name: 'Image',
      void: true,
      draggable: true,
      droppable: false,
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
      traits: [
        { type: 'db-asset', name: 'src', label: 'Image source' },
        { type: 'text', name: 'alt', label: 'Alt text', placeholder: 'Describe the image' },
        {
          type: 'checkbox',
          name: 'data-db-decorative',
          label: 'Decorative (empty alt)',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'false',
        },
        {
          type: 'select',
          name: 'loading',
          label: 'Loading',
          default: 'lazy',
          options: [
            { id: 'lazy', label: 'Lazy (below the fold)' },
            { id: 'eager', label: 'Eager (above the fold)' },
          ],
        },
        {
          type: 'select',
          name: 'fetchpriority',
          label: 'Fetch priority',
          default: 'auto',
          options: [
            { id: 'auto', label: 'Auto' },
            { id: 'high', label: 'High (LCP image)' },
            { id: 'low', label: 'Low' },
          ],
        },
        { type: 'number', name: 'width', label: 'Width (px)', min: 16, max: 3840 },
        { type: 'number', name: 'height', label: 'Height (px)', min: 16, max: 3840 },
        {
          type: 'select',
          name: 'data-db-radius',
          label: 'Corner radius',
          default: 'none',
          options: [
            { id: 'none', label: 'None' },
            { id: 'md', label: 'Rounded' },
            { id: 'pill', label: 'Pill' },
            { id: 'circle', label: 'Circle' },
          ],
        },
      ],
    },
  },
});

export default buildImageTypeDefinition;
