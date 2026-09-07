import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import getSymbolLibrary from './getSymbolLibrary.js';
import getSymbolLibraryModel from './getSymbolLibraryModel.js';
import renderChangedSymbolInstances from './renderChangedSymbolInstances.js';
import replaceSiteMetaRecord from '../support/replaceSiteMetaRecord.js';
import runSilentSymbolRender from './runSilentSymbolRender.js';

const watchSymbolLibraryHistory = (editor) => {
  const libraryModel = getSymbolLibraryModel(editor);
  if (!libraryModel) return;
  libraryModel.on('change:library', (changedModel, nextLibrary, changeOptions) => {
    if (changeOptions && changeOptions.dbSymbolWrite) return;
    replaceSiteMetaRecord(editor, { ...getSiteMetaRecord(editor), symbols: nextLibrary });
    renderChangedSymbolInstances(editor, changedModel.previous('library'), nextLibrary);
    editor.trigger('db:symbols:update', nextLibrary);
  });
  editor.on('db:site-meta:update', () => {
    const storedLibrary = getSymbolLibrary(editor);
    const trackedLibrary = libraryModel.get('library');
    if (JSON.stringify(storedLibrary) === JSON.stringify(trackedLibrary)) return;
    runSilentSymbolRender(editor, () => libraryModel.set('library', storedLibrary, { dbSymbolWrite: true }));
    renderChangedSymbolInstances(editor, trackedLibrary, storedLibrary);
    editor.trigger('db:symbols:update', storedLibrary);
  });
};

export default watchSymbolLibraryHistory;
