import isPlainRecord from '../support/isPlainRecord.js';

const placeholderLeafTypes = ['db-text', 'db-heading', 'text'];

const markTemplatePlaceholderCopy = (contentRecord) => {
  if (Array.isArray(contentRecord)) {
    return contentRecord.map((childRecord) => markTemplatePlaceholderCopy(childRecord));
  }
  if (!isPlainRecord(contentRecord)) return contentRecord;
  const isTextLeaf =
    placeholderLeafTypes.indexOf(String(contentRecord.type || '')) >= 0 && typeof contentRecord.components === 'string';
  return {
    ...contentRecord,
    ...(isTextLeaf ? { attributes: { ...(contentRecord.attributes || {}), 'data-db-placeholder': 'true' } } : {}),
    ...(Array.isArray(contentRecord.components)
      ? { components: contentRecord.components.map((childRecord) => markTemplatePlaceholderCopy(childRecord)) }
      : {}),
  };
};

export default markTemplatePlaceholderCopy;
