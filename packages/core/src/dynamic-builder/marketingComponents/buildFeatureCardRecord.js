import buildFeatureCardChildComponents from './buildFeatureCardChildComponents.js';

const buildFeatureCardRecord = (featurePreset) => ({
  type: 'db-feature-card',
  components: buildFeatureCardChildComponents(featurePreset),
});

export default buildFeatureCardRecord;
