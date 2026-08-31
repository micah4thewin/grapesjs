const deriveLabelFromCommandId = (commandId) => {
  const readableText = String(commandId || '')
    .replace(/^db:/, '')
    .replace(/^core:/, '')
    .replace(/-/g, ' ')
    .trim();
  if (!readableText) return String(commandId || '');
  return readableText.charAt(0).toUpperCase() + readableText.slice(1);
};

export default deriveLabelFromCommandId;
