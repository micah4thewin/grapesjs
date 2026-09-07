const switchStyleScope = (editor, scopeMode) => {
  const selectorManager = editor.SelectorManager;
  if (!selectorManager || !selectorManager.setComponentFirst) return;
  const nextElementFirst = scopeMode !== 'class';
  if (selectorManager.getComponentFirst && selectorManager.getComponentFirst() === nextElementFirst) return;
  selectorManager.setComponentFirst(nextElementFirst);
  const selectedComponents = editor.getSelectedAll ? editor.getSelectedAll() : [];
  if (editor.StyleManager && editor.StyleManager.select && selectedComponents.length) {
    editor.StyleManager.select(selectedComponents);
  }
  editor.trigger('component:toggled');
};

export default switchStyleScope;
