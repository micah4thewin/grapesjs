import applyCustomCssRegistration from './applyCustomCssRegistration.js';
import buildCssCardChildren from './buildCssCardChildren.js';
import buildScriptCardChildren from './buildScriptCardChildren.js';
import removeCustomCssRegistration from './removeCustomCssRegistration.js';
import renderCustomHtmlChildren from './renderCustomHtmlChildren.js';
import syncCodeCardFromAttribute from './syncCodeCardFromAttribute.js';

const watchCustomCodeComponents = (editor) => {
  const hasType = (component, typeName) => !!component && !!component.get && component.get('type') === typeName;
  editor.on('component:add', (component) => {
    if (hasType(component, 'db-custom-html')) renderCustomHtmlChildren(component);
    if (hasType(component, 'db-custom-css')) {
      syncCodeCardFromAttribute(component, 'cssCode', buildCssCardChildren);
      applyCustomCssRegistration(editor, component);
    }
    if (hasType(component, 'db-custom-script')) {
      syncCodeCardFromAttribute(component, 'scriptCode', buildScriptCardChildren);
    }
  });
  editor.on('component:update:attributes:htmlCode', (component) => {
    if (hasType(component, 'db-custom-html')) renderCustomHtmlChildren(component);
  });
  editor.on('component:update:attributes:cssCode', (component) => {
    if (hasType(component, 'db-custom-css')) {
      syncCodeCardFromAttribute(component, 'cssCode', buildCssCardChildren);
      applyCustomCssRegistration(editor, component);
    }
  });
  editor.on('component:update:attributes:scriptCode', (component) => {
    if (hasType(component, 'db-custom-script')) {
      syncCodeCardFromAttribute(component, 'scriptCode', buildScriptCardChildren);
    }
  });
  editor.on('component:remove', (component) => {
    if (hasType(component, 'db-custom-css')) removeCustomCssRegistration(editor, component);
  });
};

export default watchCustomCodeComponents;
