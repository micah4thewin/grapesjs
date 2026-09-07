import applyCustomCssRegistration from './applyCustomCssRegistration.js';
import buildCssCardChildren from './buildCssCardChildren.js';
import buildScriptCardChildren from './buildScriptCardChildren.js';
import getSiteCustomCodeRecord from '../exporter/getSiteCustomCodeRecord.js';
import removeCustomCssRegistration from './removeCustomCssRegistration.js';
import renderCustomHtmlChildren from './renderCustomHtmlChildren.js';
import syncCodeCardFromAttribute from './syncCodeCardFromAttribute.js';
import walkComponentTree from '../support/walkComponentTree.js';

const watchCustomCodeComponents = (editor) => {
  const hasType = (component, typeName) => !!component && !!component.get && component.get('type') === typeName;
  const buildScriptCard = (scriptCode) =>
    buildScriptCardChildren(scriptCode, getSiteCustomCodeRecord(editor).allowScripts);
  const syncCssComponent = (component) => {
    syncCodeCardFromAttribute(component, 'cssCode', buildCssCardChildren);
    applyCustomCssRegistration(editor, component);
  };
  editor.on('component:add', (component) => {
    if (hasType(component, 'db-custom-html')) renderCustomHtmlChildren(component);
    if (hasType(component, 'db-custom-css')) syncCssComponent(component);
    if (hasType(component, 'db-custom-script')) syncCodeCardFromAttribute(component, 'scriptCode', buildScriptCard);
  });
  editor.on('component:update:attributes:htmlCode', (component) => {
    if (hasType(component, 'db-custom-html')) renderCustomHtmlChildren(component);
  });
  ['cssCode', 'cssPriority'].forEach((attributeName) =>
    editor.on('component:update:attributes:' + attributeName, (component) => {
      if (hasType(component, 'db-custom-css')) syncCssComponent(component);
    }),
  );
  editor.on('component:update:attributes:scriptCode', (component) => {
    if (hasType(component, 'db-custom-script')) syncCodeCardFromAttribute(component, 'scriptCode', buildScriptCard);
  });
  editor.on('component:remove', (component) => {
    if (hasType(component, 'db-custom-css')) removeCustomCssRegistration(editor, component);
  });
  editor.on('db:custom-code:update', () => {
    const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
    pageList.forEach((sitePage) => {
      walkComponentTree(sitePage.getMainComponent ? sitePage.getMainComponent() : null, (component) => {
        if (hasType(component, 'db-custom-script')) syncCodeCardFromAttribute(component, 'scriptCode', buildScriptCard);
      });
    });
  });
};

export default watchCustomCodeComponents;
