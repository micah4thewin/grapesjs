import getDataSourceRegistry from './getDataSourceRegistry.js';

const listDataSourceNames = (editor) => {
  if (!editor || typeof editor.getModel !== 'function') return [];
  return Object.keys(getDataSourceRegistry(editor)).sort((firstName, secondName) =>
    firstName.localeCompare(secondName, undefined, { sensitivity: 'base' }),
  );
};

export default listDataSourceNames;
