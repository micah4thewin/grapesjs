import resolveShellStorageScope from './resolveShellStorageScope.js';

const readShellPreference = (editor, pluginOptions, preferenceName, legacyKey) => {
  const scopedKey = `db-editor:${resolveShellStorageScope(editor, pluginOptions)}:${preferenceName}`;
  try {
    if (!window.localStorage) return '';
    const scopedValue = window.localStorage.getItem(scopedKey);
    if (scopedValue !== null) return scopedValue;
    return legacyKey ? window.localStorage.getItem(legacyKey) || '' : '';
  } catch (storageError) {
    return '';
  }
};

export default readShellPreference;
