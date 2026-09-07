import createPreflightItem from './createPreflightItem.js';
import describeAuditComponent from './describeAuditComponent.js';
import walkSitePageComponents from './walkSitePageComponents.js';

const collectPlaceholderLinkItems = (editor) => {
  const items = [];
  walkSitePageComponents(editor, (component, page) => {
    if (String(component.get('tagName') || '').toLowerCase() !== 'a') return;
    const componentAttributes = component.getAttributes ? component.getAttributes() : {};
    const hrefText = String(componentAttributes.href == null ? '' : componentAttributes.href).trim();
    if (hrefText && hrefText !== '#') return;
    items.push(
      createPreflightItem(
        'warning',
        'Links',
        describeAuditComponent(component) + (hrefText ? ' still points to "#".' : ' has nowhere to go.'),
        'Choose the page or paste the web address this link should open.',
        component,
        page,
        'link-href',
      ),
    );
  });
  return items;
};

export default collectPlaceholderLinkItems;
