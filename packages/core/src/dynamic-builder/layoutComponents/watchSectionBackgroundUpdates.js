import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const watchSectionBackgroundUpdates = (editor) => {
  editor.on('component:update:attributes:data-db-bg-image', (component) => {
    if (!component || !component.is || !component.is('db-section')) return;
    const safeUrl = sanitizeUrlValue(component.getAttributes()['data-db-bg-image']);
    if (safeUrl) {
      const escapedUrl = safeUrl.split('"').join('%22').split('\n').join('');
      component.addStyle({ '--db-section-bg-image': `url("${escapedUrl}")` });
      component.addAttributes({ 'data-db-has-bg': 'true' });
    } else {
      component.addStyle({ '--db-section-bg-image': 'none' });
      component.removeAttributes(['data-db-has-bg']);
    }
  });
};

export default watchSectionBackgroundUpdates;
