import createPreflightItem from './createPreflightItem.js';
import describeAuditComponent from './describeAuditComponent.js';
import isSampleTextComponent from './isSampleTextComponent.js';
import walkSitePageComponents from './walkSitePageComponents.js';

const collectPlaceholderTextItems = (editor) => {
  const items = [];
  walkSitePageComponents(editor, (component, page) => {
    if (component.get('type') === 'textnode' || !isSampleTextComponent(component)) return;
    items.push(
      createPreflightItem(
        'warning',
        'Content',
        describeAuditComponent(component) + ' still shows sample text.',
        'Replace it with your own words before the site goes live.',
        component,
        page,
        'edit-text',
      ),
    );
  });
  return items;
};

export default collectPlaceholderTextItems;
