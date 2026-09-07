import describeTemplateRecord from './describeTemplateRecord.js';

const listTemplateContentNames = (contentRecords) =>
  (Array.isArray(contentRecords) ? contentRecords : [contentRecords])
    .filter(Boolean)
    .map((componentRecord) => describeTemplateRecord(componentRecord));

export default listTemplateContentNames;
