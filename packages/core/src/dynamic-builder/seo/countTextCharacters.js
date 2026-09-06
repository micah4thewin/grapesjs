const countTextCharacters = (textValue) => {
  const sourceText = String(textValue == null ? '' : textValue);
  if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
    try {
      return [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(sourceText)].length;
    } catch (segmenterError) {
      return [...sourceText].length;
    }
  }
  return [...sourceText].length;
};

export default countTextCharacters;
