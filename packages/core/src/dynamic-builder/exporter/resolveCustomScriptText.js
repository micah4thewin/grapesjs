import collectCustomScriptText from './collectCustomScriptText.js';
import getSiteCustomCodeRecord from './getSiteCustomCodeRecord.js';

const resolveCustomScriptText = (editor, buildOptions) => {
  const optionsRecord = buildOptions || {};
  if (!getSiteCustomCodeRecord(editor).allowScripts) return '';
  if (optionsRecord.includeCustomScripts === false) return '';
  return collectCustomScriptText(editor);
};

export default resolveCustomScriptText;
