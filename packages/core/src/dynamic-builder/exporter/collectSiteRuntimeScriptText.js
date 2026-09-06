import walkComponentTree from '../support/walkComponentTree.js';

const collectSiteRuntimeScriptText = (editor) => {
  const scriptByType = new Map();
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  pageList.forEach((sitePage) => {
    const mainComponent = sitePage.getMainComponent ? sitePage.getMainComponent() : null;
    walkComponentTree(mainComponent, (currentComponent) => {
      const typeName = currentComponent.get ? String(currentComponent.get('type') || '') : '';
      if (!typeName || scriptByType.has(typeName)) return;
      if (!currentComponent.get('script') || typeof currentComponent.getScriptString !== 'function') return;
      const scriptText = String(currentComponent.getScriptString() || '').trim();
      if (scriptText) scriptByType.set(typeName, scriptText);
    });
  });
  return [...scriptByType.values()].map((scriptText) => '(function () {\n' + scriptText + '\n})();').join('\n\n');
};

export default collectSiteRuntimeScriptText;
