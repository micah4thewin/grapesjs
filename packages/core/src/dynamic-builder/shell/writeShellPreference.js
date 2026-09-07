import resolveShellStorageScope from './resolveShellStorageScope.js';

const writeShellPreference = (editor, pluginOptions, preferenceName, preferenceValue) => {
  const scopedKey = `db-editor:${resolveShellStorageScope(editor, pluginOptions)}:${preferenceName}`;
  try {
    if (!window.localStorage) return false;
    if (preferenceValue === '') window.localStorage.removeItem(scopedKey);
    else window.localStorage.setItem(scopedKey, preferenceValue);
    return true;
  } catch (storageError) {
    return false;
  }
};

export default writeShellPreference;
