import buildBreadcrumbFromPages from './buildBreadcrumbFromPages.js';
import resolveComponentPage from './resolveComponentPage.js';

const applyBreadcrumbDefaultsOnAdd = (editor, breadcrumbComponent) => {
  if (!breadcrumbComponent || typeof breadcrumbComponent.getAttributes !== 'function') return false;
  if ((breadcrumbComponent.getAttributes() || {})['data-db-auto'] !== 'true') return false;
  const owningPage = resolveComponentPage(editor, breadcrumbComponent);
  if (!owningPage) return false;
  buildBreadcrumbFromPages(editor, breadcrumbComponent, owningPage);
  return true;
};

export default applyBreadcrumbDefaultsOnAdd;
