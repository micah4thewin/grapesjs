import walkComponentTree from '../support/walkComponentTree.js';

const walkSitePageComponents = (editor, visitComponent) => {
  const allPages = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  allPages.forEach((page) => {
    const rootComponent = page && page.getMainComponent ? page.getMainComponent() : null;
    walkComponentTree(rootComponent, (component) => visitComponent(component, page));
  });
};

export default walkSitePageComponents;
