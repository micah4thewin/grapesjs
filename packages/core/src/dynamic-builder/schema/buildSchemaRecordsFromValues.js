import buildBreadcrumbListRecord from './buildBreadcrumbListRecord.js';
import buildOrganizationRecord from './buildOrganizationRecord.js';
import buildPageTypeRecord from './buildPageTypeRecord.js';
import buildWebSiteRecord from './buildWebSiteRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildSchemaRecordsFromValues = (editor, page, siteSchemaRecord, pageSchemaRecord) => {
  const siteRecord = isPlainRecord(siteSchemaRecord) ? siteSchemaRecord : {};
  const schemaRecords = [
    buildWebSiteRecord(siteRecord.website),
    buildOrganizationRecord(siteRecord.organization),
    buildBreadcrumbListRecord(editor, page),
    buildPageTypeRecord(editor, page, pageSchemaRecord),
  ];
  return schemaRecords.filter(Boolean);
};

export default buildSchemaRecordsFromValues;
