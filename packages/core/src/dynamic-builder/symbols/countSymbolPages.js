import listSymbolInstancesOnPage from './listSymbolInstancesOnPage.js';

const countSymbolPages = (editor, symbolId) => {
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  return pageList.filter((sitePage) => listSymbolInstancesOnPage(sitePage, symbolId).length > 0).length;
};

export default countSymbolPages;
