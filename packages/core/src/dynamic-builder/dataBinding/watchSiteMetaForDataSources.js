import refreshDataSourceRegistry from './refreshDataSourceRegistry.js';

const watchSiteMetaForDataSources = (editor) => {
  editor.on('db:site-meta:update', () => refreshDataSourceRegistry(editor));
  editor.on('load', () => refreshDataSourceRegistry(editor));
};

export default watchSiteMetaForDataSources;
