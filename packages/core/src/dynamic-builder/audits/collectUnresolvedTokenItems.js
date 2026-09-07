import collectComponentTokenPaths from './collectComponentTokenPaths.js';
import createPreflightItem from './createPreflightItem.js';
import describeAuditComponent from './describeAuditComponent.js';
import getDataSourceRegistry from '../dataBinding/getDataSourceRegistry.js';
import resolveBindingPath from '../dataBinding/resolveBindingPath.js';
import walkSitePageComponents from './walkSitePageComponents.js';

const hasRepeaterAncestor = (component) => {
  let currentComponent = component;
  while (currentComponent) {
    const componentAttributes = currentComponent.getAttributes ? currentComponent.getAttributes() : {};
    if (componentAttributes['data-db-source']) return true;
    currentComponent = currentComponent.parent ? currentComponent.parent() : null;
  }
  return false;
};

const collectUnresolvedTokenItems = (editor) => {
  const registry = getDataSourceRegistry(editor);
  const items = [];
  walkSitePageComponents(editor, (component, page) => {
    if (component.get('type') === 'textnode') return;
    const unresolvedPaths = collectComponentTokenPaths(component).filter((pathText) => {
      if (pathText === 'item' || pathText.startsWith('item.')) return !hasRepeaterAncestor(component);
      return resolveBindingPath(registry, pathText) === undefined;
    });
    if (!unresolvedPaths.length) return;
    items.push(
      createPreflightItem(
        'warning',
        'Data',
        describeAuditComponent(component) + ' uses data that does not exist: ' + unresolvedPaths.join(', ') + '.',
        'Add the missing source in Data sources, or correct the token so it matches an existing field.',
        component,
        page,
        'open-data-sources',
      ),
    );
  });
  return items;
};

export default collectUnresolvedTokenItems;
