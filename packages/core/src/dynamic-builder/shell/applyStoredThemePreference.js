import resolveThemeModeSetting from '../theme/resolveThemeModeSetting.js';

const applyStoredThemePreference = (editor, themeOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.setAttribute) return;
  if (resolveThemeModeSetting(themeOptions) !== 'auto') return;
  let storedValue = '';
  try {
    storedValue = window.localStorage ? window.localStorage.getItem('db-editor-theme') || '' : '';
  } catch (storageError) {
    storedValue = '';
  }
  if (storedValue === 'light' || storedValue === 'dark') containerElement.setAttribute('data-theme', storedValue);
};

export default applyStoredThemePreference;
