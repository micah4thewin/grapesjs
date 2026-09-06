import getSiteCustomCodeRecord from './getSiteCustomCodeRecord.js';

const readExportBuildOptions = (editor, rootElement) => {
  const readOptionFlag = (optionKey, fallbackFlag) => {
    const selectorText = '[data-db-export-option="' + optionKey + '"]';
    const inputElement = rootElement && rootElement.querySelector ? rootElement.querySelector(selectorText) : null;
    return inputElement ? !!inputElement.checked : fallbackFlag;
  };
  return {
    separateAssets: readOptionFlag('separateAssets', false),
    resolveBindings: readOptionFlag('resolveBindings', true),
    includeProjectBackup: readOptionFlag('includeProjectBackup', false),
    includeCustomScripts: getSiteCustomCodeRecord(editor).allowScripts,
  };
};

export default readExportBuildOptions;
