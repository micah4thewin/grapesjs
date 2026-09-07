import buildMediaTraitCategory from './buildMediaTraitCategory.js';

const getImageTraitDefinitions = () => {
  const pictureCategory = buildMediaTraitCategory('image', 'Picture');
  const advancedCategory = buildMediaTraitCategory('advanced', 'Advanced', false);
  return [
    { type: 'db-asset', name: 'src', label: 'Picture', category: pictureCategory },
    {
      type: 'db-url',
      name: 'data-db-paste-link',
      label: 'Paste a picture link',
      placeholder: 'https://example.com/photo.jpg',
      category: pictureCategory,
    },
    {
      type: 'text',
      name: 'alt',
      label: 'Alt text',
      placeholder: 'Describe what the picture shows',
      category: pictureCategory,
    },
    {
      type: 'checkbox',
      name: 'data-db-decorative',
      label: 'Purely decorative (hide from screen readers)',
      valueTrue: 'true',
      valueFalse: 'false',
      default: 'false',
      category: pictureCategory,
    },
    {
      type: 'select',
      name: 'data-db-radius',
      label: 'Corner shape',
      default: 'none',
      category: pictureCategory,
      options: [
        { id: 'none', label: 'Square corners' },
        { id: 'md', label: 'Rounded' },
        { id: 'pill', label: 'Pill' },
        { id: 'circle', label: 'Circle' },
      ],
    },
    { type: 'number', name: 'width', label: 'Width (px)', min: 16, max: 3840, category: pictureCategory },
    {
      type: 'select',
      name: 'loading',
      label: 'Loading',
      default: 'lazy',
      category: advancedCategory,
      options: [
        { id: 'lazy', label: 'Load when scrolled into view' },
        { id: 'eager', label: 'Load immediately (top of page)' },
      ],
    },
    {
      type: 'select',
      name: 'fetchpriority',
      label: 'Download priority',
      default: 'auto',
      category: advancedCategory,
      options: [
        { id: 'auto', label: 'Automatic' },
        { id: 'high', label: 'High (main picture of the page)' },
        { id: 'low', label: 'Low' },
      ],
    },
  ];
};

export default getImageTraitDefinitions;
