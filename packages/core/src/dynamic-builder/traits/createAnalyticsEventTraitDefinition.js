import createAttributeTraitDefinition from './createAttributeTraitDefinition.js';

const createAnalyticsEventTraitDefinition = () =>
  createAttributeTraitDefinition('data-analytics-event', 'A short name, e.g. signup_click');

export default createAnalyticsEventTraitDefinition;
