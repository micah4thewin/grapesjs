import getSchemaFieldFormatRecords from './getSchemaFieldFormatRecords.js';

const getProductValidationRules = () => ({
  required: ['name'],
  recommended: ['description', 'image', 'sku', 'brand', 'price', 'priceCurrency', 'availability'],
  formats: getSchemaFieldFormatRecords().product,
});

export default getProductValidationRules;
