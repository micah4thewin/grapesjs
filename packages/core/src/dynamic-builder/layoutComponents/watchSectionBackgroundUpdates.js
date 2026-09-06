import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const watchSectionBackgroundUpdates = (editor) => {
  editor.on('component:update:attributes:data-db-bg-image', (component) => {
    if (!component || !component.is || !component.is('db-section')) return;
    const attributeRecord = component.getAttributes();
    const safeUrl = sanitizeUrlValue(attributeRecord['data-db-bg-image']);
    const currentStyle = component.getStyle ? component.getStyle() : {};
    const currentValue = String(currentStyle['--db-section-bg-image'] || '');
    if (safeUrl) {
      const escapedUrl = safeUrl.split('"').join('%22').split('\n').join('');
      const nextValue = `url("${escapedUrl}")`;
      if (currentValue === nextValue && attributeRecord['data-db-has-bg'] === 'true') return;
      component.addStyle({ '--db-section-bg-image': nextValue });
      component.addAttributes({ 'data-db-has-bg': 'true' });
      return;
    }
    if (!currentValue && !attributeRecord['data-db-has-bg']) return;
    if (currentValue !== 'none') component.addStyle({ '--db-section-bg-image': 'none' });
    if (attributeRecord['data-db-has-bg']) component.removeAttributes(['data-db-has-bg']);
  });
};

export default watchSectionBackgroundUpdates;
