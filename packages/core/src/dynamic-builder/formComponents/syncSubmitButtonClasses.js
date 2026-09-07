import getSubmitButtonVariantOptions from './getSubmitButtonVariantOptions.js';

const sizeNames = ['sm', 'md', 'lg'];

const syncSubmitButtonClasses = (component) => {
  if (!component || !component.is || !component.is('db-submit-button')) return;
  const componentAttributes = component.getAttributes();
  const variantNames = getSubmitButtonVariantOptions().map((optionRecord) => optionRecord.id);
  const variantName =
    variantNames.indexOf(componentAttributes['data-db-variant']) >= 0
      ? componentAttributes['data-db-variant']
      : 'primary';
  const sizeName =
    sizeNames.indexOf(componentAttributes['data-db-size']) >= 0 ? componentAttributes['data-db-size'] : 'md';
  const staleClasses = variantNames
    .concat(sizeNames)
    .map((suffixName) => 'db-button-' + suffixName)
    .filter((className) => className !== 'db-button-' + variantName && className !== 'db-button-' + sizeName);
  component.removeClass(staleClasses.filter((className) => component.getClasses().indexOf(className) >= 0));
  ['db-button', 'db-button-' + variantName, 'db-button-' + sizeName].forEach((className) => {
    if (component.getClasses().indexOf(className) < 0) component.addClass(className);
  });
};

export default syncSubmitButtonClasses;
