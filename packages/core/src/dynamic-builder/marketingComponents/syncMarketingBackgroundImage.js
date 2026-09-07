import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const syncMarketingBackgroundImage = (component) => {
  if (!component || !component.getAttributes) return;
  const attributeRecord = component.getAttributes();
  const safeUrl = sanitizeUrlValue(attributeRecord['data-db-bg-image']);
  const currentStyle = component.getStyle ? component.getStyle() : {};
  const currentValue = String(currentStyle['--db-section-bg-image'] || '');
  const nextValue = safeUrl ? 'url("' + safeUrl.split('"').join('%22').split('\n').join('') + '")' : 'none';
  if (currentValue !== nextValue && (safeUrl || currentValue))
    component.addStyle({ '--db-section-bg-image': nextValue });
  const currentLook = String(attributeRecord['data-db-theme'] || 'default');
  const keepsOwnLook = currentLook === 'dark' || currentLook === 'brand' || currentLook === 'photo';
  if (safeUrl && !keepsOwnLook) component.addAttributes({ 'data-db-theme': 'photo' });
};

export default syncMarketingBackgroundImage;
