import buildSchemaJsonLd from '../schema/buildSchemaJsonLd.js';

const buildJsonLdScriptMarkup = (editor, page) => {
  const schemaRecords = buildSchemaJsonLd(editor, page);
  const recordList = Array.isArray(schemaRecords) ? schemaRecords.filter(Boolean) : [];
  return recordList
    .map((schemaRecord) => JSON.stringify(schemaRecord, null, 2).replace(/<\//g, '<\\/'))
    .map((jsonText) => '<script type="application/ld+json">\n' + jsonText + '\n</script>')
    .join('\n');
};

export default buildJsonLdScriptMarkup;
