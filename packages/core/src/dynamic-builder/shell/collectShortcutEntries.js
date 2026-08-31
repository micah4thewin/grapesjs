import deriveLabelFromCommandId from './deriveLabelFromCommandId.js';
import formatKeysText from './formatKeysText.js';
import getCoreCommandLabelRecords from './getCoreCommandLabelRecords.js';
import getDbCommandLabelRecords from './getDbCommandLabelRecords.js';

const collectShortcutEntries = (editor) => {
  const labelRecords = { ...getCoreCommandLabelRecords(), ...getDbCommandLabelRecords() };
  const shellEntries = [];
  const coreEntries = [];
  const keymapRecords = (editor.Keymaps && editor.Keymaps.getAll && editor.Keymaps.getAll()) || {};
  Object.keys(keymapRecords).forEach((keymapId) => {
    const keymapRecord = keymapRecords[keymapId] || {};
    const handlerId = typeof keymapRecord.handler === 'string' ? keymapRecord.handler : '';
    const labelRecord = labelRecords[handlerId] || labelRecords[keymapId] || {};
    const entryRecord = {
      keysText: formatKeysText(keymapRecord.keys),
      labelText: labelRecord.label || deriveLabelFromCommandId(handlerId || keymapId),
    };
    if (keymapId.indexOf('db:') === 0) shellEntries.push(entryRecord);
    else coreEntries.push(entryRecord);
  });
  return [
    { groupTitle: 'Dynamic Builder shortcuts', entries: shellEntries },
    { groupTitle: 'Core editing shortcuts', entries: coreEntries },
  ].filter((groupRecord) => groupRecord.entries.length > 0);
};

export default collectShortcutEntries;
