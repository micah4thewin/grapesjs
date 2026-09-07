import resolveEffectiveThemeMode from './resolveEffectiveThemeMode.js';
import resolveSystemThemeMode from './resolveSystemThemeMode.js';
import resolveThemeModeSetting from '../theme/resolveThemeModeSetting.js';
import writeShellPreference from './writeShellPreference.js';

const toggleEditorThemeMode = (editor, pluginOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.setAttribute) return 'light';
  const nextMode = resolveEffectiveThemeMode(editor) === 'dark' ? 'light' : 'dark';
  const isForcedMode = resolveThemeModeSetting((pluginOptions && pluginOptions.theme) || {}) !== 'auto';
  const followsSystem = !isForcedMode && nextMode === resolveSystemThemeMode(containerElement);
  if (followsSystem) containerElement.removeAttribute('data-theme');
  else containerElement.setAttribute('data-theme', nextMode);
  const storedValue = followsSystem ? '' : nextMode;
  if (!isForcedMode && !writeShellPreference(editor, pluginOptions, 'theme', storedValue, 'db-editor-theme')) {
    editor.trigger('db:theme:storage-error');
  }
  editor.trigger('db:theme:update', nextMode);
  return nextMode;
};

export default toggleEditorThemeMode;
