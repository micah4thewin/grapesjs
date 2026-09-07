import getSymbolRecord from './getSymbolRecord.js';
import insertSymbolInstance from './insertSymbolInstance.js';
import listSymbolInstancesOnPage from './listSymbolInstancesOnPage.js';
import resolveSymbolInsertPlacement from './resolveSymbolInsertPlacement.js';

const insertSymbolOnEveryPage = (editor, symbolId, insertOptions = {}) => {
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  const placement =
    insertOptions.placement ||
    (insertOptions.atTop ? 'top' : resolveSymbolInsertPlacement(editor, getSymbolRecord(editor, symbolId)));
  let insertedCount = 0;
  pageList.forEach((sitePage) => {
    if (listSymbolInstancesOnPage(sitePage, symbolId).length) return;
    if (insertSymbolInstance(editor, symbolId, sitePage, { placement })) insertedCount += 1;
  });
  return insertedCount;
};

export default insertSymbolOnEveryPage;
