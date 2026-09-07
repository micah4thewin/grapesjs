import normalizeSchemaPriceValue from './normalizeSchemaPriceValue.js';
import normalizeSchemaUrlValue from './normalizeSchemaUrlValue.js';

const buildProductRecordFields = (productValues, pageUrl, canonicalBase) => {
  const availabilityValue = String(productValues.availability || '').trim();
  return {
    name: productValues.name,
    description: productValues.description,
    image: normalizeSchemaUrlValue(productValues.image, canonicalBase),
    sku: productValues.sku,
    brand: {
      '@type': 'Brand',
      name: productValues.brand,
    },
    offers: {
      '@type': 'Offer',
      price: normalizeSchemaPriceValue(productValues.price),
      priceCurrency: String(productValues.priceCurrency || '')
        .trim()
        .toUpperCase(),
      availability: availabilityValue ? 'https://schema.org/' + availabilityValue : '',
      url: pageUrl,
    },
  };
};

export default buildProductRecordFields;
