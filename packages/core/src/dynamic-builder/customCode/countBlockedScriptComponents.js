import walkComponentTree from '../support/walkComponentTree.js';

const countBlockedScriptComponents = (editor) => {
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  let blockedCount = 0;
  pageList.forEach((sitePage) => {
    const mainComponent = sitePage.getMainComponent ? sitePage.getMainComponent() : null;
    walkComponentTree(mainComponent, (currentComponent) => {
      if (!currentComponent.get || currentComponent.get('type') !== 'db-custom-script') return;
      const attributeRecord = currentComponent.getAttributes ? currentComponent.getAttributes() : {};
      if (String(attributeRecord.scriptCode || '').trim()) blockedCount += 1;
    });
  });
  return blockedCount;
};

export default countBlockedScriptComponents;
