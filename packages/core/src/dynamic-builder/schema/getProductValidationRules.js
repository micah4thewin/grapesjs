const getProductValidationRules = () => ({
  required: ['name'],
  recommended: ['description', 'image', 'sku', 'brand', 'price', 'priceCurrency', 'availability'],
});

export default getProductValidationRules;
