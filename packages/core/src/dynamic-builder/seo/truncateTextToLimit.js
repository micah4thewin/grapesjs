const truncateTextToLimit = (textValue, characterLimit) => {
  const characters = [...String(textValue || '')];
  if (!characterLimit || characters.length <= characterLimit) return characters.join('');
  return (
    characters
      .slice(0, Math.max(0, characterLimit - 1))
      .join('')
      .replace(/\s+$/, '') + '\u2026'
  );
};

export default truncateTextToLimit;
