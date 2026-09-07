const serializePageComponents = (sitePage) => {
  const mainComponent = sitePage && sitePage.getMainComponent ? sitePage.getMainComponent() : null;
  if (!mainComponent || !mainComponent.components) return [];
  return mainComponent.components().map((childComponent) => childComponent.toJSON());
};

export default serializePageComponents;
