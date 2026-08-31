const sanitizeUrlValue = (urlValue) => {
  const trimmedValue = String(urlValue || '').trim();
  if (!trimmedValue) return '';
  const compactValue = trimmedValue.replace(/[\u0000-\u0020]+/g, '');
  if (/^(javascript|vbscript|data:text\/html)/i.test(compactValue)) return '';
  return trimmedValue;
};

export default sanitizeUrlValue;
