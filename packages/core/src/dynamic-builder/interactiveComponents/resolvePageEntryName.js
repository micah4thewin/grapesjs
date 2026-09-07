const resolvePageEntryName = (pathEntry) => {
  const sitePage = pathEntry && pathEntry.page;
  const pageName = sitePage && typeof sitePage.getName === 'function' ? String(sitePage.getName() || '').trim() : '';
  return pageName || (pathEntry && pathEntry.isMainPage ? 'Home' : 'Page');
};

export default resolvePageEntryName;
