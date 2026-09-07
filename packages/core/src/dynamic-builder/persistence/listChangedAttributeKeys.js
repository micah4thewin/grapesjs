const watchedKeys = ['style', 'attributes', 'content', 'components', 'name', 'classes', 'src', 'dbSiteMeta', 'dbPageMeta'];

const serializeSafely = (attributeValue) => {
  try {
    return JSON.stringify(attributeValue === undefined ? null : attributeValue);
  } catch (serializeError) {
    return '';
  }
};

const listChangedAttributeKeys = (actionRecord) => {
  const beforeRecord = actionRecord && actionRecord.before && typeof actionRecord.before === 'object' ? actionRecord.before : {};
  const afterRecord = actionRecord && actionRecord.after && typeof actionRecord.after === 'object' ? actionRecord.after : {};
  return watchedKeys.filter(
    (attributeKey) =>
      (attributeKey in beforeRecord || attributeKey in afterRecord) &&
      serializeSafely(beforeRecord[attributeKey]) !== serializeSafely(afterRecord[attributeKey]),
  );
};

export default listChangedAttributeKeys;
