import resolveListContainerComponent from './resolveListContainerComponent.js';

const appendListItemMarkup = (rootComponent, listSelector, itemMarkup) => {
  const listComponent = resolveListContainerComponent(rootComponent, listSelector);
  if (listComponent && listComponent.append) listComponent.append(itemMarkup);
};

export default appendListItemMarkup;
