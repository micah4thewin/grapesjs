import refreshDataSourceRegistry from './refreshDataSourceRegistry.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const updateDataSourceRegistry = (editor, sourcesPatch) => {
  updateSiteMetaRecord(editor, { dataSources: sourcesPatch || {} });
  return refreshDataSourceRegistry(editor);
};

export default updateDataSourceRegistry;
