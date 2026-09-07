const resolvePageLevelAncestor = (component, rootComponent) => {
  let currentComponent = component;
  while (currentComponent && typeof currentComponent.parent === 'function') {
    const parentComponent = currentComponent.parent();
    if (!parentComponent) return null;
    if (parentComponent === rootComponent) return currentComponent;
    currentComponent = parentComponent;
  }
  return null;
};

export default resolvePageLevelAncestor;
