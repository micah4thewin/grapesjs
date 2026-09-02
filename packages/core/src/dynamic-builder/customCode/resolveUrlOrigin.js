const resolveUrlOrigin = (urlText) => {
  const trimmedText = String(urlText == null ? '' : urlText).trim();
  if (!trimmedText) return '';
  try {
    const parsedUrl = new URL(trimmedText);
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') return '';
    return parsedUrl.origin;
  } catch {
    return '';
  }
};

export default resolveUrlOrigin;
