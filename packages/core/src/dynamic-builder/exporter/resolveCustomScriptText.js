import collectCustomScriptText from './collectCustomScriptText.js';
import getSiteCustomCodeRecord from './getSiteCustomCodeRecord.js';

const resolveCustomScriptText = (editor, buildOptions, page) => {
  const optionsRecord = buildOptions || {};
  if (!getSiteCustomCodeRecord(editor).allowScripts) return '';
  if (optionsRecord.includeCustomScripts === false) return '';
  return collectCustomScriptText(editor, page);
};

export default resolveCustomScriptText;
