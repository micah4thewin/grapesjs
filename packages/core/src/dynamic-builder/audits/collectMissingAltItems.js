import createPreflightItem from './createPreflightItem.js';
import describeAuditComponent from './describeAuditComponent.js';
import walkSitePageComponents from './walkSitePageComponents.js';

const collectMissingAltItems = (editor) => {
  const items = [];
  walkSitePageComponents(editor, (component, page) => {
    if (String(component.get('tagName') || '').toLowerCase() !== 'img') return;
    const componentAttributes = component.getAttributes ? component.getAttributes() : {};
    const altValue = componentAttributes.alt;
    const sourceValue = String(componentAttributes.src || '');
    if (/^data:image\/svg\+xml/i.test(sourceValue) && /placeholder/i.test(String(altValue || ''))) {
      items.push(
        createPreflightItem(
          'warning',
          'Images',
          describeAuditComponent(component) + ' still shows the placeholder picture.',
          'Choose a real picture in the image settings.',
          component,
          page,
          'image-source',
        ),
      );
      return;
    }
    if (altValue !== undefined && altValue !== null) return;
    items.push(
      createPreflightItem(
        'warning',
        'Images',
        describeAuditComponent(component) + ' has no alt text.',
        'Describe what the picture shows, or mark it decorative in the image settings.',
        component,
        page,
        'alt-text',
      ),
    );
  });
  return items;
};

export default collectMissingAltItems;
