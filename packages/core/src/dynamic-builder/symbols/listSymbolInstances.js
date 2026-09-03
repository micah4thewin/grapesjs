import listSymbolInstancesOnPage from './listSymbolInstancesOnPage.js';

const listSymbolInstances = (editor, symbolId) => {
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  return pageList.reduce(
    (collectedInstances, sitePage) => collectedInstances.concat(listSymbolInstancesOnPage(sitePage, symbolId)),
    [],
  );
};

export default listSymbolInstances;
