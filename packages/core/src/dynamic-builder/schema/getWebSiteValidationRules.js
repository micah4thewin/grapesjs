const getWebSiteValidationRules = () => ({
  required: ['name', 'url'],
  recommended: ['searchUrlTemplate'],
});

export default getWebSiteValidationRules;
