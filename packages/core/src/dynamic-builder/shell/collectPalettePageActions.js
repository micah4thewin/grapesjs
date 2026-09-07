import getPageDisplayName from './getPageDisplayName.js';

const collectPalettePageActions = (editor) => {
  const selectedPage = editor.Pages.getSelected ? editor.Pages.getSelected() : null;
  return editor.Pages.getAll().map((pageModel) => {
    const pageId = pageModel.getId();
    return {
      actionId: `page:${pageId}`,
      groupTitle: 'Pages',
      label: `Switch page: ${getPageDisplayName(pageModel)}`,
      iconName: 'webpage',
      keywords: `page navigate switch open ${pageId}`,
      keysText: '',
      hintText: selectedPage === pageModel ? 'Current' : '',
      runAction: () => editor.Pages.select(pageId),
    };
  });
};

export default collectPalettePageActions;
