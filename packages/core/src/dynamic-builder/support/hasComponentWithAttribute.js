import walkComponentTree from './walkComponentTree.js';

const hasComponentWithAttribute = (editor, attributeName, page) => {
  const allPages = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  const pageList = page ? [page] : allPages;
  return pageList.some((sitePage) => {
    const mainComponent = sitePage.getMainComponent ? sitePage.getMainComponent() : null;
    let attributeFound = false;
    walkComponentTree(mainComponent, (currentComponent) => {
      if (attributeFound || !currentComponent.getAttributes) return;
      const attributeValue = currentComponent.getAttributes()[attributeName];
      if (attributeValue !== undefined && attributeValue !== '' && attributeValue !== 'none') attributeFound = true;
    });
    return attributeFound;
  });
};

export default hasComponentWithAttribute;
