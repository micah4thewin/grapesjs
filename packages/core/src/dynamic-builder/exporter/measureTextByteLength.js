const measureTextByteLength = (textValue) => {
  const sourceText = String(textValue == null ? '' : textValue);
  if (typeof TextEncoder === 'function') return new TextEncoder().encode(sourceText).length;
  return sourceText.length;
};

export default measureTextByteLength;
