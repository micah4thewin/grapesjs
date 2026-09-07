import listChangedAttributeKeys from './listChangedAttributeKeys.js';
import resolveUndoObjectName from './resolveUndoObjectName.js';

const describeChangeAction = (actionRecord) => {
  const objectName = resolveUndoObjectName(actionRecord.object) || 'the page';
  const changedKeys = listChangedAttributeKeys(actionRecord);
  if (changedKeys.indexOf('dbSiteMeta') >= 0) return 'Changed site settings';
  if (changedKeys.indexOf('dbPageMeta') >= 0) return 'Changed settings of ' + objectName;
  if (changedKeys.indexOf('name') >= 0 && /^page /.test(objectName)) return 'Renamed ' + objectName;
  if (changedKeys.indexOf('style') >= 0 || changedKeys.indexOf('classes') >= 0) return 'Changed style of ' + objectName;
  if (changedKeys.indexOf('content') >= 0 || changedKeys.indexOf('components') >= 0) return 'Edited ' + objectName;
  if (changedKeys.indexOf('src') >= 0) return 'Changed image of ' + objectName;
  if (changedKeys.indexOf('attributes') >= 0) return 'Changed settings of ' + objectName;
  return 'Changed ' + objectName;
};

const describeUndoGroup = (undoGroup) => {
  const actionList = ((undoGroup && undoGroup.actions) || []).filter((actionRecord) => actionRecord && actionRecord.type);
  const structuralActions = actionList.filter((actionRecord) => actionRecord.type === 'add' || actionRecord.type === 'remove');
  if (structuralActions.length) {
    const primaryAction = structuralActions[0];
    const verbText = primaryAction.type === 'add' ? 'Added' : 'Removed';
    const sameKindCount = structuralActions.filter((actionRecord) => actionRecord.type === primaryAction.type).length;
    const objectName = resolveUndoObjectName(primaryAction.after || primaryAction.before);
    if (sameKindCount > 1 && !/^page /.test(objectName)) return verbText + ' ' + sameKindCount + ' blocks';
    return objectName ? verbText + ' ' + objectName : verbText + ' a block';
  }
  const resetAction = actionList.find((actionRecord) => actionRecord.type === 'reset');
  if (resetAction) return 'Replaced page content';
  const changeAction = actionList.find((actionRecord) => actionRecord.type === 'change');
  return changeAction ? describeChangeAction(changeAction) : 'Changed the page';
};

export default describeUndoGroup;
