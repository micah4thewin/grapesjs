import escapeHtmlText from '../support/escapeHtmlText.js';
import findDescendantWithAttribute from './findDescendantWithAttribute.js';

const watchMapAddressUpdates = (editor) => {
  editor.on('component:update:attributes:data-db-address', (component) => {
    if (!component || !component.is || !component.is('db-map')) return;
    const addressComponent = findDescendantWithAttribute(component, 'data-db-map-address');
    if (!addressComponent) return;
    addressComponent.components(escapeHtmlText(String(component.getAttributes()['data-db-address'] || '')));
  });
};

export default watchMapAddressUpdates;
