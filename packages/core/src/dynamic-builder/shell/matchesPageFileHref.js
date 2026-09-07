const matchesPageFileHref = (hrefValue, baseName) => {
  if (!baseName) return false;
  const normalizedHref = String(hrefValue || '')
    .trim()
    .replace(/^\.\//, '')
    .replace(/^\//, '');
  const fileName = `${baseName}.html`;
  if (normalizedHref === fileName) return true;
  return normalizedHref.indexOf(`${fileName}#`) === 0 || normalizedHref.indexOf(`${fileName}?`) === 0;
};

export default matchesPageFileHref;
