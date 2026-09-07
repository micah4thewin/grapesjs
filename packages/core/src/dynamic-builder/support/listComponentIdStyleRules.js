const listComponentIdStyleRules = (editor, componentId) => {
  const idSelector = '#' + String(componentId || '');
  if (!componentId || !editor.Css || !editor.Css.getRules) return [];
  return editor.Css.getRules().filter((styleRule) => {
    const selectorList = styleRule.get('selectors');
    if (!selectorList || selectorList.length !== 1) return false;
    const onlySelector = selectorList.at(0);
    const selectorName = onlySelector && onlySelector.getFullName ? onlySelector.getFullName() : '';
    if (selectorName !== idSelector) return false;
    const ruleStyle = styleRule.getStyle ? styleRule.getStyle() : {};
    return Object.keys(ruleStyle).length > 0;
  });
};

export default listComponentIdStyleRules;
