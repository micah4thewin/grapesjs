import isPlainRecord from '../support/isPlainRecord.js';
import pruneEmptySchemaValues from './pruneEmptySchemaValues.js';
import splitSameAsLines from './splitSameAsLines.js';

const buildOrganizationRecord = (organizationValues) => {
  const organizationRecord = isPlainRecord(organizationValues) ? organizationValues : {};
  const organizationType = String(organizationRecord.type || 'Organization').trim();
  return (
    pruneEmptySchemaValues({
      '@context': 'https://schema.org',
      '@type': organizationType,
      name: organizationRecord.name,
      url: organizationRecord.url,
      logo: organizationRecord.logo,
      email: organizationRecord.email,
      telephone: organizationRecord.telephone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: organizationRecord.streetAddress,
        addressLocality: organizationRecord.addressLocality,
        addressRegion: organizationRecord.addressRegion,
        postalCode: organizationRecord.postalCode,
        addressCountry: organizationRecord.addressCountry,
      },
      sameAs: splitSameAsLines(organizationRecord.sameAs),
      openingHours: organizationRecord.openingHours,
    }) || null
  );
};

export default buildOrganizationRecord;
