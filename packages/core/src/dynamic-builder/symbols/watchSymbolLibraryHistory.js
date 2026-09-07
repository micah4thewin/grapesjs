import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import getSymbolLibrary from './getSymbolLibrary.js';
import getSymbolLibraryModel from './getSymbolLibraryModel.js';
import renderAllSymbolInstances from './renderAllSymbolInstances.js';
import replaceSiteMetaRecord from '../support/replaceSiteMetaRecord.js';
import runSilentSymbolRender from './runSilentSymbolRender.js';

const watchSymbolLibraryHistory = (editor) => {
  const libraryModel = getSymbolLibraryModel(editor);
  if (!libraryModel) return;
  libraryModel.on('change:library', (changedModel, nextLibrary, changeOptions) => {
    if (changeOptions && changeOptions.dbSymbolWrite) return;
    replaceSiteMetaRecord(editor, { ...getSiteMetaRecord(editor), symbols: nextLibrary });
    renderAllSymbolInstances(editor);
    editor.trigger('db:symbols:update', nextLibrary);
  });
  editor.on('db:site-meta:update', () => {
    const storedLibrary = getSymbolLibrary(editor);
    if (JSON.stringify(storedLibrary) === JSON.stringify(libraryModel.get('library'))) return;
    runSilentSymbolRender(editor, () => libraryModel.set('library', storedLibrary, { dbSymbolWrite: true }));
    renderAllSymbolInstances(editor);
    editor.trigger('db:symbols:update', storedLibrary);
  });
};

export default watchSymbolLibraryHistory;
