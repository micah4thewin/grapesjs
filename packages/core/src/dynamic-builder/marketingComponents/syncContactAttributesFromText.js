import readContactDetailsFromText from './readContactDetailsFromText.js';

const syncContactAttributesFromText = (contactComponent) => {
  if (!contactComponent || !contactComponent.addAttributes) return;
  const textRecord = readContactDetailsFromText(contactComponent);
  const attributePatch = {};
  if (textRecord.address) attributePatch['data-db-address'] = textRecord.address;
  if (textRecord.phone) attributePatch['data-db-phone'] = textRecord.phone;
  if (textRecord.email) attributePatch['data-db-email'] = textRecord.email;
  if (Object.keys(attributePatch).length) contactComponent.addAttributes(attributePatch);
};

export default syncContactAttributesFromText;
