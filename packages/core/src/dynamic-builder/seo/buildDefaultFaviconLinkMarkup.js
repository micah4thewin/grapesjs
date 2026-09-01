const buildDefaultFaviconLinkMarkup = () => {
  const svgMarkupParts = [
    '%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E',
    '%3Crect width=%2732%27 height=%2732%27 rx=%277%27 fill=%27%23232a33%27/%3E',
    '%3Ccircle cx=%2716%27 cy=%2716%27 r=%277.5%27 fill=%27%23d98a5f%27/%3E',
    '%3C/svg%3E',
  ];
  const faviconDataUri = 'data:image/svg+xml,' + svgMarkupParts.join('');
  return '<link rel="icon" type="image/svg+xml" href="' + faviconDataUri + '">';
};

export default buildDefaultFaviconLinkMarkup;
