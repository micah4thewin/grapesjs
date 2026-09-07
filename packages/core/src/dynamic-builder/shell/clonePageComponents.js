const clonePageComponents = (sitePage) => {
  const mainComponent = sitePage && sitePage.getMainComponent ? sitePage.getMainComponent() : null;
  if (!mainComponent || !mainComponent.components) return [];
  return mainComponent
    .components()
    .map((childComponent) => (childComponent.clone ? childComponent.clone() : null))
    .filter(Boolean);
};

export default clonePageComponents;
