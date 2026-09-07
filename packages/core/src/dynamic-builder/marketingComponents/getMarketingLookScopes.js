const getMarketingLookScopes = () => {
  const darkScopes = ['[data-db-theme=dark]', '[data-db-theme=photo]', '[data-db-overlay=true]'];
  const brandScopes = ['[data-db-theme=brand]'];
  return { dark: darkScopes, brand: brandScopes, inverted: darkScopes.concat(brandScopes) };
};

export default getMarketingLookScopes;
