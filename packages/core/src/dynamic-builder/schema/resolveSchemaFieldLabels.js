import getSchemaFieldLabelRecords from './getSchemaFieldLabelRecords.js';

const resolveSchemaFieldLabels = (groupKey, fieldKeys) => {
  const labelRecord = getSchemaFieldLabelRecords()[String(groupKey || '').toLowerCase()] || {};
  return (Array.isArray(fieldKeys) ? fieldKeys : []).map((fieldKey) => labelRecord[fieldKey] || fieldKey);
};

export default resolveSchemaFieldLabels;
