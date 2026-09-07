const resolveUndoObjectName = (actionObject) => {
  if (!actionObject || typeof actionObject !== 'object') return '';
  if (typeof actionObject.getMainComponent === 'function') {
    const pageName = typeof actionObject.getName === 'function' ? String(actionObject.getName() || '').trim() : '';
    return 'page "' + (pageName || 'Home') + '"';
  }
  if (typeof actionObject.selectorsToString === 'function') return 'a style rule';
  if (typeof actionObject.getName === 'function' && typeof actionObject.get === 'function') {
    const componentName = String(actionObject.getName() || '')
      .trim()
      .replace(/^Db-/, '')
      .replace(/-/g, ' ');
    if (componentName) return componentName.charAt(0).toUpperCase() + componentName.slice(1);
  }
  return '';
};

export default resolveUndoObjectName;
