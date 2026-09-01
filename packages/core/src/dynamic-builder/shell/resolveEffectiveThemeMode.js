const resolveEffectiveThemeMode = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  const attributeValue =
    containerElement && containerElement.getAttribute && containerElement.getAttribute('data-theme');
  if (attributeValue === 'light' || attributeValue === 'dark') return attributeValue;
  const viewWindow = containerElement && containerElement.ownerDocument && containerElement.ownerDocument.defaultView;
  if (viewWindow && typeof viewWindow.matchMedia === 'function') {
    return viewWindow.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export default resolveEffectiveThemeMode;
