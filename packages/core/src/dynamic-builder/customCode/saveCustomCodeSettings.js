import parseOriginAllowlist from './parseOriginAllowlist.js';
import sanitizeHtmlMarkup from '../support/sanitizeHtmlMarkup.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const saveCustomCodeSettings = (editor, formValues) => {
  const resolveSlotValue = (slotValue) => {
    if (formValues.allowScripts) return String(slotValue || '');
    if (typeof DOMParser === 'undefined') return '';
    return sanitizeHtmlMarkup(slotValue, { allowIframes: true });
  };
  const savedRecord = updateSiteMetaRecord(editor, {
    customCode: {
      headHtml: resolveSlotValue(formValues.headHtml),
      bodyStartHtml: resolveSlotValue(formValues.bodyStartHtml),
      bodyEndHtml: resolveSlotValue(formValues.bodyEndHtml),
      allowScripts: formValues.allowScripts === true,
      scriptOriginAllowlist: parseOriginAllowlist(formValues.scriptOriginAllowlistText),
    },
  });
  editor.trigger('db:custom-code:update', savedRecord.customCode);
  return savedRecord.customCode;
};

export default saveCustomCodeSettings;
