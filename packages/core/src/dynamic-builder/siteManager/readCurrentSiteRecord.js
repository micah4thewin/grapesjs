import isPlainRecord from '../support/isPlainRecord.js';

const readCurrentSiteRecord = (editor) => {
  const editorModel = editor && typeof editor.getModel === 'function' ? editor.getModel() : null;
  const siteRecord = editorModel && typeof editorModel.get === 'function' ? editorModel.get('dbCurrentSite') : null;
  return isPlainRecord(siteRecord) ? siteRecord : null;
};

export default readCurrentSiteRecord;
