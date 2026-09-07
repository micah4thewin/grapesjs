import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';
import markEditorChanged from '../support/markEditorChanged.js';

const writeDataSourcesSiteMeta = (editor, sourcesRecord) => {
  const nextMeta = { ...getSiteMetaRecord(editor), dataSources: isPlainRecord(sourcesRecord) ? sourcesRecord : {} };
  editor.getModel().set('dbSiteMeta', nextMeta);
  markEditorChanged(editor, { siteMeta: nextMeta });
  editor.trigger('db:site-meta:update', nextMeta);
  return nextMeta;
};

export default writeDataSourcesSiteMeta;
