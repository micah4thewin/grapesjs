import listBindingTokenBodies from './listBindingTokenBodies.js';
import parseBindingToken from './parseBindingToken.js';
import resolveBindingPath from './resolveBindingPath.js';
import resolveComponentBindingContext from './resolveComponentBindingContext.js';
import walkComponentTree from '../support/walkComponentTree.js';

const collectUnresolvedBindingTokens = (editor) => {
  const unresolvedEntries = [];
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  pageList.forEach((sitePage, pageIndex) => {
    const pageName = (sitePage.getName && sitePage.getName()) || `Page ${pageIndex + 1}`;
    const mainComponent = sitePage.getMainComponent ? sitePage.getMainComponent() : null;
    walkComponentTree(mainComponent, (currentComponent) => {
      if (!currentComponent || typeof currentComponent.get !== 'function') return;
      const attributesRecord = currentComponent.getAttributes ? currentComponent.getAttributes() : {};
      const textValues = [currentComponent.get('content') || '', ...Object.values(attributesRecord)];
      const tokenBodies = textValues.flatMap((textValue) => listBindingTokenBodies(textValue));
      if (!tokenBodies.length) return;
      const contextRegistry = resolveComponentBindingContext(editor, currentComponent);
      if (!contextRegistry) return;
      tokenBodies.forEach((tokenBody) => {
        const { pathText } = parseBindingToken(tokenBody);
        if (resolveBindingPath(contextRegistry, pathText) !== undefined) return;
        const ownerComponent =
          currentComponent.get('type') === 'textnode' ? currentComponent.parent() : currentComponent;
        unresolvedEntries.push({
          token: `{{db:${tokenBody}}}`,
          page: sitePage,
          pageName,
          component: ownerComponent || currentComponent,
          componentName: (ownerComponent || currentComponent).getName
            ? (ownerComponent || currentComponent).getName()
            : '',
        });
      });
    });
  });
  return unresolvedEntries;
};

export default collectUnresolvedBindingTokens;
