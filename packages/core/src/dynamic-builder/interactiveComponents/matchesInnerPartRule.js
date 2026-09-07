const matchesInnerPartRule = (component, rule) => {
  if (!component || typeof component.get !== 'function') return false;
  if (rule.className) {
    const classNames = typeof component.getClasses === 'function' ? component.getClasses() : [];
    return classNames.indexOf(rule.className) >= 0;
  }
  if (rule.attributeName) {
    const attributeRecord = typeof component.getAttributes === 'function' ? component.getAttributes() : {};
    return attributeRecord[rule.attributeName] !== undefined;
  }
  if (rule.tagName) return String(component.get('tagName') || '').toLowerCase() === rule.tagName;
  return false;
};

export default matchesInnerPartRule;
