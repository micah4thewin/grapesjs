const resolvePageDetails = (page) => {
  if (!page) return { pageId: '', pageName: '' };
  const pageName = page.getName ? String(page.getName() || '').trim() : '';
  return { pageId: page.getId ? String(page.getId()) : '', pageName: pageName || 'Home' };
};

export default resolvePageDetails;
