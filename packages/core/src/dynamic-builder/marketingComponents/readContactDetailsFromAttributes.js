const readContactDetailsFromAttributes = (contactComponent) => {
  const attributeRecord = contactComponent && contactComponent.getAttributes ? contactComponent.getAttributes() : {};
  return {
    address: String(attributeRecord['data-db-address'] || '').trim(),
    phone: String(attributeRecord['data-db-phone'] || '').trim(),
    email: String(attributeRecord['data-db-email'] || '').trim(),
  };
};

export default readContactDetailsFromAttributes;
