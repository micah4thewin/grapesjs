import countDataSourceUsages from './countDataSourceUsages.js';
import getDataSourceRegistry from './getDataSourceRegistry.js';
import listDataSourceNames from './listDataSourceNames.js';

const createDataSourcesEditorState = (editor) => {
  const registryRecord = getDataSourceRegistry(editor);
  return {
    entries: listDataSourceNames(editor).map((sourceName) => ({
      name: sourceName,
      value: JSON.parse(JSON.stringify(registryRecord[sourceName])),
      mode: 'table',
      jsonText: '',
      jsonError: '',
      pasteOpen: false,
    })),
    deletedNames: new Set(),
    usage: countDataSourceUsages(editor),
    dirty: false,
    finished: false,
    previewTimer: null,
  };
};

export default createDataSourcesEditorState;
