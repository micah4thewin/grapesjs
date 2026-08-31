const formatTokenLabelText = (tokenName) => {
  const spacedText = String(tokenName)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .toLowerCase();
  return spacedText.charAt(0).toUpperCase() + spacedText.slice(1);
};

export default formatTokenLabelText;
