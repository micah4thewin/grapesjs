import collectComponentPlainText from '../schema/collectComponentPlainText.js';
import resolveListContainerComponent from '../support/resolveListContainerComponent.js';

const collectListRowRecords = (rootComponent, listSelector) => {
  const listComponent = resolveListContainerComponent(rootComponent, listSelector);
  if (!listComponent || !listComponent.components) return [];
  return listComponent.components().models.map((itemComponent) => {
    const linkComponent = (itemComponent.find && itemComponent.find('a')[0]) || itemComponent;
    const attributeRecord = linkComponent.getAttributes ? linkComponent.getAttributes() : {};
    return {
      itemComponent,
      linkComponent,
      labelText: collectComponentPlainText(linkComponent),
      linkHref: String(attributeRecord.href || ''),
      networkName: String(attributeRecord['data-db-network'] || ''),
    };
  });
};

export default collectListRowRecords;
