import insertSymbolInstance from './insertSymbolInstance.js';
import listSymbolInstancesOnPage from './listSymbolInstancesOnPage.js';

const insertSymbolOnEveryPage = (editor, symbolId, insertOptions = {}) => {
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  let insertedCount = 0;
  pageList.forEach((sitePage) => {
    if (listSymbolInstancesOnPage(sitePage, symbolId).length) return;
    if (insertSymbolInstance(editor, symbolId, sitePage, insertOptions)) insertedCount += 1;
  });
  return insertedCount;
};

export default insertSymbolOnEveryPage;
