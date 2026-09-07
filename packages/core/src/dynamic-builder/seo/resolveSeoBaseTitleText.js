const resolveSeoBaseTitleText = (siteSeoRecord, pageSeoRecord, pageName) =>
  String(pageSeoRecord.title || pageName || siteSeoRecord.siteName || 'Home').trim();

export default resolveSeoBaseTitleText;
