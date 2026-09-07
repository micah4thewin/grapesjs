import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import appendStatTile from './appendStatTile.js';
import buildAddChildButtonTrait from './buildAddChildButtonTrait.js';
import buildStatRecord from './buildStatRecord.js';
import getStatPresetRecords from './getStatPresetRecords.js';
import runStatCountUpBehavior from './runStatCountUpBehavior.js';

const buildStatsTypeDefinition = () => ({
  type: 'db-stats',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'stats') && { type: 'db-stats' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Big numbers',
      draggable: getDropTargetSelectors().sectionBody,
      droppable: '[data-db-type=stat]',
      classes: ['db-stats'],
      attributes: { 'data-db-type': 'stats' },
      script: runStatCountUpBehavior,
      components: getStatPresetRecords().map((statPreset) => buildStatRecord(statPreset)),
      traits: [buildAddChildButtonTrait('Add a number', appendStatTile)],
    },
  },
});

export default buildStatsTypeDefinition;
