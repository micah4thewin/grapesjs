import clonePageComponents from './clonePageComponents.js';
import getPageDisplayName from './getPageDisplayName.js';

const capturePageSnapshot = (sitePage) => ({
  pageId: String(sitePage.getId()),
  name: getPageDisplayName(sitePage),
  components: clonePageComponents(sitePage),
  meta: sitePage.get('dbPageMeta') || null,
});

export default capturePageSnapshot;
