import getSchemaPageTypeOptions from './getSchemaPageTypeOptions.js';

const resolveSchemaPageTypeLabel = (pageType) => {
  const matchingOption = getSchemaPageTypeOptions().find((optionEntry) => optionEntry[0] === pageType);
  return matchingOption ? matchingOption[1] : String(pageType || 'Web page');
};

export default resolveSchemaPageTypeLabel;
