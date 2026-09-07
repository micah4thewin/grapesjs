import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildTokenBindingMenuMarkup from './buildTokenBindingMenuMarkup.js';
import readActiveTokenRecord from './readActiveTokenRecord.js';

const openTokenBindingMenu = (editor, propertyModel, groupKey, anchorButton) => {
  const propertyElement = anchorButton.closest('.gjs-sm-property');
  const ownerDocument = anchorButton.ownerDocument;
  if (!propertyElement || !ownerDocument) return;
  const existingMenu = propertyElement.querySelector('.gjs-db-token-menu');
  if (existingMenu) {
    existingMenu.remove();
    anchorButton.setAttribute('aria-expanded', 'false');
    return;
  }
  const currentValue = propertyModel.getValue ? propertyModel.getValue() : '';
  const menuElement = buildElementFromMarkup(
    ownerDocument,
    buildTokenBindingMenuMarkup(groupKey, readActiveTokenRecord(editor), currentValue),
  );
  if (!menuElement) return;
  const closeMenu = () => {
    menuElement.remove();
    anchorButton.setAttribute('aria-expanded', 'false');
    ownerDocument.removeEventListener('mousedown', handleOutsideClick, true);
    ownerDocument.removeEventListener('keydown', handleEscape, true);
  };
  const handleOutsideClick = (mouseEvent) => {
    if (!menuElement.contains(mouseEvent.target) && mouseEvent.target !== anchorButton) closeMenu();
  };
  const handleEscape = (keyEvent) => {
    if (keyEvent.key !== 'Escape') return;
    closeMenu();
    anchorButton.focus();
  };
  menuElement.addEventListener('click', (clickEvent) => {
    const targetElement = clickEvent.target && clickEvent.target.closest ? clickEvent.target : null;
    const valueButton = targetElement && targetElement.closest('[data-db-token-value]');
    if (valueButton) {
      propertyModel.upValue(valueButton.getAttribute('data-db-token-value'));
      closeMenu();
      return;
    }
    if (!targetElement || !targetElement.closest('[data-db-token-clear]')) return;
    if (/^var\(--db-/.test(String(currentValue || '').trim())) propertyModel.clear();
    closeMenu();
  });
  propertyElement.appendChild(menuElement);
  anchorButton.setAttribute('aria-expanded', 'true');
  ownerDocument.addEventListener('mousedown', handleOutsideClick, true);
  ownerDocument.addEventListener('keydown', handleEscape, true);
  const firstItem = menuElement.querySelector('button');
  if (firstItem) firstItem.focus();
};

export default openTokenBindingMenu;
