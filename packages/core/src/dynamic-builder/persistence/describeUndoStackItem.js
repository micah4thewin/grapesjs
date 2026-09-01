const describeUndoStackItem = (stackItem) => {
  const actionType = String(stackItem.get('type') || 'change');
  const actionObject = stackItem.get('object');
  const objectName =
    actionObject && actionObject.getName
      ? actionObject.getName()
      : actionObject && actionObject.get
        ? String(actionObject.get('type') || actionObject.get('name') || '')
        : '';
  const actionLabels = {
    add: 'Added',
    remove: 'Removed',
    change: 'Changed',
    reset: 'Replaced',
  };
  const actionLabel = actionLabels[actionType] || 'Changed';
  return objectName ? `${actionLabel} ${objectName}` : actionLabel;
};

export default describeUndoStackItem;
