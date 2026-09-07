import buildMediaTraitCategory from './buildMediaTraitCategory.js';

const getGalleryTraitDefinitions = () => {
  const galleryCategory = buildMediaTraitCategory('gallery', 'Gallery');
  const buildChoice = (choiceId, choiceLabel) => ({ id: choiceId, label: choiceLabel });
  return [
    {
      type: 'button',
      name: 'db-add-gallery-images',
      label: false,
      text: 'Add pictures',
      full: true,
      command: 'db:add-gallery-images',
      category: galleryCategory,
    },
    {
      type: 'select',
      name: 'data-db-columns',
      label: 'Columns',
      default: '3',
      category: galleryCategory,
      options: [buildChoice('2', 'Two'), buildChoice('3', 'Three'), buildChoice('4', 'Four')],
    },
    {
      type: 'select',
      name: 'data-db-mobile-columns',
      label: 'Columns on phones',
      default: '2',
      category: galleryCategory,
      options: [buildChoice('1', 'One'), buildChoice('2', 'Two')],
    },
    {
      type: 'select',
      name: 'data-db-aspect',
      label: 'Picture shape',
      default: 'landscape',
      category: galleryCategory,
      options: [
        buildChoice('landscape', 'Landscape (4:3)'),
        buildChoice('square', 'Square'),
        buildChoice('portrait', 'Portrait (3:4)'),
        buildChoice('natural', 'Natural size'),
      ],
    },
    {
      type: 'select',
      name: 'data-db-gap',
      label: 'Space between',
      default: 'md',
      category: galleryCategory,
      options: [buildChoice('sm', 'Small'), buildChoice('md', 'Medium'), buildChoice('lg', 'Large')],
    },
    {
      type: 'checkbox',
      name: 'data-db-captions',
      label: 'Show captions',
      valueTrue: 'true',
      valueFalse: 'false',
      default: 'true',
      category: galleryCategory,
    },
    {
      type: 'checkbox',
      name: 'data-db-lightbox',
      label: 'Open pictures in a viewer',
      valueTrue: 'true',
      valueFalse: 'false',
      default: 'true',
      category: galleryCategory,
    },
  ];
};

export default getGalleryTraitDefinitions;
