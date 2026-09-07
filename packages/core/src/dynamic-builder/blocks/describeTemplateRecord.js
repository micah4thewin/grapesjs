import getTemplatePartNames from './getTemplatePartNames.js';

const flattenRecords = (componentRecords) =>
  componentRecords.reduce(
    (allRecords, componentRecord) => [
      ...allRecords,
      componentRecord,
      ...flattenRecords(Array.isArray(componentRecord.components) ? componentRecord.components : []),
    ],
    [],
  );

const describeTemplateRecord = (componentRecord) => {
  const partNames = getTemplatePartNames();
  const typeName = String((componentRecord && componentRecord.type) || '');
  if (typeName !== 'db-section') return partNames[typeName] || 'Section';
  const namedRecord = flattenRecords([componentRecord]).find((nestedRecord) => partNames[nestedRecord.type]);
  return namedRecord ? partNames[namedRecord.type] : 'Intro';
};

export default describeTemplateRecord;
