import buildRadioGroupChildrenMarkup from './buildRadioGroupChildrenMarkup.js';

const syncRadioGroupFromAttributes = (component) => {
  if (!component || !component.is || !component.is('db-radio-group')) return;
  const componentAttributes = component.getAttributes();
  component.components(
    buildRadioGroupChildrenMarkup(
      componentAttributes['data-db-legend'],
      componentAttributes['data-db-group-name'],
      componentAttributes['data-db-options'],
    ),
  );
};

export default syncRadioGroupFromAttributes;
