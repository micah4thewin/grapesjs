import buildMapPlaceholderChildren from './buildMapPlaceholderChildren.js';
import runMapFacadeBehavior from './runMapFacadeBehavior.js';

const buildMapTypeDefinition = () => ({
  type: 'db-map',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'map') && { type: 'db-map' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Map',
      draggable: true,
      droppable: false,
      classes: ['db-map'],
      attributes: {
        'data-db-type': 'map',
        'data-db-lat': '51.5074',
        'data-db-lng': '-0.1278',
        'data-db-zoom': '13',
        'data-db-address': 'London, United Kingdom',
      },
      components: buildMapPlaceholderChildren(),
      script: runMapFacadeBehavior,
      traits: [
        { type: 'number', name: 'data-db-lat', label: 'Latitude', min: -90, max: 90, step: 0.0001 },
        { type: 'number', name: 'data-db-lng', label: 'Longitude', min: -180, max: 180, step: 0.0001 },
        { type: 'number', name: 'data-db-zoom', label: 'Zoom', min: 1, max: 19, step: 1, default: '13' },
        { type: 'text', name: 'data-db-address', label: 'Address label', placeholder: 'City, Country' },
      ],
    },
  },
});

export default buildMapTypeDefinition;
