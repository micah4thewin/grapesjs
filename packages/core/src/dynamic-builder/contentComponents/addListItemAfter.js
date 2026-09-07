import buildListItemComponents from './buildListItemComponents.js';

const addListItemAfter = (referenceComponent, itemHtml = '') => {
  if (!referenceComponent || !referenceComponent.is) return null;
  const isList = referenceComponent.is('db-list');
  const listComponent = isList ? referenceComponent : referenceComponent.parent && referenceComponent.parent();
  if (!listComponent || !listComponent.components) return null;
  const insertIndex = isList ? listComponent.components().length : referenceComponent.index() + 1;
  const [itemDefinition] = buildListItemComponents(['']);
  const [addedItem] = listComponent.append({ ...itemDefinition, components: itemHtml }, { at: insertIndex });
  return addedItem || null;
};

export default addListItemAfter;
