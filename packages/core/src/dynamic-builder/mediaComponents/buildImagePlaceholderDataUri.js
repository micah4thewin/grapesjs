const buildImagePlaceholderDataUri = () => {
  const strokeStyle = "fill='none' stroke='#94a3b8' stroke-width='10'";
  const svgMarkup =
    "<svg xmlns='http://www.w3.org/2000/svg' width='640' height='400' viewBox='0 0 640 400'>" +
    "<rect width='640' height='400' fill='#e2e8f0'/>" +
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
