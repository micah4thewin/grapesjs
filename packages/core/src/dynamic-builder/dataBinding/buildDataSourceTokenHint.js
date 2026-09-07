import isPlainRecord from '../support/isPlainRecord.js';

const buildDataSourceTokenHint = (sourceName, sourceValue) => {
  if (Array.isArray(sourceValue)) {
    const firstRecord = sourceValue.find((sourceItem) => isPlainRecord(sourceItem));
    const firstKey = firstRecord ? Object.keys(firstRecord)[0] || 'field' : 'field';
    return { exampleToken: `{{db:${sourceName}.0.${firstKey}}}`, itemToken: `{{db:item.${firstKey}}}` };
  }
  const firstKey = isPlainRecord(sourceValue) ? Object.keys(sourceValue)[0] || 'field' : 'field';
  return { exampleToken: `{{db:${sourceName}.${firstKey}}}`, itemToken: '' };
};

export default buildDataSourceTokenHint;
