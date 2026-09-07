import listBindingTokenBodies from './listBindingTokenBodies.js';
import parseBindingToken from './parseBindingToken.js';
import walkComponentTree from '../support/walkComponentTree.js';

const ensureUsageRecord = (usageMap, sourceName) => {
  if (!usageMap[sourceName]) usageMap[sourceName] = { repeaterCount: 0, tokenCount: 0, pageNames: [] };
  return usageMap[sourceName];
};

const notePage = (usageRecord, pageName) => {
  if (usageRecord.pageNames.indexOf(pageName) < 0) usageRecord.pageNames.push(pageName);
};

const countDataSourceUsages = (editor) => {
  const usageMap = {};
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  pageList.forEach((sitePage, pageIndex) => {
    const pageName = sitePage.getName ? sitePage.getName() || `Page ${pageIndex + 1}` : `Page ${pageIndex + 1}`;
    const mainComponent = sitePage.getMainComponent ? sitePage.getMainComponent() : null;
    walkComponentTree(mainComponent, (currentComponent) => {
      if (!currentComponent || typeof currentComponent.get !== 'function') return;
      const attributesRecord = currentComponent.getAttributes ? currentComponent.getAttributes() : {};
      if (currentComponent.get('type') === 'db-repeater' && attributesRecord['data-db-source']) {
        const usageRecord = ensureUsageRecord(usageMap, String(attributesRecord['data-db-source']));
        usageRecord.repeaterCount += 1;
        notePage(usageRecord, pageName);
      }
      const textValues = [currentComponent.get('content') || '', ...Object.values(attributesRecord)];
      textValues.forEach((textValue) =>
        listBindingTokenBodies(textValue).forEach((tokenBody) => {
          const rootName = parseBindingToken(tokenBody).pathText.split('.')[0];
          if (!rootName || rootName === 'item' || rootName === 'index' || rootName === 'count') return;
          const usageRecord = ensureUsageRecord(usageMap, rootName);
          usageRecord.tokenCount += 1;
          notePage(usageRecord, pageName);
        }),
      );
    });
  });
  return usageMap;
};

export default countDataSourceUsages;
