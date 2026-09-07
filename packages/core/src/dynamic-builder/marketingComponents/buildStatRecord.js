import buildStatChildComponents from './buildStatChildComponents.js';

const buildStatRecord = (statPreset) => ({
  type: 'db-stat',
  attributes: {
    'data-db-stat-target': String(statPreset.target),
    'data-db-stat-prefix': statPreset.prefix || '',
    'data-db-stat-suffix': statPreset.suffix || '',
  },
  components: buildStatChildComponents(statPreset),
});

export default buildStatRecord;
