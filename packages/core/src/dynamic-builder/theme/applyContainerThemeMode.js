const applyContainerThemeMode = (editor, modeSetting) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.setAttribute) return;
  if (modeSetting === 'auto') return;
  containerElement.setAttribute('data-theme', modeSetting);
};

export default applyContainerThemeMode;
