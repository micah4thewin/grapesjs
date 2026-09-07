import insertSymbolInstance from '../symbols/insertSymbolInstance.js';
import listSymbolInstancesOnPage from '../symbols/listSymbolInstancesOnPage.js';
import splitHomeSymbolChildren from './splitHomeSymbolChildren.js';

const insertSharedSymbolsOnNewPage = (editor, addedPage) => {
  const homePage = editor.Pages.getMain();
  if (!addedPage || !homePage || homePage === addedPage) return 0;
  const { topSymbolIds, bottomSymbolIds } = splitHomeSymbolChildren(homePage);
  let insertedCount = 0;
  const insertMissingSymbol = (symbolId, insertOptions) => {
    if (listSymbolInstancesOnPage(addedPage, symbolId).length) return;
    if (insertSymbolInstance(editor, symbolId, addedPage, insertOptions)) insertedCount += 1;
  };
  topSymbolIds
    .slice()
    .reverse()
    .forEach((symbolId) => insertMissingSymbol(symbolId, { atTop: true }));
  bottomSymbolIds.forEach((symbolId) => insertMissingSymbol(symbolId, {}));
  return insertedCount;
};

export default insertSharedSymbolsOnNewPage;
