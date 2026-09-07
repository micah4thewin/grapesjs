import countScriptTags from './countScriptTags.js';
import parseOriginAllowlist from './parseOriginAllowlist.js';
import sanitizeCodeSlotMarkup from './sanitizeCodeSlotMarkup.js';
import showToastNotice from '../support/showToastNotice.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const slotNames = ['headHtml', 'bodyStartHtml', 'bodyEndHtml'];

const saveCustomCodeSettings = (editor, formValues) => {
  let removedScriptCount = 0;
  const resolveSlotValue = (slotValue) => {
    if (formValues.allowScripts) return String(slotValue || '');
    removedScriptCount += countScriptTags(slotValue);
    return sanitizeCodeSlotMarkup(slotValue);
  };
  const customCodeRecord = {
    allowScripts: formValues.allowScripts === true,
    scriptOriginAllowlist: parseOriginAllowlist(formValues.scriptOriginAllowlistText),
  };
  slotNames.forEach((slotName) => {
    customCodeRecord[slotName] = resolveSlotValue(formValues[slotName]);
  });
  const savedRecord = updateSiteMetaRecord(editor, { customCode: customCodeRecord });
  editor.trigger('db:custom-code:update', savedRecord.customCode);
  if (removedScriptCount > 0) {
    const tagLabel = removedScriptCount === 1 ? 'script tag was' : 'script tags were';
    showToastNotice(editor, removedScriptCount + ' ' + tagLabel + ' removed because Allow script tags is off.', {
      kind: 'warning',
      duration: 6000,
    });
  }
  return savedRecord.customCode;
};

export default saveCustomCodeSettings;
