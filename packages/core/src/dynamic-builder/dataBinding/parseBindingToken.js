const parseBindingToken = (tokenBody) => {
  const bodyText = String(tokenBody == null ? '' : tokenBody).trim();
  const separatorIndex = bodyText.indexOf('|');
  if (separatorIndex < 0) return { pathText: bodyText, filterName: '' };
  return {
    pathText: bodyText.slice(0, separatorIndex).trim(),
    filterName: bodyText
      .slice(separatorIndex + 1)
      .trim()
      .toLowerCase(),
  };
};

export default parseBindingToken;
