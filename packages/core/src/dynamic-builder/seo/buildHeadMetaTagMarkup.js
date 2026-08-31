import escapeHtmlText from '../support/escapeHtmlText.js';

const buildHeadMetaTagMarkup = (attributeName, metaKey, contentText) => {
  const trimmedContent = String(contentText == null ? '' : contentText).trim();
  if (!trimmedContent) return '';
  return (
    '<meta ' + attributeName + '="' + escapeHtmlText(metaKey) + '" content="' + escapeHtmlText(trimmedContent) + '">'
  );
};

export default buildHeadMetaTagMarkup;
