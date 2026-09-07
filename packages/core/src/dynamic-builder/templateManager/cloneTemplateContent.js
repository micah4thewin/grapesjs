const cloneTemplateContent = (templateRecord) =>
  JSON.parse(JSON.stringify(Array.isArray(templateRecord.content) ? templateRecord.content : [templateRecord.content]));

export default cloneTemplateContent;
