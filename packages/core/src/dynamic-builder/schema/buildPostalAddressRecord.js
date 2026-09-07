const buildPostalAddressRecord = (addressValues) => ({
  '@type': 'PostalAddress',
  streetAddress: addressValues.streetAddress,
  addressLocality: addressValues.addressLocality,
  addressRegion: addressValues.addressRegion,
  postalCode: addressValues.postalCode,
  addressCountry: addressValues.addressCountry,
});

export default buildPostalAddressRecord;
