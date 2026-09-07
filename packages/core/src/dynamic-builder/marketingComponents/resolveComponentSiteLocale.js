const resolveComponentSiteLocale = (component) => {
  const editorModel = component && component.em;
  const siteMetaRecord = editorModel && editorModel.get ? editorModel.get('dbSiteMeta') : null;
  const seoRecord = siteMetaRecord && siteMetaRecord.seo ? siteMetaRecord.seo : {};
  return String(seoRecord.language || '').trim();
};

export default resolveComponentSiteLocale;
