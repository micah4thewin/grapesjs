import findChildByTagName from './findChildByTagName.js';

const readSocialProfileRecords = (socialLinksComponent) => {
  if (!socialLinksComponent || typeof socialLinksComponent.components !== 'function') return [];
  return socialLinksComponent.components().models.map((itemComponent) => {
    const linkComponent = findChildByTagName(itemComponent, 'a') || itemComponent;
    const attributeRecord = linkComponent.getAttributes ? linkComponent.getAttributes() || {} : {};
    return {
      itemComponent,
      linkComponent,
      networkName: String(attributeRecord['data-db-network'] || ''),
      linkHref: String(attributeRecord.href || ''),
    };
  });
};

export default readSocialProfileRecords;
