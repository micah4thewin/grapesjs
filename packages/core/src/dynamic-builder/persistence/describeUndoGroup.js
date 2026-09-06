const resolveObjectName = (actionObject) => {
  if (!actionObject) return '';
  if (typeof actionObject.getName === 'function') return String(actionObject.getName() || '');
  if (typeof actionObject.get === 'function') {
    return String(actionObject.get('type') || actionObject.get('name') || '');
  }
  return '';
};

const describeUndoGroup = (undoGroup) => {
  const actionList = (undoGroup && undoGroup.actions) || [];
  if (undoGroup && undoGroup.labels && undoGroup.labels.length) return undoGroup.labels.join(', ');
  const actionLabels = { add: 'Added', remove: 'Removed', change: 'Changed', reset: 'Replaced' };
  const primaryAction =
    actionList.find((actionRecord) => actionRecord.type === 'add' || actionRecord.type === 'remove') || actionList[0];
  if (!primaryAction) return 'Changed';
  const actionLabel = actionLabels[primaryAction.type] || 'Changed';
  const namedModel = primaryAction.after || primaryAction.before || primaryAction.object;
  const objectName = resolveObjectName(namedModel);
  return objectName ? actionLabel + ' ' + objectName : actionLabel;
};

export default describeUndoGroup;
