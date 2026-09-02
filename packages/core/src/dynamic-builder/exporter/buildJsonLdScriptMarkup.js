import buildSchemaJsonLd from '../schema/buildSchemaJsonLd.js';
import serializeJsonForScript from '../support/serializeJsonForScript.js';

const buildJsonLdScriptMarkup = (editor, page) => {
  const schemaRecords = buildSchemaJsonLd(editor, page);
  const recordList = Array.isArray(schemaRecords) ? schemaRecords.filter(Boolean) : [];
  return recordList
    .map((schemaRecord) => serializeJsonForScript(schemaRecord, 2))
    .map((jsonText) => '<script type="application/ld+json">\n' + jsonText + '\n</script>')
    .join('\n');
};

export default buildJsonLdScriptMarkup;
