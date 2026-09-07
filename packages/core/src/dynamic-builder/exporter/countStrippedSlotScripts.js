import resolveExportSlotMarkup from './resolveExportSlotMarkup.js';

const countScriptTags = (markupText) => (String(markupText || '').match(/<script\b/gi) || []).length;

const countStrippedSlotScripts = (customCodeRecord) => {
  if (!customCodeRecord || customCodeRecord.allowScripts) return 0;
  return ['headHtml', 'bodyStartHtml', 'bodyEndHtml'].reduce((strippedCount, slotKey) => {
    const rawCount = countScriptTags(customCodeRecord[slotKey]);
    if (!rawCount) return strippedCount;
    const keptCount = countScriptTags(resolveExportSlotMarkup(customCodeRecord, customCodeRecord[slotKey]));
    return strippedCount + Math.max(0, rawCount - keptCount);
  }, 0);
};

export default countStrippedSlotScripts;
