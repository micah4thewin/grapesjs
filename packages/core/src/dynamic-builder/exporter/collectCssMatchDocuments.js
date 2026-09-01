const collectCssMatchDocuments = (editor, page) => {
  if (typeof DOMParser === 'undefined') return null;
  const targetPages = page ? [page] : editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  if (!targetPages.length) return null;
  const markupParser = new DOMParser();
  const matchDocuments = [];
  for (const targetPage of targetPages) {
    const mainComponent = targetPage.getMainComponent && targetPage.getMainComponent();
    if (!mainComponent) return null;
    try {
      const pageMarkup = String(editor.getHtml({ component: mainComponent }) || '');
      matchDocuments.push(markupParser.parseFromString(pageMarkup, 'text/html'));
    } catch (parseError) {
      return null;
    }
  }
  return matchDocuments;
};

export default collectCssMatchDocuments;
