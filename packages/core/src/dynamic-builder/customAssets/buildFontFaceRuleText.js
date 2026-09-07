const buildFontFaceRuleText = (fontRecord) =>
  [
    '@font-face {',
    'font-family: "' + fontRecord.family + '";',
    'src: url("' + fontRecord.source + '") format("' + fontRecord.format + '");',
    'font-weight: ' + fontRecord.weight + ';',
    'font-style: ' + fontRecord.style + ';',
    'font-display: swap;',
    '}',
  ].join('\n');

export default buildFontFaceRuleText;
