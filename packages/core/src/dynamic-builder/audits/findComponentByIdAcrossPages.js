import walkComponentTree from '../support/walkComponentTree.js';

const findComponentByIdAcrossPages = (editor, componentId) => {
  const targetId = String(componentId || '');
  if (!targetId) return null;
  const componentsModule = editor.Components;
  const directMatch = componentsModule && componentsModule.getById ? componentsModule.getById(targetId) : null;
  if (directMatch) return directMatch;
  const allPages = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  let matchedComponent = null;
  allPages.forEach((page) => {
    if (matchedComponent) return;
    walkComponentTree(page.getMainComponent ? page.getMainComponent() : null, (component) => {
      if (!matchedComponent && component.getId && String(component.getId()) === targetId) matchedComponent = component;
    });
  });
  return matchedComponent;
};

export default findComponentByIdAcrossPages;
