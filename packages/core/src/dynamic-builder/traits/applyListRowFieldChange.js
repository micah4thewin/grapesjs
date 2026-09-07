import applySocialNetworkChoice from '../interactiveComponents/applySocialNetworkChoice.js';
import collectListRowRecords from './collectListRowRecords.js';
import markTraitInputValidity from './markTraitInputValidity.js';
import parseLinkPageChoice from './parseLinkPageChoice.js';
import validateLinkAddress from './validateLinkAddress.js';
import writeLinkRecord from './writeLinkRecord.js';
import writeListRowLabelText from './writeListRowLabelText.js';

const applyListRowFieldChange = (editor, rootComponent, listSelector, rowIndex, fieldName, fieldElement) => {
  const rowRecord = collectListRowRecords(rootComponent, listSelector)[rowIndex];
  if (!rowRecord || !fieldElement) return false;
  const fieldValue = String(fieldElement.value == null ? '' : fieldElement.value);
  if (fieldName === 'label') {
    writeListRowLabelText(rowRecord.linkComponent, fieldValue);
    return true;
  }
  if (fieldName === 'pageLink') {
    const pageChoice = parseLinkPageChoice(fieldValue);
    writeLinkRecord(editor, rowRecord.linkComponent, pageChoice ? { kind: 'page', ...pageChoice } : { kind: 'none' });
    return true;
  }
  if (fieldName === 'href') {
    const validation = validateLinkAddress('url', fieldValue);
    markTraitInputValidity(fieldElement, !validation.message, validation.message);
    if (validation.message) return false;
    if (validation.addedScheme) fieldElement.value = validation.address;
    writeLinkRecord(editor, rowRecord.linkComponent, { kind: 'url', address: validation.address });
    return true;
  }
  if (fieldName === 'network') {
    applySocialNetworkChoice(rootComponent, rowIndex, fieldValue);
    return true;
  }
  return false;
};

export default applyListRowFieldChange;
