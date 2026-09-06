import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import replaceSiteMetaRecord from '../support/replaceSiteMetaRecord.js';

const writeSymbolLibrary = (editor, nextLibrary) => {
  const nextMeta = { ...getSiteMetaRecord(editor), symbols: nextLibrary };
  replaceSiteMetaRecord(editor, nextMeta);
  editor.trigger('db:symbols:update', nextLibrary);
  return nextLibrary;
};

export default writeSymbolLibrary;
