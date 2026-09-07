const readMapZoomParameter = (linkText) => {
  const zoomMatch = String(linkText || '').match(/[?&#](?:z|zoom|lvl)=(\d+(?:\.\d+)?)/i);
  return zoomMatch ? zoomMatch[1] : '';
};

export default readMapZoomParameter;
