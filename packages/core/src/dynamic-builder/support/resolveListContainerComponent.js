const resolveListContainerComponent = (rootComponent, listSelector) => {
  if (!rootComponent || !rootComponent.find) return null;
  if (!listSelector) return rootComponent;
  return rootComponent.find(listSelector)[0] || null;
};

export default resolveListContainerComponent;
