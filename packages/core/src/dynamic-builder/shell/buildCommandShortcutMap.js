import formatKeysText from './formatKeysText.js';

const buildCommandShortcutMap = (editor) => {
  const keymapRecords = (editor.Keymaps && editor.Keymaps.getAll && editor.Keymaps.getAll()) || {};
  return Object.keys(keymapRecords).reduce((shortcutMap, keymapId) => {
    const keymapRecord = keymapRecords[keymapId] || {};
    const commandId = typeof keymapRecord.handler === 'string' ? keymapRecord.handler : keymapId;
    const keysText = formatKeysText(keymapRecord.keys);
    if (keysText && !shortcutMap[commandId]) shortcutMap[commandId] = keysText;
    return shortcutMap;
  }, {});
};

export default buildCommandShortcutMap;
