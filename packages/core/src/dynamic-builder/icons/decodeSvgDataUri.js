const decodeSvgDataUri = (dataUriValue) => {
  const sourceText = String(dataUriValue || '');
  const headerMatch = sourceText.match(/^data:image\/svg\+xml([^,]*),/i);
  if (!headerMatch) return '';
  const encodedBody = sourceText.slice(headerMatch[0].length);
  const isBase64Body = /base64/i.test(headerMatch[1]);
  try {
    return isBase64Body ? atob(encodedBody) : decodeURIComponent(encodedBody);
  } catch (decodeError) {
    return '';
  }
};

export default decodeSvgDataUri;
