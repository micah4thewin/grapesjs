const buildProductRecordFields = (productValues, pageUrl) => {
  const availabilityValue = String(productValues.availability || '').trim();
  return {
    name: productValues.name,
    description: productValues.description,
    image: productValues.image,
    sku: productValues.sku,
    brand: {
      '@type': 'Brand',
      name: productValues.brand,
    },
    offers: {
      '@type': 'Offer',
      price: productValues.price,
      priceCurrency: productValues.priceCurrency,
      availability: availabilityValue ? 'https://schema.org/' + availabilityValue : '',
      url: pageUrl,
    },
  };
};

export default buildProductRecordFields;
