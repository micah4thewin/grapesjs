import buildRepeaterDefaultChildren from './buildRepeaterDefaultChildren.js';

const restoreRepeaterTemplate = (editor, repeaterComponent) => {
  if (!repeaterComponent || typeof repeaterComponent.append !== 'function') return null;
  const appendedComponents = repeaterComponent.append(buildRepeaterDefaultChildren(), { at: 0 }) || [];
  const templateComponent = appendedComponents[0] || null;
  if (templateComponent && editor.select) editor.select(templateComponent);
  return templateComponent;
};

export default restoreRepeaterTemplate;
