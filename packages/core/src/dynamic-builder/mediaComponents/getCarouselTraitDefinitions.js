import buildMediaTraitCategory from './buildMediaTraitCategory.js';

const getCarouselTraitDefinitions = () => {
  const carouselCategory = buildMediaTraitCategory('carousel', 'Slides');
  const buildToggle = (attributeName, labelText, defaultValue) => ({
    type: 'checkbox',
    name: attributeName,
    label: labelText,
    valueTrue: 'true',
    valueFalse: 'false',
    default: defaultValue,
    category: carouselCategory,
  });
  return [
    {
      type: 'button',
      name: 'db-add-carousel-slides',
      label: false,
      text: 'Add slides',
      full: true,
      command: 'db:add-carousel-slides',
      category: carouselCategory,
    },
    { type: 'db-aria-label', name: 'aria-label', label: 'Name for screen readers', category: carouselCategory },
    buildToggle('data-db-autoplay', 'Change slides automatically', 'false'),
    {
      type: 'db-slider',
      name: 'data-db-interval',
      label: 'Time per slide (milliseconds)',
      min: 2000,
      max: 20000,
      step: 500,
      default: '5000',
      category: carouselCategory,
    },
    buildToggle('data-db-loop', 'Start again after the last slide', 'true'),
    buildToggle('data-db-dots', 'Show dots', 'true'),
  ];
};

export default getCarouselTraitDefinitions;
