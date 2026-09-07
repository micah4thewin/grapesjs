import getOrganizationTypeGroups from './getOrganizationTypeGroups.js';

const resolveOrganizationTypeKind = (organizationType) => {
  const typeValue = String(organizationType || 'Organization').trim() || 'Organization';
  if (typeValue === 'Person') return 'person';
  const businessGroup = getOrganizationTypeGroups().find((typeGroup) => typeGroup.label === 'Local business');
  const isBusiness = businessGroup.options.some((optionEntry) => optionEntry[0] === typeValue);
  return isBusiness ? 'business' : 'organization';
};

export default resolveOrganizationTypeKind;
