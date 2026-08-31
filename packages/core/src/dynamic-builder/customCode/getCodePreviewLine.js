const getCodePreviewLine = (codeText, emptyFallbackText) => {
  const firstMeaningfulLine = String(codeText || '')
    .split('\n')
    .map((codeLine) => codeLine.trim())
    .find((codeLine) => codeLine.length > 0);
  if (!firstMeaningfulLine) return emptyFallbackText || '';
  if (firstMeaningfulLine.length <= 64) return firstMeaningfulLine;
  return firstMeaningfulLine.slice(0, 61) + '...';
};

export default getCodePreviewLine;
