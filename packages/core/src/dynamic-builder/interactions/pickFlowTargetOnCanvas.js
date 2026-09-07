import ensureStableComponentId from './ensureStableComponentId.js';
import showToastNotice from '../support/showToastNotice.js';

const writePickedTarget = (flowRecords, fieldScope, fieldName, selectorText) => {
  const scopeParts = String(fieldScope || '').split(':');
  const flowRecord = flowRecords[Number(scopeParts[1])];
  if (!flowRecord) return;
  if (scopeParts[0] === 'trigger') {
    flowRecord.triggerOptions[fieldName] = selectorText;
    return;
  }
  const actionRecord = flowRecord.actions[Number(scopeParts[2])];
  if (actionRecord) actionRecord.options[fieldName] = selectorText;
};

const pickFlowTargetOnCanvas = (editor, pickRecord) => {
  editor.Modal.close();
  showToastNotice(editor, 'Click an element on the page to use it as the target.', { duration: 8000 });
  const handleSelected = (pickedComponent) => {
    editor.off('component:selected', handleSelected);
    const stableId = pickedComponent === pickRecord.component ? '' : ensureStableComponentId(editor, pickedComponent);
    writePickedTarget(pickRecord.flows, pickRecord.fieldScope, pickRecord.fieldName, stableId ? '#' + stableId : '');
    editor.select(pickRecord.component);
    pickRecord.reopen(pickRecord.flows, {
      focusSelector:
        '[data-db-flow-scope="' + pickRecord.fieldScope + '"][data-db-flow-field="' + pickRecord.fieldName + '"]',
    });
  };
  setTimeout(() => editor.on('component:selected', handleSelected), 60);
};

export default pickFlowTargetOnCanvas;
