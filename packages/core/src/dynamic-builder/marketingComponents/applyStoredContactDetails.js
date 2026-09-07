import getSiteMetaRecord from '../support/getSiteMetaRecord.js';

const applyStoredContactDetails = (editor, contactComponent) => {
  if (!editor || !contactComponent || !contactComponent.addAttributes) return;
  const storedRecord = getSiteMetaRecord(editor).contact || {};
  const attributePatch = {};
  if (storedRecord.address) attributePatch['data-db-address'] = String(storedRecord.address);
  if (storedRecord.phone) attributePatch['data-db-phone'] = String(storedRecord.phone);
  if (storedRecord.email) attributePatch['data-db-email'] = String(storedRecord.email);
  if (Object.keys(attributePatch).length) contactComponent.addAttributes(attributePatch);
};

export default applyStoredContactDetails;
