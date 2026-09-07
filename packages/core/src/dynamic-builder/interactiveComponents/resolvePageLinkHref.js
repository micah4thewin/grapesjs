const resolvePageLinkHref = (pathEntry) =>
  !pathEntry || pathEntry.isMainPage ? 'index.html' : String(pathEntry.baseName || 'page') + '.html';

export default resolvePageLinkHref;
