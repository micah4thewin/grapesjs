import sanitizeFieldName from './sanitizeFieldName.js';

const buildControlId = (fieldName) =>
  'db-' + sanitizeFieldName(fieldName, 'field').toLowerCase() + '-' + Math.random().toString(36).slice(2, 6);

export default buildControlId;
