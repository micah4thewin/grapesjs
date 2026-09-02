const decodeBase64Utf8 = (encodedBody) => {
  const binaryText = atob(encodedBody);
  const byteArray = new Uint8Array(binaryText.length);
  for (let byteIndex = 0; byteIndex < binaryText.length; byteIndex++) {
    byteArray[byteIndex] = binaryText.charCodeAt(byteIndex);
  }
  return typeof TextDecoder === 'undefined' ? binaryText : new TextDecoder('utf-8').decode(byteArray);
};

const decodeSvgDataUri = (dataUriValue) => {
  const sourceText = String(dataUriValue || '');
  const headerMatch = sourceText.match(/^data:image\/svg\+xml([^,]*),/i);
  if (!headerMatch) return '';
  const encodedBody = sourceText.slice(headerMatch[0].length);
  const isBase64Body = /base64/i.test(headerMatch[1]);
  try {
    return isBase64Body ? decodeBase64Utf8(encodedBody) : decodeURIComponent(encodedBody);
  } catch (decodeError) {
    return '';
  }
};

export default decodeSvgDataUri;
