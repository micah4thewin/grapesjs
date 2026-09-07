import isPlainRecord from '../support/isPlainRecord.js';

const getSeoModuleOptions = (editor) => {
  const storedOptions = editor && editor.getModel ? editor.getModel().get('dbSeoOptions') : null;
  return isPlainRecord(storedOptions) ? storedOptions : {};
};

export default getSeoModuleOptions;
