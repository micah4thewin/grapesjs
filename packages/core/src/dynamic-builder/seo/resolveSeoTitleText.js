const resolveSeoTitleText = (siteSeoRecord, pageSeoRecord, pageName) => {
  const baseTitle = String(pageSeoRecord.title || pageName || siteSeoRecord.siteName || 'Home').trim();
  const titleTemplate = String(siteSeoRecord.titleTemplate || '');
  if (titleTemplate.includes('%s')) return titleTemplate.split('%s').join(baseTitle).trim();
  const siteName = String(siteSeoRecord.siteName || '').trim();
  if (siteName && baseTitle !== siteName) return baseTitle + ' | ' + siteName;
  return baseTitle;
};

export default resolveSeoTitleText;
