const encodeSvgDataUri = (svgMarkup) => {
  const markupText = String(svgMarkup || '');
  if (typeof TextEncoder === 'undefined' || typeof btoa === 'undefined') {
    return 'data:image/svg+xml,' + encodeURIComponent(markupText);
  }
  const byteArray = new TextEncoder().encode(markupText);
  let binaryText = '';
  for (let byteIndex = 0; byteIndex < byteArray.length; byteIndex++) {
    binaryText += String.fromCharCode(byteArray[byteIndex]);
  }
  return 'data:image/svg+xml;base64,' + btoa(binaryText);
};

export default encodeSvgDataUri;
