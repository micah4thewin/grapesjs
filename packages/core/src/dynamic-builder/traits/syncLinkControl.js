import buildLinkPageOptionsMarkup from './buildLinkPageOptionsMarkup.js';
import buildLinkPageSignature from './buildLinkPageSignature.js';
import describeAssetFileName from './describeAssetFileName.js';
import describeLinkRecord from './describeLinkRecord.js';
import getLinkKindRecords from './getLinkKindRecords.js';
import readLinkRecord from './readLinkRecord.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';

const resolveEffectiveKind = (wrapperElement, linkRecord) => {
  const chosenKind = wrapperElement.dataset.dbKindChoice || '';
  if (linkRecord.kind === 'none' && chosenKind) return chosenKind;
  return linkRecord.kind;
};

const syncPageSelect = (editor, pageSelect, linkRecord) => {
  const pageSignature = buildLinkPageSignature(editor);
  const selectedKey = linkRecord.pageId
    ? `${linkRecord.pageId}${linkRecord.anchorId ? `#${linkRecord.anchorId}` : ''}`
    : '';
  if (pageSelect.dataset.dbSignature !== pageSignature) {
    pageSelect.innerHTML = buildLinkPageOptionsMarkup(editor, linkRecord.pageId, linkRecord.anchorId);
    pageSelect.dataset.dbSignature = pageSignature;
  }
  const hasMatchingOption = [...pageSelect.options].some((optionElement) => optionElement.value === selectedKey);
  if (hasMatchingOption && pageSelect.value !== selectedKey) pageSelect.value = selectedKey;
};

const syncLinkControl = (editor, component, wrapperElement) => {
  if (!wrapperElement || !wrapperElement.querySelector) return null;
  const linkRecord = readLinkRecord(editor, component);
  const effectiveKind = resolveEffectiveKind(wrapperElement, linkRecord);
  const kindRecord = getLinkKindRecords().find((candidate) => candidate.id === effectiveKind) || { id: 'none' };
  const kindSelect = resolveTraitInnerElement(wrapperElement, '[data-db-link-kind]');
  const pageSelect = resolveTraitInnerElement(wrapperElement, '[data-db-link-page]');
  const addressInput = resolveTraitInnerElement(wrapperElement, '[data-db-link-address]');
  const fileElement = resolveTraitInnerElement(wrapperElement, '[data-db-link-file]');
  const fileNameElement = resolveTraitInnerElement(wrapperElement, '[data-db-link-file-name]');
  const summaryElement = resolveTraitInnerElement(wrapperElement, '[data-db-link-summary]');
  const activeElement = wrapperElement.ownerDocument.activeElement;
  if (kindSelect && kindSelect.value !== effectiveKind) kindSelect.value = effectiveKind;
  if (pageSelect) {
    pageSelect.hidden = effectiveKind !== 'page';
    syncPageSelect(editor, pageSelect, linkRecord);
  }
  if (addressInput) {
    const showsAddress = effectiveKind === 'url' || effectiveKind === 'email' || effectiveKind === 'phone';
    addressInput.hidden = !showsAddress;
    addressInput.placeholder = kindRecord.placeholder || '';
    addressInput.setAttribute('inputmode', kindRecord.inputMode || 'text');
    const addressText = linkRecord.kind === effectiveKind ? String(linkRecord.address || '') : '';
    if (activeElement !== addressInput && addressInput.value !== addressText) addressInput.value = addressText;
  }
  if (fileElement) fileElement.hidden = effectiveKind !== 'file';
  if (fileNameElement) {
    fileNameElement.textContent =
      linkRecord.kind === 'file' ? describeAssetFileName(linkRecord.address) : 'No file chosen';
  }
  if (summaryElement) summaryElement.textContent = describeLinkRecord(linkRecord);
  return linkRecord;
};

export default syncLinkControl;
