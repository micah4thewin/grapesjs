import isPlainRecord from '../support/isPlainRecord.js';

const readTrimmedText = (textValue, maxLength) =>
  String(textValue == null ? '' : textValue)
    .trim()
    .slice(0, maxLength);

const normalizeUserTemplateRecord = (templateRecord) => {
  if (!isPlainRecord(templateRecord)) return null;
  const templateName = readTrimmedText(templateRecord.name, 80);
  const contentRecords = Array.isArray(templateRecord.content) ? templateRecord.content.filter(isPlainRecord) : [];
  if (!templateName || !contentRecords.length) return null;
  const templateId = readTrimmedText(templateRecord.templateId, 120);
  if (!templateId) return null;
  return {
    templateId,
    name: templateName,
    description: readTrimmedText(templateRecord.description, 240),
    categoryId: readTrimmedText(templateRecord.categoryId, 40) || 'saved',
    kind: templateRecord.kind === 'page' ? 'page' : 'section',
    source: 'user',
    createdAt: Number(templateRecord.createdAt) || Date.now(),
    content: contentRecords,
  };
};

export default normalizeUserTemplateRecord;
