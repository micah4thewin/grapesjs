const getOrganizationValidationRules = () => ({
  required: ['name', 'url'],
  recommended: ['logo', 'email', 'telephone', 'streetAddress', 'addressLocality', 'addressCountry', 'sameAs'],
});

export default getOrganizationValidationRules;
