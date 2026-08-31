const buildMarketingPlaceholderUri = (variantName, labelText) => {
  const openSvgTag = (widthValue, heightValue) =>
    "<svg xmlns='http://www.w3.org/2000/svg' width='" +
    widthValue +
    "' height='" +
    heightValue +
    "' viewBox='0 0 " +
    widthValue +
    ' ' +
    heightValue +
    "'>";
  const encodeSvgMarkup = (svgMarkup) => 'data:image/svg+xml,' + encodeURIComponent(svgMarkup);
  if (variantName === 'avatar') {
    return encodeSvgMarkup(
      openSvgTag(240, 240) +
        "<rect width='240' height='240' fill='#e0e7ff'/>" +
        "<circle cx='120' cy='94' r='42' fill='#a5b4fc'/>" +
        "<path d='M44 220 C44 164 82 138 120 138 C158 138 196 164 196 220 Z' fill='#a5b4fc'/>" +
        '</svg>',
    );
  }
  if (variantName === 'logo') {
    const safeLabelText = String(labelText || 'Logo').replace(/[<>&]/g, '');
    return encodeSvgMarkup(
      openSvgTag(240, 80) +
        "<rect x='8' y='16' width='48' height='48' rx='12' fill='#94a3b8'/>" +
        "<text x='72' y='50' font-family='Arial, sans-serif' font-size='24' font-weight='700' fill='#64748b'>" +
        safeLabelText +
        '</text></svg>',
    );
  }
  const photoWidth = variantName === 'hero' ? 960 : 640;
  const photoHeight = variantName === 'hero' ? 640 : 400;
  const strokeStyle = "fill='none' stroke='#94a3b8' stroke-width='12'";
  const midHeight = Math.round(photoHeight * 0.55);
  const lowHeight = Math.round(photoHeight * 0.78);
  return encodeSvgMarkup(
    openSvgTag(photoWidth, photoHeight) +
      "<rect width='" +
      photoWidth +
      "' height='" +
      photoHeight +
      "' fill='#e2e8f0'/>" +
      "<circle cx='" +
      Math.round(photoWidth * 0.36) +
      "' cy='" +
      Math.round(photoHeight * 0.34) +
      "' r='" +
      Math.round(photoHeight * 0.09) +
      "' " +
      strokeStyle +
      '/>' +
      "<path d='M" +
      Math.round(photoWidth * 0.16) +
      ' ' +
      lowHeight +
      ' L' +
      Math.round(photoWidth * 0.4) +
      ' ' +
      midHeight +
      ' L' +
      Math.round(photoWidth * 0.58) +
      ' ' +
      Math.round(photoHeight * 0.68) +
      ' L' +
      Math.round(photoWidth * 0.72) +
      ' ' +
      Math.round(photoHeight * 0.56) +
      ' L' +
      Math.round(photoWidth * 0.86) +
      ' ' +
      lowHeight +
      "' " +
      strokeStyle +
      " stroke-linecap='round' stroke-linejoin='round'/>" +
      '</svg>',
  );
};

export default buildMarketingPlaceholderUri;
