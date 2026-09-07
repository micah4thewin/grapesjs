import findDescendantByField from './findDescendantByField.js';

const writePortraitAlt = (rootComponent, nameText) => {
  const portraitComponent = findDescendantByField(rootComponent, 'portrait');
  const safeName = String(nameText || '').trim();
  if (!portraitComponent || !safeName) return;
  const nextAlt = 'Portrait of ' + safeName;
  if (portraitComponent.getAttributes().alt !== nextAlt) portraitComponent.addAttributes({ alt: nextAlt });
};

export default writePortraitAlt;
