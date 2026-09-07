import getSchemaFieldFormatRecords from './getSchemaFieldFormatRecords.js';

const getWebSiteValidationRules = () => ({
  required: ['name', 'url'],
  recommended: ['searchUrlTemplate'],
  formats: getSchemaFieldFormatRecords().website,
});

export default getWebSiteValidationRules;
