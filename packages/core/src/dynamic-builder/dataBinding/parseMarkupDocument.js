const parseMarkupDocument = (htmlString) => {
  if (typeof DOMParser === 'undefined') return null;
  try {
    return new DOMParser().parseFromString(String(htmlString == null ? '' : htmlString), 'text/html');
  } catch {
    return null;
  }
};

export default parseMarkupDocument;
