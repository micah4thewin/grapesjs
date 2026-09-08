import listComponentIdStyleRules from './listComponentIdStyleRules.js';

const symbolClassPattern = /^db-sym-/;

const findExistingSymbolClass = (component) =>
  (component && component.getClasses ? component.getClasses() : []).find((className) =>
    symbolClassPattern.test(String(className)),
  );

// Styles written by the style manager land on the component's id, and ids are
// stripped from the stored definition so every copy gets its own. Copying those
// rules onto a shared class is what lets a style edit reach every instance.
const promoteIdStylesToClass = (editor, component, generatedClassName) => {
  const componentId = component && component.getId ? component.getId() : '';
  const matchedRules = listComponentIdStyleRules(editor, componentId);
  if (!matchedRules.length) return false;
  const existingClassName = findExistingSymbolClass(component);
  const targetClassName = existingClassName || generatedClassName;
  matchedRules.forEach((styleRule) => {
    const stateName = String(styleRule.get('state') || '');
    const classSelector = '.' + targetClassName + (stateName ? ':' + stateName : '');
    editor.Css.setRule(classSelector, styleRule.getStyle(), {
      atRuleType: styleRule.get('atRuleType'),
      atRuleParams: styleRule.get('mediaText'),
    });
  });
  if (!existingClassName && component.addClass) component.addClass(targetClassName);
  return true;
};

export default promoteIdStylesToClass;
