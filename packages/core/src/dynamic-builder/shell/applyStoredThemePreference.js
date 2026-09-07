import readShellPreference from './readShellPreference.js';
import resolveThemeModeSetting from '../theme/resolveThemeModeSetting.js';

const applyStoredThemePreference = (editor, pluginOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.setAttribute) return;
  if (resolveThemeModeSetting((pluginOptions && pluginOptions.theme) || {}) !== 'auto') return;
  const storedValue = readShellPreference(editor, pluginOptions, 'theme', 'db-editor-theme');
  if (storedValue === 'light' || storedValue === 'dark') containerElement.setAttribute('data-theme', storedValue);
};

export default applyStoredThemePreference;
