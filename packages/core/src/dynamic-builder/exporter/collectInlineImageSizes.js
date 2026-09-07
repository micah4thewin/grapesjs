import measureTextByteLength from './measureTextByteLength.js';

const collectInlineImageSizes = (markupText) => {
  const dataUriPattern = /data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+/g;
  const foundSizes = [];
  const sourceText = String(markupText || '');
  let dataUriMatch = dataUriPattern.exec(sourceText);
  while (dataUriMatch) {
    foundSizes.push(measureTextByteLength(dataUriMatch[0]));
    dataUriMatch = dataUriPattern.exec(sourceText);
  }
  return foundSizes.sort((firstSize, secondSize) => secondSize - firstSize);
};

export default collectInlineImageSizes;
