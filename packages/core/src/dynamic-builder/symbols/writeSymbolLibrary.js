import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import getSymbolLibraryModel from './getSymbolLibraryModel.js';
import replaceSiteMetaRecord from '../support/replaceSiteMetaRecord.js';

const writeSymbolLibrary = (editor, nextLibrary) => {
  const libraryModel = getSymbolLibraryModel(editor);
  if (libraryModel) libraryModel.set('library', nextLibrary, { dbSymbolWrite: true });
  const nextMeta = { ...getSiteMetaRecord(editor), symbols: nextLibrary };
  replaceSiteMetaRecord(editor, nextMeta);
  editor.trigger('db:symbols:update', nextLibrary);
  return nextLibrary;
};

export default writeSymbolLibrary;
