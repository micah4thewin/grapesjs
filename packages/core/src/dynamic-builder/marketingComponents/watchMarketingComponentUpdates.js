import syncPriceDisplayFromAttributes from './syncPriceDisplayFromAttributes.js';
import syncStatValueFromAttributes from './syncStatValueFromAttributes.js';

const watchMarketingComponentUpdates = (editor) => {
  editor.on('component:update:attributes:data-db-stat-target', (component) => syncStatValueFromAttributes(component));
  editor.on('component:update:attributes:data-db-stat-prefix', (component) => syncStatValueFromAttributes(component));
  editor.on('component:update:attributes:data-db-stat-suffix', (component) => syncStatValueFromAttributes(component));
  editor.on('component:update:attributes:data-db-price-monthly', (component) =>
    syncPriceDisplayFromAttributes(component),
  );
};

export default watchMarketingComponentUpdates;
