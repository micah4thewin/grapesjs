const getPageDisplayName = (pageModel) => {
  if (!pageModel) return 'Home';
  const pageName = String(pageModel.getName() || '').trim();
  return pageName || 'Home';
};

export default getPageDisplayName;
