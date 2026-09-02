const splitColorFunctionParts = (argumentText) => {
  const normalizedText = String(argumentText || '')
    .trim()
    .replace(/\s*\/\s*/, ' / ');
  const slashIndex = normalizedText.indexOf(' / ');
  const channelText = slashIndex >= 0 ? normalizedText.slice(0, slashIndex) : normalizedText;
  const alphaText = slashIndex >= 0 ? normalizedText.slice(slashIndex + 3) : '';
  const channelParts = channelText
    .split(/[\s,]+/)
    .map((partText) => partText.trim())
    .filter(Boolean);
  if (!alphaText && channelParts.length === 4) {
    return { channelParts: channelParts.slice(0, 3), alphaText: channelParts[3] };
  }
  return { channelParts, alphaText: alphaText.trim() };
};

export default splitColorFunctionParts;
