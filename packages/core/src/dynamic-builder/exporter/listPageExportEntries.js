import resolvePageFileBaseName from './resolvePageFileBaseName.js';

const listPageExportEntries = (editor) => {
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  const usedNames = [];
  return pageList.map((sitePage) => {
    const preferredName = resolvePageFileBaseName(editor, sitePage);
    let uniqueName = preferredName;
    let nameSuffix = 2;
    while (usedNames.includes(uniqueName)) {
      uniqueName = preferredName + '-' + nameSuffix;
      nameSuffix += 1;
    }
    usedNames.push(uniqueName);
    return {
      page: sitePage,
      pageId: String(sitePage.getId ? sitePage.getId() : sitePage.id || ''),
      pageName: (sitePage.getName ? sitePage.getName() : '') || uniqueName,
      fileName: uniqueName + '.html',
    };
  });
};

export default listPageExportEntries;
