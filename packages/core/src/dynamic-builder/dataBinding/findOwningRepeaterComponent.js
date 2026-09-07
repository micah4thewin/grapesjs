const findOwningRepeaterComponent = (component) => {
  let currentComponent = component;
  while (currentComponent && typeof currentComponent.get === 'function') {
    if (currentComponent.get('type') === 'db-repeater') return currentComponent;
    currentComponent = currentComponent.parent ? currentComponent.parent() : null;
  }
  return null;
};

export default findOwningRepeaterComponent;
