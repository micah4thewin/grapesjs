const refreshStyleScopeToggle = (editor, toggleElement) => {
  const selectorManager = editor.SelectorManager;
  const isElementFirst = !!(
    selectorManager &&
    selectorManager.getComponentFirst &&
    selectorManager.getComponentFirst()
  );
  const selectedComponent = editor.getSelected && editor.getSelected();
  const classNames = selectedComponent && selectedComponent.getClasses ? selectedComponent.getClasses() : [];
  const primaryClass = classNames.filter((className) => !/^gjs-/.test(className))[0] || '';
  toggleElement.querySelectorAll('[data-db-style-scope-mode]').forEach((buttonElement) => {
    const buttonMode = buttonElement.getAttribute('data-db-style-scope-mode');
    buttonElement.setAttribute('aria-pressed', (buttonMode === 'element') === isElementFirst ? 'true' : 'false');
    if (buttonMode === 'class') buttonElement.disabled = !primaryClass;
  });
  const hintElement = toggleElement.querySelector('[data-db-style-scope-hint]');
  if (!hintElement) return;
  if (!selectedComponent) {
    hintElement.textContent = 'Select something on the page to style it.';
    return;
  }
  if (isElementFirst || !primaryClass) {
    hintElement.textContent = primaryClass
      ? `Only this element changes. Switch to edit every .${primaryClass} at once.`
      : 'Only this element changes.';
    return;
  }
  const wrapperComponent = editor.getWrapper && editor.getWrapper();
  const matchCount = wrapperComponent && wrapperComponent.find ? wrapperComponent.find(`.${primaryClass}`).length : 0;
  hintElement.textContent = `Every element with .${primaryClass} changes (${matchCount} on this page).`;
};

export default refreshStyleScopeToggle;
