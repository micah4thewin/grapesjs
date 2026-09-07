const parseSvgRootElement = (svgMarkup) => {
  if (typeof DOMParser === 'undefined') return null;
  const parsedDocument = new DOMParser().parseFromString(String(svgMarkup || ''), 'image/svg+xml');
  const rootElement = parsedDocument.documentElement;
  if (!rootElement || String(rootElement.localName || '').toLowerCase() !== 'svg') return null;
  if (parsedDocument.getElementsByTagName('parsererror').length) return null;
  return rootElement;
};

export default parseSvgRootElement;
