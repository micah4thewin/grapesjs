import getIconMarkup from '../support/getIconMarkup.js';

const buildCarouselControlChild = (controlKey, labelText, iconNames, extraAttributes = {}) => ({
  tagName: 'button',
  name: labelText,
  classes: ['db-carousel-control', 'db-carousel-' + controlKey],
  draggable: false,
  droppable: false,
  removable: false,
  copyable: false,
  attributes: {
    type: 'button',
    'aria-label': labelText,
    ['data-db-carousel-' + controlKey]: 'true',
    ...extraAttributes,
  },
  components: iconNames.map((iconName) => getIconMarkup(iconName, { size: 18 })).join(''),
});

export default buildCarouselControlChild;
