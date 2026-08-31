import buildSelectOptionsMarkup from './buildSelectOptionsMarkup.js';

const syncSelectOptionsFromAttribute = (component) => {
  if (!component || !component.is || !component.is('db-select')) return;
  component.components(buildSelectOptionsMarkup(component.getAttributes()['data-db-options']));
};

export default syncSelectOptionsFromAttribute;
