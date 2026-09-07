const getMarketingLookRootSelectors = (lookName) =>
  ['.db-hero', '.db-pricing', '.db-footer'].map((rootSelector) => rootSelector + '[data-db-theme=' + lookName + ']');

export default getMarketingLookRootSelectors;
