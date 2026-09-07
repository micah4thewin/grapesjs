import buildMapPlaceholderChildren from './buildMapPlaceholderChildren.js';
import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import getMapTraitDefinitions from './getMapTraitDefinitions.js';
import runMapFacadeBehavior from './runMapFacadeBehavior.js';

const buildMapTypeDefinition = () => ({
  type: 'db-map',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'map') && { type: 'db-map' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Map',
      draggable: getDropTargetSelectors().anyLayout,
      droppable: false,
      classes: ['db-map'],
      attributes: {
        'data-db-type': 'map',
        'data-db-lat': '51.5074',
        'data-db-lng': '-0.1278',
        'data-db-zoom': '13',
        'data-db-address': 'London, United Kingdom',
        'data-db-note': 'The map loads from OpenStreetMap only after you choose to view it.',
      },
      components: buildMapPlaceholderChildren(),
      script: runMapFacadeBehavior,
      traits: getMapTraitDefinitions(),
    },
  },
});

export default buildMapTypeDefinition;
