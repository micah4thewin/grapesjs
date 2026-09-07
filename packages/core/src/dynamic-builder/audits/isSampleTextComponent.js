import collectComponentPlainText from '../schema/collectComponentPlainText.js';

const isSampleTextComponent = (component) => {
  const componentAttributes = component.getAttributes ? component.getAttributes() : {};
  const markerValue = componentAttributes['data-db-placeholder'];
  if (markerValue !== undefined && markerValue !== false && markerValue !== 'false' && markerValue !== '') return true;
  const childComponents = component.components ? component.components() : null;
  const hasElementChildren = Boolean(
    childComponents && childComponents.some((childComponent) => childComponent.get('type') !== 'textnode'),
  );
  if (hasElementChildren) return false;
  return /lorem ipsum/i.test(collectComponentPlainText(component));
};

export default isSampleTextComponent;
