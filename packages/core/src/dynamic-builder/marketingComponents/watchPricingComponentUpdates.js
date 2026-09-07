import isComponentOfType from './isComponentOfType.js';
import syncFeaturedTierExclusive from './syncFeaturedTierExclusive.js';
import syncPricingSection from './syncPricingSection.js';
import syncPricingTierDisplay from './syncPricingTierDisplay.js';

const watchPricingComponentUpdates = (editor) => {
  const sectionAttributeNames = [
    'data-db-currency',
    'data-db-yearly-discount',
    'data-db-billing-default',
    'data-db-period-monthly',
    'data-db-period-yearly',
    'data-db-save-label',
  ];
  sectionAttributeNames.forEach((attributeName) => {
    editor.on('component:update:attributes:' + attributeName, (component) => {
      if (isComponentOfType(component, 'db-pricing')) syncPricingSection(component);
    });
  });
  editor.on('component:update:attributes:data-db-amount', (component) => {
    if (isComponentOfType(component, 'db-pricing-tier')) syncPricingTierDisplay(component);
  });
  editor.on('component:update:attributes:data-db-featured', (component) => {
    if (isComponentOfType(component, 'db-pricing-tier')) syncFeaturedTierExclusive(component);
  });
  editor.on('component:add', (component) => {
    if (isComponentOfType(component, 'db-pricing')) syncPricingSection(component);
  });
};

export default watchPricingComponentUpdates;
