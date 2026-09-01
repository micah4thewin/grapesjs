const applyStoredThemePreference = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.setAttribute) return;
  let storedValue = '';
  try {
    storedValue = window.localStorage ? window.localStorage.getItem('db-editor-theme') || '' : '';
  } catch (storageError) {
    storedValue = '';
  }
  if (storedValue === 'light' || storedValue === 'dark') containerElement.setAttribute('data-theme', storedValue);
};

export default applyStoredThemePreference;
