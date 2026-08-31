const spliceBodyEdgeMarkup = (bodyMarkup, startMarkup, endMarkup) => {
  const sourceMarkup = String(bodyMarkup == null ? '' : bodyMarkup);
  const lowerMarkup = sourceMarkup.toLowerCase();
  const openTagStart = lowerMarkup.indexOf('<body');
  const closeTagStart = lowerMarkup.lastIndexOf('</body>');
  const openTagEnd = openTagStart === 0 ? sourceMarkup.indexOf('>', openTagStart) + 1 : 0;
  if (openTagEnd < 1 || closeTagStart < openTagEnd) {
    return ['<body>', startMarkup, sourceMarkup, endMarkup, '</body>'].filter(Boolean).join('\n');
  }
  const openTagMarkup = sourceMarkup.slice(0, openTagEnd);
  const innerMarkup = sourceMarkup.slice(openTagEnd, closeTagStart);
  return [openTagMarkup, startMarkup, innerMarkup, endMarkup, '</body>'].filter(Boolean).join('\n');
};

export default spliceBodyEdgeMarkup;
