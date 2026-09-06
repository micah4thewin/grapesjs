import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import buildStatChildComponents from './buildStatChildComponents.js';
import runStatCountUpBehavior from './runStatCountUpBehavior.js';

const buildStatsTypeDefinition = () => ({
  type: 'db-stats',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'stats') && { type: 'db-stats' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Stats row',
      draggable: getDropTargetSelectors().sectionBody,
      droppable: '[data-db-type=stat]',
      classes: ['db-stats'],
      attributes: { 'data-db-type': 'stats' },
      script: runStatCountUpBehavior,
      components: [
        {
          type: 'db-stat',
          components: buildStatChildComponents({ target: 12000, suffix: '+', label: 'Teams onboarded' }),
        },
        {
          type: 'db-stat',
          components: buildStatChildComponents({ target: 98, suffix: '%', label: 'Customer satisfaction' }),
        },
        { type: 'db-stat', components: buildStatChildComponents({ target: 42, label: 'Countries served' }) },
        {
          type: 'db-stat',
          components: buildStatChildComponents({ target: 150, prefix: '$', suffix: 'M', label: 'Revenue processed' }),
        },
      ],
    },
  },
});

export default buildStatsTypeDefinition;
