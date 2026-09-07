const findRepeaterTemplateComponent = (repeaterComponent) => {
  const childComponents = repeaterComponent && repeaterComponent.components ? repeaterComponent.components() : null;
  if (!childComponents) return null;
  return (
    childComponents.find((childComponent) => Boolean(childComponent.getAttributes()['data-db-repeater-item'])) || null
  );
};

export default findRepeaterTemplateComponent;
