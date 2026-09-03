import listComponentIdStyleRules from './listComponentIdStyleRules.js';

const promoteIdStylesToClass = (editor, component, generatedClassName) => {
  const componentId = component && component.getId ? component.getId() : '';
  const matchedRules = listComponentIdStyleRules(editor, componentId);
  if (!matchedRules.length) return false;
  matchedRules.forEach((styleRule) => {
    const stateName = String(styleRule.get('state') || '');
    const classSelector = '.' + generatedClassName + (stateName ? ':' + stateName : '');
    editor.Css.setRule(classSelector, styleRule.getStyle(), {
      atRuleType: styleRule.get('atRuleType'),
      atRuleParams: styleRule.get('mediaText'),
    });
  });
  if (component.addClass) component.addClass(generatedClassName);
  return true;
};

export default promoteIdStylesToClass;
