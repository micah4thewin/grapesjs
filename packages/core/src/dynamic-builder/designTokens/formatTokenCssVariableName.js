const formatTokenCssVariableName = (groupKey, tokenName) => {
  const toKebabText = (rawText) =>
    String(rawText)
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase();
  return `--db-${toKebabText(groupKey)}-${toKebabText(tokenName)}`;
};

export default formatTokenCssVariableName;
