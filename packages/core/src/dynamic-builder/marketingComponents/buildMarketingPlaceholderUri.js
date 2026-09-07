import buildImagePlaceholderDataUri from '../mediaComponents/buildImagePlaceholderDataUri.js';

const buildMarketingPlaceholderUri = (variantName, labelText) => {
  const encodeSvgMarkup = (svgMarkup) => 'data:image/svg+xml,' + encodeURIComponent(svgMarkup);
  if (variantName === 'avatar') {
    return encodeSvgMarkup(
      "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'>" +
        "<rect width='240' height='240' fill='#e0e7ff'/>" +
        "<circle cx='120' cy='94' r='42' fill='#a5b4fc'/>" +
        "<path d='M44 220 C44 164 82 138 120 138 C158 138 196 164 196 220 Z' fill='#a5b4fc'/>" +
        '</svg>',
    );
  }
  if (variantName === 'logo') {
    const safeLabelText = String(labelText || 'Logo').replace(/[<>&]/g, '');
    return encodeSvgMarkup(
      "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='80' viewBox='0 0 240 80'>" +
        "<rect x='8' y='16' width='48' height='48' rx='12' fill='#94a3b8'/>" +
        "<text x='72' y='50' font-family='Arial, sans-serif' font-size='24' font-weight='700' fill='#64748b'>" +
        safeLabelText +
        '</text></svg>',
    );
  }
  return buildImagePlaceholderDataUri();
};

export default buildMarketingPlaceholderUri;
