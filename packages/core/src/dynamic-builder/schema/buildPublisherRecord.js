import isPlainRecord from '../support/isPlainRecord.js';
import normalizeSchemaUrlValue from './normalizeSchemaUrlValue.js';
import resolveOrganizationTypeKind from './resolveOrganizationTypeKind.js';

const buildPublisherRecord = (organizationValues) => {
  const organizationRecord = isPlainRecord(organizationValues) ? organizationValues : {};
  const publisherName = String(organizationRecord.name || '').trim();
  if (!publisherName) return undefined;
  const isPerson = resolveOrganizationTypeKind(organizationRecord.type) === 'person';
  const websiteUrl = normalizeSchemaUrlValue(organizationRecord.url);
  const logoUrl = normalizeSchemaUrlValue(isPerson ? organizationRecord.image : organizationRecord.logo, websiteUrl);
  return {
    '@type': isPerson ? 'Person' : 'Organization',
    name: publisherName,
    url: websiteUrl,
    logo: logoUrl ? { '@type': 'ImageObject', url: logoUrl } : undefined,
  };
};

export default buildPublisherRecord;
