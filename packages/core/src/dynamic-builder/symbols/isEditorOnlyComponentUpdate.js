import getEditorOnlyDefinitionKeys from './getEditorOnlyDefinitionKeys.js';

const ignoredUpdateKeys = ['traits', 'dbSymbolEditingIds'];

const isEditorOnlyComponentUpdate = (changedComponent) => {
  if (!changedComponent || typeof changedComponent.changedAttributes !== 'function') return false;
  const changedKeys = Object.keys(changedComponent.changedAttributes() || {});
  if (!changedKeys.length) return true;
  const editorOnlyKeys = getEditorOnlyDefinitionKeys().concat(ignoredUpdateKeys);
  return changedKeys.every((changedKey) => editorOnlyKeys.indexOf(changedKey) >= 0);
};

export default isEditorOnlyComponentUpdate;
