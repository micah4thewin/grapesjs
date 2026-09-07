import getPageDisplayName from './getPageDisplayName.js';
import serializePageComponents from './serializePageComponents.js';

const capturePageSnapshot = (sitePage) => ({
  pageId: String(sitePage.getId()),
  name: getPageDisplayName(sitePage),
  component: serializePageComponents(sitePage),
  meta: sitePage.get('dbPageMeta') || null,
});

export default capturePageSnapshot;
