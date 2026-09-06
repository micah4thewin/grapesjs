import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import buildCarouselDefaultChildren from './buildCarouselDefaultChildren.js';
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
      traits: [
        { type: 'db-aria-label', name: 'aria-label', label: 'Carousel label' },
        {
          type: 'checkbox',
          name: 'data-db-autoplay',
          label: 'Autoplay',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'false',
        },
        {
          type: 'number',
          name: 'data-db-interval',
          label: 'Autoplay interval (ms)',
          min: 2000,
          max: 60000,
          step: 500,
          default: '5000',
        },
        {
          type: 'checkbox',
          name: 'data-db-loop',
          label: 'Loop slides',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'true',
        },
        {
          type: 'checkbox',
          name: 'data-db-dots',
          label: 'Show dots',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'true',
        },
      ],
    },
  },
});

export default buildCarouselTypeDefinition;
