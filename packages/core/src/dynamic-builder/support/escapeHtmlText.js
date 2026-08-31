const escapeHtmlText = (textValue) =>
  String(textValue == null ? '' : textValue)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\u0022/g, '&quot;')
    .replace(/\u0027/g, '&#39;');

export default escapeHtmlText;
