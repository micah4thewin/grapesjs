import getIconMarkup from '../support/getIconMarkup.js';

const buildMapPlaceholderChildren = () => [
  {
    tagName: 'div',
    classes: ['db-map-placeholder'],
    draggable: false,
    droppable: false,
    components: [
      { tagName: 'span', classes: ['db-map-pin'], components: getIconMarkup('map', { size: 28 }) },
      {
        tagName: 'p',
        type: 'text',
        classes: ['db-map-address'],
        attributes: { 'data-db-map-address': 'true' },
        components: 'London, United Kingdom',
      },
      {
        tagName: 'button',
        classes: ['db-facade-button'],
        draggable: false,
        droppable: false,
        attributes: { type: 'button', 'data-db-map-load': 'true' },
        components: 'Load interactive map',
      },
      {
        tagName: 'p',
        type: 'text',
        classes: ['db-facade-note'],
        components: 'The map loads from OpenStreetMap only after you choose to view it.',
      },
    ],
  },
];

export default buildMapPlaceholderChildren;
