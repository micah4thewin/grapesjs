const sanitizeFieldName = (rawName, fallbackName) => {
  const cleanName = String(rawName || '')
    .trim()
    .replace(/[^A-Za-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return cleanName || fallbackName || 'field';
};

export default sanitizeFieldName;
