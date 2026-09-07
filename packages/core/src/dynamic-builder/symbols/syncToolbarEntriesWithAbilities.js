import getHiddenToolbarStore from './getHiddenToolbarStore.js';

const abilityRecords = [
  { command: 'tlb-move', ability: 'draggable' },
  { command: 'tlb-clone', ability: 'copyable' },
  { command: 'tlb-delete', ability: 'removable' },
];

const findAbilityRecord = (toolbarEntry) =>
  abilityRecords.find((abilityRecord) => Boolean(toolbarEntry) && toolbarEntry.command === abilityRecord.command);

const isParentEntry = (toolbarEntry) =>
  Boolean(toolbarEntry) && typeof toolbarEntry.command === 'function' && !toolbarEntry.attributes;

const syncToolbarEntriesWithAbilities = (editor, component, toolbarItems) => {
  const hiddenStore = getHiddenToolbarStore(editor);
  const hiddenEntries = { ...(hiddenStore.get(component) || {}) };
  const keptItems = toolbarItems.filter((toolbarEntry) => {
    const abilityRecord = findAbilityRecord(toolbarEntry);
    if (!abilityRecord || component.get(abilityRecord.ability)) return true;
    hiddenEntries[abilityRecord.command] = toolbarEntry;
    return false;
  });
  const leadingCount = keptItems.length && isParentEntry(keptItems[0]) ? 1 : 0;
  abilityRecords.forEach((abilityRecord, abilityIndex) => {
    const hiddenEntry = hiddenEntries[abilityRecord.command];
    if (!hiddenEntry || !component.get(abilityRecord.ability)) return;
    delete hiddenEntries[abilityRecord.command];
    if (keptItems.some((toolbarEntry) => toolbarEntry && toolbarEntry.command === abilityRecord.command)) return;
    const presentBefore = abilityRecords
      .slice(0, abilityIndex)
      .filter((earlierRecord) => keptItems.some((entry) => entry && entry.command === earlierRecord.command)).length;
    keptItems.splice(leadingCount + presentBefore, 0, hiddenEntry);
  });
  hiddenStore.set(component, hiddenEntries);
  return keptItems;
};

export default syncToolbarEntriesWithAbilities;
