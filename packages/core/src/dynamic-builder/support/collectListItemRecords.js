import resolveListContainerComponent from './resolveListContainerComponent.js';

const collectListItemRecords = (rootComponent, listSelector) => {
  const listComponent = resolveListContainerComponent(rootComponent, listSelector);
  if (!listComponent || !listComponent.components) return [];
  return listComponent.components().models.map((itemComponent) => {
    const linkComponent = (itemComponent.find && itemComponent.find('a')[0]) || itemComponent;
    return {
      itemComponent,
      linkComponent,
      labelText: String(linkComponent.getInnerHTML ? linkComponent.getInnerHTML() : '').trim(),
      linkHref: String((linkComponent.getAttributes && linkComponent.getAttributes().href) || ''),
    };
  });
};

export default collectListItemRecords;
