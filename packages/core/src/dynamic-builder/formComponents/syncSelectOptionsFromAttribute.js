import buildSelectOptionDefinitions from './buildSelectOptionDefinitions.js';

const syncSelectOptionsFromAttribute = (component) => {
  if (!component || !component.is || !component.is('db-select')) return;
  const componentAttributes = component.getAttributes();
  component.components(
    buildSelectOptionDefinitions(
      componentAttributes['data-db-options'],
      componentAttributes['data-db-placeholder'],
      componentAttributes['data-db-selected'] || '',
    ),
  );
};

export default syncSelectOptionsFromAttribute;
