import buildBreadcrumbFromPages from './buildBreadcrumbFromPages.js';
import buildNavbarLinksFromPages from './buildNavbarLinksFromPages.js';
import isInsideSymbolInstance from './isInsideSymbolInstance.js';
import walkComponentTree from '../support/walkComponentTree.js';

const resyncAutoNavigation = (editor) => {
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  let syncedCount = 0;
  pageList.forEach((sitePage) => {
    const mainComponent = sitePage.getMainComponent ? sitePage.getMainComponent() : null;
    walkComponentTree(mainComponent, (currentComponent) => {
      if (typeof currentComponent.getAttributes !== 'function' || isInsideSymbolInstance(currentComponent)) return;
      const typeName = String(currentComponent.get('type') || '');
      const attributeRecord = currentComponent.getAttributes() || {};
      if (typeName === 'db-navbar' && attributeRecord['data-db-menu-auto'] === 'true') {
        buildNavbarLinksFromPages(editor, currentComponent);
        syncedCount += 1;
      }
      if (typeName === 'db-breadcrumb' && attributeRecord['data-db-auto'] === 'true') {
        buildBreadcrumbFromPages(editor, currentComponent, sitePage);
        syncedCount += 1;
      }
    });
  });
  return syncedCount;
};

export default resyncAutoNavigation;
