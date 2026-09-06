import enforceScriptOriginAllowlist from '../customCode/enforceScriptOriginAllowlist.js';
import sanitizeCodeSlotMarkup from '../customCode/sanitizeCodeSlotMarkup.js';

const resolveExportSlotMarkup = (customCodeRecord, slotValue) => {
  const slotText = String(slotValue == null ? '' : slotValue).trim();
  if (!slotText) return '';
  if (customCodeRecord.allowScripts) {
    return enforceScriptOriginAllowlist(slotText, customCodeRecord.scriptOriginAllowlist).trim();
  }
  return sanitizeCodeSlotMarkup(slotText).trim();
};

export default resolveExportSlotMarkup;
