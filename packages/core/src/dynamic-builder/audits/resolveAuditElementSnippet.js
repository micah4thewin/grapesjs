import truncateAuditSnippet from './truncateAuditSnippet.js';

const resolveFileNameFromSource = (sourceValue) => {
  const sourceText = String(sourceValue || '').trim();
  if (!sourceText || /^data:/i.test(sourceText)) return '';
  const pathText = sourceText.split(/[?#]/)[0];
  return pathText.split('/').filter(Boolean).pop() || '';
};

const resolveAuditElementSnippet = (element) => {
  const readAttribute = (attributeName) => String(element.getAttribute(attributeName) || '').trim();
  const textValue = String(element.textContent || '').trim();
  return truncateAuditSnippet(
    textValue ||
      readAttribute('aria-label') ||
      readAttribute('alt') ||
      readAttribute('placeholder') ||
      resolveFileNameFromSource(readAttribute('src')),
  );
};

export default resolveAuditElementSnippet;
