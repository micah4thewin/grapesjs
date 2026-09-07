import getSiteCustomCodeRecord from '../exporter/getSiteCustomCodeRecord.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const resolveCustomCodeSettings = (editor, moduleOptions) => {
  const storedRecord = getSiteMetaRecord(editor).customCode;
  const optionRecord = isPlainRecord(moduleOptions) ? moduleOptions : {};
  const hasStoredChoice = isPlainRecord(storedRecord) && storedRecord.allowScripts !== undefined;
  return {
    ...getSiteCustomCodeRecord(editor),
    allowScripts: hasStoredChoice ? storedRecord.allowScripts === true : optionRecord.allowScripts === true,
  };
};

export default resolveCustomCodeSettings;
