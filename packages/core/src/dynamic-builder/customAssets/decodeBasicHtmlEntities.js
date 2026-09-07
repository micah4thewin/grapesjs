const entityReplacements = [
  [/&lt;/g, '<'],
  [/&gt;/g, '>'],
  [/&quot;/g, '"'],
  [/&#39;/g, "'"],
  [/&amp;/g, '&'],
];

const decodeBasicHtmlEntities = (textValue) =>
  entityReplacements.reduce(
    (decodedText, [entityPattern, plainText]) => decodedText.replace(entityPattern, plainText),
    String(textValue == null ? '' : textValue),
  );

export default decodeBasicHtmlEntities;
