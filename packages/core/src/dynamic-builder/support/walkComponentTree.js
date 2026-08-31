const walkComponentTree = (rootComponent, visitComponent) => {
  if (!rootComponent) return;
  visitComponent(rootComponent);
  const childComponents = rootComponent.components ? rootComponent.components() : null;
  childComponents && childComponents.forEach((childComponent) => walkComponentTree(childComponent, visitComponent));
};

export default walkComponentTree;
