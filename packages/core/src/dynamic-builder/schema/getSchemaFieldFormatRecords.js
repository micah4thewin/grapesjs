const getSchemaFieldFormatRecords = () => ({
  organization: { url: 'url', logo: 'url', image: 'url', email: 'email', telephone: 'tel', sameAs: 'urlLines' },
  website: { url: 'url', searchUrlTemplate: 'url' },
  article: { image: 'url', datePublished: 'date', dateModified: 'date' },
  product: { image: 'url', price: 'number' },
  event: { startDate: 'date', endDate: 'date', offerPrice: 'number', offerUrl: 'url' },
});

export default getSchemaFieldFormatRecords;
