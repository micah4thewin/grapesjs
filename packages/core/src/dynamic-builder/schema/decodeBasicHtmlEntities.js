const decodeBasicHtmlEntities = (textValue) => {
  const singleQuoteText = String.fromCharCode(39);
  const doubleQuoteText = String.fromCharCode(34);
  return String(textValue || '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, doubleQuoteText)
    .replace(/&#0?34;/g, doubleQuoteText)
    .replace(/&#0?39;/g, singleQuoteText)
    .replace(/&apos;/g, singleQuoteText)
    .replace(/&amp;/g, '&');
};

export default decodeBasicHtmlEntities;
