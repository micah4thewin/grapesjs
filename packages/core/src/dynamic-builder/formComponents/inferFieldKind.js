import findFieldControlComponent from './findFieldControlComponent.js';

const inferFieldKind = (fieldComponent) => {
  const controlComponent = findFieldControlComponent(fieldComponent);
  if (!controlComponent) return 'text';
  const tagName = String(controlComponent.get('tagName') || '').toLowerCase();
  if (tagName === 'textarea') return 'textarea';
  if (tagName === 'select') return 'select';
  const inputType = String(controlComponent.getAttributes().type || 'text');
  if (inputType === 'file') return 'file';
  return ['email', 'tel', 'number', 'date'].indexOf(inputType) >= 0 ? inputType : 'text';
};

export default inferFieldKind;
