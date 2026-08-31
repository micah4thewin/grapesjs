const buildImagePlaceholderDataUri = (backgroundFill) => {
  const fillColor = backgroundFill || '#e2e8f0';
  const strokeColor = '#94a3b8';
  const strokeStyle = "fill='none' stroke='" + strokeColor + "' stroke-width='10'";
  const svgMarkup =
    "<svg xmlns='http://www.w3.org/2000/svg' width='640' height='400' viewBox='0 0 640 400'>" +
    "<rect width='640' height='400' fill='" +
    fillColor +
    "'/>" +
    "<circle cx='250' cy='150' r='34' " +
    strokeStyle +
    '/>' +
    "<path d='M140 300 L260 210 L360 280 L440 220 L520 300' " +
    strokeStyle +
    " stroke-linecap='round' stroke-linejoin='round'/>" +
    '</svg>';
  return 'data:image/svg+xml,' + encodeURIComponent(svgMarkup);
};

export default buildImagePlaceholderDataUri;
