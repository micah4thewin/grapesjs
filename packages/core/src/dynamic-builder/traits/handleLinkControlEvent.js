import markTraitInputValidity from './markTraitInputValidity.js';
import parseLinkPageChoice from './parseLinkPageChoice.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';
import validateLinkAddress from './validateLinkAddress.js';
import writeLinkRecord from './writeLinkRecord.js';

const resolveDefaultPageId = (editor) => {
  const selectedPage = editor.Pages && editor.Pages.getSelected ? editor.Pages.getSelected() : null;
  const firstPage = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll()[0] : null;
  const targetPage = selectedPage || firstPage;
  return targetPage && targetPage.getId ? String(targetPage.getId()) : '';
};

const applyKindChoice = (editor, component, wrapperElement, chosenKind) => {
  wrapperElement.dataset.dbKindChoice = chosenKind;
  if (chosenKind === 'page') {
    const pageSelect = resolveTraitInnerElement(wrapperElement, '[data-db-link-page]');
    const pageChoice = parseLinkPageChoice(pageSelect && pageSelect.value) || { pageId: resolveDefaultPageId(editor) };
    writeLinkRecord(editor, component, { kind: 'page', ...pageChoice });
    return;
  }
  writeLinkRecord(editor, component, { kind: 'none' });
  const addressInput = resolveTraitInnerElement(wrapperElement, '[data-db-link-address]');
  if (addressInput && (chosenKind === 'url' || chosenKind === 'email' || chosenKind === 'phone')) {
    addressInput.value = '';
    markTraitInputValidity(addressInput, true, '');
    setTimeout(() => addressInput.focus(), 0);
  }
};

const applyAddressChange = (editor, component, wrapperElement, addressInput) => {
  const kindSelect = resolveTraitInnerElement(wrapperElement, '[data-db-link-kind]');
  const linkKind = kindSelect ? kindSelect.value : 'url';
  const validation = validateLinkAddress(linkKind, addressInput.value);
  const hintElement = resolveTraitInnerElement(wrapperElement, '[data-db-link-hint]');
  markTraitInputValidity(addressInput, !validation.message, validation.message);
  if (hintElement) {
    hintElement.hidden = !validation.addedScheme;
    hintElement.textContent = validation.addedScheme ? 'We added https:// for you.' : '';
  }
  if (validation.message) return;
  if (validation.addedScheme) addressInput.value = validation.address;
  writeLinkRecord(editor, component, { kind: linkKind, address: validation.address });
};

const openFilePicker = (editor, component) => {
  const assetManager = editor.AssetManager;
  if (!assetManager || !assetManager.open) return;
  assetManager.open({
    select: (selectedAsset) => {
      const assetSource = selectedAsset && selectedAsset.getSrc ? selectedAsset.getSrc() : '';
      if (assetSource) writeLinkRecord(editor, component, { kind: 'file', address: assetSource });
      assetManager.close();
    },
  });
};

const handleLinkControlEvent = (editor, component, wrapperElement, event) => {
  const eventTarget = event && event.target && event.target.closest ? event.target : null;
  if (!eventTarget || !component || !wrapperElement) return false;
  if (event.type === 'change' && eventTarget.closest('[data-db-link-kind]')) {
    applyKindChoice(editor, component, wrapperElement, eventTarget.value);
    return true;
  }
  if (event.type === 'change' && eventTarget.closest('[data-db-link-page]')) {
    const pageChoice = parseLinkPageChoice(eventTarget.value);
    if (pageChoice) writeLinkRecord(editor, component, { kind: 'page', ...pageChoice });
    return true;
  }
  if (event.type === 'change' && eventTarget.closest('[data-db-link-address]')) {
    applyAddressChange(editor, component, wrapperElement, eventTarget);
    return true;
  }
  if (event.type === 'click' && eventTarget.closest('[data-db-link-choose-file]')) {
    openFilePicker(editor, component);
    return true;
  }
  return false;
};

export default handleLinkControlEvent;
