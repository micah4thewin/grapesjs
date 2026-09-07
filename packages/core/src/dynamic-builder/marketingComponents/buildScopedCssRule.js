const buildScopedCssRule = (scopeSelectors, targetSelectors, declarationsText) => {
  const combinedSelectors = scopeSelectors.flatMap((scopeSelector) =>
    targetSelectors.map((targetSelector) => scopeSelector + ' ' + targetSelector),
  );
  return combinedSelectors.join(',\n') + ' { ' + declarationsText + ' }';
};

export default buildScopedCssRule;
