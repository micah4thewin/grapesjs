import escapeHtmlText from '../support/escapeHtmlText.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';
import findDescendantWithAttribute from './findDescendantWithAttribute.js';

const watchVideoFacadeUpdates = (editor) => {
  editor.on('component:update:attributes:data-db-poster', (component) => {
    if (!component || !component.is || !component.is('db-video')) return;
    const posterUrl = sanitizeUrlValue(component.getAttributes()['data-db-poster']);
    if (posterUrl) {
      const escapedUrl = posterUrl.split('"').join('%22').split('\n').join('');
      component.addStyle({ 'background-image': 'url("' + escapedUrl + '")' });
    } else {
      component.addStyle({ 'background-image': 'none' });
    }
  });
  editor.on('component:update:attributes:data-db-consent-note', (component) => {
    if (!component || !component.is || !component.is('db-video')) return;
    const noteComponent = findDescendantWithAttribute(component, 'data-db-video-note');
    if (!noteComponent) return;
    noteComponent.components(escapeHtmlText(String(component.getAttributes()['data-db-consent-note'] || '')));
  });
};

export default watchVideoFacadeUpdates;
