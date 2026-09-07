const dropComponentAttributes = (component, attributeNames, options = {}) => {
  if (!component || !component.get || !component.setAttributes) return false;
  const rawAttributes = { ...(component.get('attributes') || {}) };
  const presentNames = attributeNames.filter((attributeName) => attributeName in rawAttributes);
  if (!presentNames.length) return false;
  presentNames.forEach((attributeName) => delete rawAttributes[attributeName]);
  component.setAttributes(rawAttributes, options);
  return true;
};

export default dropComponentAttributes;
