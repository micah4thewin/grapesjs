import buildSchemaRecordsFromValues from './buildSchemaRecordsFromValues.js';
import collectSchemaFormValues from './collectSchemaFormValues.js';
import resolveSchemaTargetPage from './resolveSchemaTargetPage.js';

const refreshSchemaPreview = (editor, rootElement) => {
  const previewElement = rootElement.querySelector('[data-db-schema-preview]');
  if (!previewElement) return;
  const siteFormValues = collectSchemaFormValues(rootElement.querySelector('[data-db-schema-section="site"]'));
  const pageFormValues = collectSchemaFormValues(rootElement.querySelector('[data-db-schema-section="page"]'));
  const targetPage = resolveSchemaTargetPage(editor);
  const schemaRecords = buildSchemaRecordsFromValues(editor, targetPage, siteFormValues, pageFormValues);
  previewElement.value = JSON.stringify(schemaRecords, null, 2);
};

export default refreshSchemaPreview;
