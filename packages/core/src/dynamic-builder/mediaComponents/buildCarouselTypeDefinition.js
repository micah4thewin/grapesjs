import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import buildCarouselDefaultChildren from './buildCarouselDefaultChildren.js';
import getCarouselTraitDefinitions from './getCarouselTraitDefinitions.js';
import runCarouselBehavior from './runCarouselBehavior.js';

const buildCarouselTypeDefinition = () => ({
  type: 'db-carousel',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'carousel') && { type: 'db-carousel' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Carousel',
      draggable: getDropTargetSelectors().anyLayout,
      droppable: false,
      classes: ['db-carousel'],
      attributes: {
        'data-db-type': 'carousel',
        role: 'region',
        'aria-roledescription': 'carousel',
        'aria-label': 'Featured media carousel',
        'data-db-autoplay': 'false',
        'data-db-interval': '5000',
        'data-db-loop': 'true',
        'data-db-dots': 'true',
      },
      components: buildCarouselDefaultChildren(),
      script: runCarouselBehavior,
      traits: getCarouselTraitDefinitions(),
    },
  },
});

export default buildCarouselTypeDefinition;
