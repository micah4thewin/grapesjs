import createFindingRecord from './createFindingRecord.js';
import resolveSeoRecords from './resolveSeoRecords.js';

const checkSchemaPageType = (auditContext) => {
  const { pageSchema } = resolveSeoRecords(auditContext);
  if (String(pageSchema.pageType || '').trim()) return [];
  return [
    createFindingRecord(
      'info',
      'Structured data',
      'No schema.org page type is chosen for this page.',
      'Pick a page type in the schema manager so JSON-LD structured data can be emitted.',
    ),
  ];
};

export default checkSchemaPageType;
