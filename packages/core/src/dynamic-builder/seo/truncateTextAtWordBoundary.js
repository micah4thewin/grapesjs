const truncateTextAtWordBoundary = (textValue, characterLimit) => {
  const cleanText = String(textValue || '')
    .replace(/\s+/g, ' ')
    .trim();
  if (cleanText.length <= characterLimit) return cleanText;
  const clippedText = cleanText.slice(0, characterLimit);
  const boundarySearchText = cleanText.slice(0, characterLimit + 1);
  const sentenceEnd = Math.max(
    boundarySearchText.lastIndexOf('. '),
    boundarySearchText.lastIndexOf('! '),
    boundarySearchText.lastIndexOf('? '),
  );
  if (sentenceEnd > 0 && sentenceEnd + 1 >= characterLimit / 2) return clippedText.slice(0, sentenceEnd + 1);
  const wordEnd = clippedText.lastIndexOf(' ');
  return (wordEnd > 0 ? clippedText.slice(0, wordEnd) : clippedText).replace(/[,;:\-]+$/, '');
};

export default truncateTextAtWordBoundary;
