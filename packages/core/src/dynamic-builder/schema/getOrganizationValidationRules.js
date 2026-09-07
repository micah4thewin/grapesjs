import getSchemaFieldFormatRecords from './getSchemaFieldFormatRecords.js';
import resolveOrganizationTypeKind from './resolveOrganizationTypeKind.js';

const getOrganizationValidationRules = (organizationValues) => {
  const typeKind = resolveOrganizationTypeKind(organizationValues && organizationValues.type);
  const formats = getSchemaFieldFormatRecords().organization;
  if (typeKind === 'person') {
    return { required: ['name'], recommended: ['url', 'image', 'jobTitle', 'sameAs'], formats };
  }
  const businessRecommended = typeKind === 'business' ? ['openingHours', 'priceRange'] : [];
  return {
    required: ['name', 'url'],
    recommended: ['logo', 'email', 'telephone', 'streetAddress', 'addressLocality', 'addressCountry', 'sameAs'].concat(
      businessRecommended,
    ),
    formats,
  };
};

export default getOrganizationValidationRules;
