import matchesPageFileHref from './matchesPageFileHref.js';
import walkComponentTree from '../support/walkComponentTree.js';

const listPageLinkComponents = (editor, baseName, excludedPage) => {
  const matchedComponents = [];
  const pageList = (editor.Pages && editor.Pages.getAll && editor.Pages.getAll()) || [];
  pageList.forEach((sitePage) => {
    if (sitePage === excludedPage) return;
    const mainComponent = sitePage.getMainComponent ? sitePage.getMainComponent() : null;
    walkComponentTree(mainComponent, (currentComponent) => {
      if (!currentComponent.getAttributes) return;
      const hrefValue = currentComponent.getAttributes().href;
      if (matchesPageFileHref(hrefValue, baseName)) matchedComponents.push(currentComponent);
    });
  });
  return matchedComponents;
};

export default listPageLinkComponents;
