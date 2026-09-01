import resolveEffectiveThemeMode from './resolveEffectiveThemeMode.js';

const toggleEditorThemeMode = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.setAttribute) return 'light';
  const nextMode = resolveEffectiveThemeMode(editor) === 'dark' ? 'light' : 'dark';
  containerElement.setAttribute('data-theme', nextMode);
  try {
    window.localStorage && window.localStorage.setItem('db-editor-theme', nextMode);
  } catch (storageError) {
    editor.trigger('db:theme:storage-error');
  }
  editor.trigger('db:theme:update', nextMode);
  return nextMode;
};

export default toggleEditorThemeMode;
