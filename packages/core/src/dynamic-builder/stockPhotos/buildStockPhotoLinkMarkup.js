import escapeHtmlText from '../support/escapeHtmlText.js';

const buildStockPhotoLinkMarkup = (linkUrl, labelText, className) => {
  const safeLabel = escapeHtmlText(labelText);
  if (!linkUrl) return '<span class="' + className + '">' + safeLabel + '</span>';
  return (
    '<a class="' +
    className +
    '" href="' +
    escapeHtmlText(linkUrl) +
    '" target="_blank" rel="noopener noreferrer">' +
    safeLabel +
    '</a>'
  );
};

export default buildStockPhotoLinkMarkup;
