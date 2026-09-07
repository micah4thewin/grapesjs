import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const saveContactDetailsToSiteMeta = (editor, contactRecord) => {
  if (!editor || !editor.getModel) return;
  const storedRecord = getSiteMetaRecord(editor).contact || {};
  const fieldNames = ['address', 'phone', 'email'];
  const hasChanges = fieldNames.some((fieldName) => String(storedRecord[fieldName] || '') !== contactRecord[fieldName]);
  if (!hasChanges) return;
  updateSiteMetaRecord(editor, {
    contact: { address: contactRecord.address, phone: contactRecord.phone, email: contactRecord.email },
  });
};

export default saveContactDetailsToSiteMeta;
