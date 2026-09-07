import buildPostalAddressRecord from './buildPostalAddressRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';
import normalizeSchemaUrlValue from './normalizeSchemaUrlValue.js';
import pruneEmptySchemaValues from './pruneEmptySchemaValues.js';
import resolveOrganizationTypeKind from './resolveOrganizationTypeKind.js';
import splitSameAsLines from './splitSameAsLines.js';

const buildOrganizationRecord = (organizationValues) => {
  const organizationRecord = isPlainRecord(organizationValues) ? organizationValues : {};
  const organizationType = String(organizationRecord.type || 'Organization').trim() || 'Organization';
  const typeKind = resolveOrganizationTypeKind(organizationType);
  const websiteUrl = normalizeSchemaUrlValue(organizationRecord.url);
  const sharedFields = {
    '@context': 'https://schema.org',
    '@type': organizationType,
    name: organizationRecord.name,
    url: websiteUrl,
    image: normalizeSchemaUrlValue(organizationRecord.image, websiteUrl),
    email: organizationRecord.email,
    telephone: organizationRecord.telephone,
    address: buildPostalAddressRecord(organizationRecord),
    sameAs: splitSameAsLines(organizationRecord.sameAs),
  };
  if (typeKind === 'person') {
    return pruneEmptySchemaValues({ ...sharedFields, jobTitle: organizationRecord.jobTitle }) || null;
  }
  const businessFields =
    typeKind === 'business'
      ? { openingHours: organizationRecord.openingHours, priceRange: organizationRecord.priceRange }
      : {};
  return (
    pruneEmptySchemaValues({
      ...sharedFields,
      logo: normalizeSchemaUrlValue(organizationRecord.logo, websiteUrl),
      ...businessFields,
    }) || null
  );
};

export default buildOrganizationRecord;
