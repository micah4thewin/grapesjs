const imageComponentTypes = ['image', 'db-image'];

const getOverridableLeafKind = (component) => {
  if (!component || typeof component.get !== 'function') return '';
  const componentType = String(component.get('type') || '');
  if (componentType === 'db-symbol' || componentType === 'textnode') return '';
  if (imageComponentTypes.indexOf(componentType) >= 0 || component.get('tagName') === 'img') return 'image';
  if (typeof component.isInstanceOf === 'function' && component.em && component.isInstanceOf('text')) return 'text';
  return '';
};

export default getOverridableLeafKind;
