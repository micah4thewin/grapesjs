import createPreflightItem from './createPreflightItem.js';
import describeAuditComponent from './describeAuditComponent.js';
import walkSitePageComponents from './walkSitePageComponents.js';

const collectUnconnectedFormItems = (editor) => {
  const items = [];
  walkSitePageComponents(editor, (component, page) => {
    if (String(component.get('tagName') || '').toLowerCase() !== 'form') return;
    const componentAttributes = component.getAttributes ? component.getAttributes() : {};
    if (String(componentAttributes.action || '').trim()) return;
    items.push(
      createPreflightItem(
        'warning',
        'Forms',
        describeAuditComponent(component) + ' is not connected, so submissions go nowhere.',
        'Choose where to send submissions in the form settings, for example a form service address.',
        component,
        page,
        'form-action',
      ),
    );
  });
  return items;
};

export default collectUnconnectedFormItems;
