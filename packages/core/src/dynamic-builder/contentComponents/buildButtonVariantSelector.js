const buildButtonVariantSelector = (variantName, stateSuffix = '') =>
  `.db-button-${variantName}${stateSuffix}, .db-button[data-db-variant='${variantName}']${stateSuffix}`;

export default buildButtonVariantSelector;
