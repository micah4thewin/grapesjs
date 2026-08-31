const getPageMetaRecord = (editor, page) => {
  const targetPage = page || (editor.Pages && editor.Pages.getSelected && editor.Pages.getSelected());
  if (!targetPage) return {};
  return targetPage.get('dbPageMeta') || {};
};

export default getPageMetaRecord;
