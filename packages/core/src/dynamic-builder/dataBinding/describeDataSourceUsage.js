const pluralize = (countValue, singularText, pluralText) =>
  `${countValue} ${countValue === 1 ? singularText : pluralText}`;

const describeDataSourceUsage = (usageRecord) => {
  const repeaterCount = usageRecord ? usageRecord.repeaterCount || 0 : 0;
  const tokenCount = usageRecord ? usageRecord.tokenCount || 0 : 0;
  const pageCount = usageRecord && Array.isArray(usageRecord.pageNames) ? usageRecord.pageNames.length : 0;
  if (!repeaterCount && !tokenCount) return 'Not used on any page yet';
  const usageParts = [];
  if (repeaterCount) usageParts.push(pluralize(repeaterCount, 'repeater', 'repeaters'));
  if (tokenCount) usageParts.push(pluralize(tokenCount, 'token', 'tokens'));
  return `Used by ${usageParts.join(' and ')} on ${pluralize(pageCount, 'page', 'pages')}`;
};

export default describeDataSourceUsage;
