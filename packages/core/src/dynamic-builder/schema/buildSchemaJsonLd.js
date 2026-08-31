import buildSchemaRecordsFromValues from './buildSchemaRecordsFromValues.js';
import getPageSchemaRecord from './getPageSchemaRecord.js';
import getSiteSchemaRecord from './getSiteSchemaRecord.js';
import resolveSchemaTargetPage from './resolveSchemaTargetPage.js';

const buildSchemaJsonLd = (editor, page) => {
  const targetPage = resolveSchemaTargetPage(editor, page);
  return buildSchemaRecordsFromValues(
    editor,
    targetPage,
    getSiteSchemaRecord(editor),
    getPageSchemaRecord(editor, targetPage),
  );
};

export default buildSchemaJsonLd;
