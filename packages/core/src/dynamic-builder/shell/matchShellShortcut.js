const matchShellShortcut = (definitionRecords, keyEvent) => {
  if (!keyEvent || keyEvent.altKey) return null;
  const hasPrimaryModifier = Boolean(keyEvent.ctrlKey || keyEvent.metaKey);
  const pressedKey = String(keyEvent.key || '').toLowerCase();
  if (!pressedKey) return null;
  const matchedRecord = definitionRecords.find((definitionRecord) => {
    const needsPrimaryModifier = definitionRecord.needsPrimary !== false;
    if (needsPrimaryModifier !== hasPrimaryModifier) return false;
    if ((definitionRecord.keyNames || []).indexOf(pressedKey) < 0) return false;
    return definitionRecord.ignoresShift || Boolean(definitionRecord.needsShift) === Boolean(keyEvent.shiftKey);
  });
  return matchedRecord || null;
};

export default matchShellShortcut;
