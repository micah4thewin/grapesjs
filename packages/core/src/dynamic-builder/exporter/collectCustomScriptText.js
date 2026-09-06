import walkComponentTree from '../support/walkComponentTree.js';

const collectCustomScriptText = (editor, page) => {
  const scriptChunks = [];
  const allPages = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  const pageList = page ? [page] : allPages;
  pageList.forEach((sitePage) => {
    const mainComponent = sitePage.getMainComponent ? sitePage.getMainComponent() : null;
    walkComponentTree(mainComponent, (currentComponent) => {
      const componentType = currentComponent.get ? currentComponent.get('type') : '';
      if (componentType !== 'db-custom-script') return;
      const componentAttributes = currentComponent.getAttributes ? currentComponent.getAttributes() : {};
      const scriptCode = String(componentAttributes.scriptCode || '').trim();
      if (scriptCode && !scriptChunks.includes(scriptCode)) scriptChunks.push(scriptCode);
    });
  });
  return scriptChunks.join('\n\n');
};

export default collectCustomScriptText;
