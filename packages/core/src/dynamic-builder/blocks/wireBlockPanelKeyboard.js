import insertBlockContent from './insertBlockContent.js';
import moveFocusAmongBlockCards from './moveFocusAmongBlockCards.js';

const wireBlockPanelKeyboard = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || containerElement.dbBlockKeyboardWired) return;
  containerElement.dbBlockKeyboardWired = true;
  const activateCard = (cardElement, allowClickHandler) => {
    const blockModel = editor.BlockManager.get(cardElement.getAttribute('data-db-block-id') || '');
    if (!blockModel) return;
    const clickHandler = blockModel.get('onClick');
    if (typeof clickHandler === 'function') {
      allowClickHandler && clickHandler(blockModel, editor, {});
      return;
    }
    insertBlockContent(editor, blockModel);
  };
  containerElement.addEventListener('keydown', (keyEvent) => {
    const targetElement = keyEvent.target;
    if (!targetElement || !targetElement.closest) return;
    const isActivationKey = keyEvent.key === 'Enter' || keyEvent.key === ' ';
    const cardElement = targetElement.closest('.gjs-block');
    if (cardElement) {
      if (isActivationKey) {
        keyEvent.preventDefault();
        activateCard(cardElement, true);
      } else if (keyEvent.key.indexOf('Arrow') === 0) {
        keyEvent.preventDefault();
        moveFocusAmongBlockCards(cardElement, keyEvent.key);
      }
      return;
    }
    const titleElement = targetElement.closest('.gjs-block-category .gjs-title');
    if (titleElement && isActivationKey) {
      keyEvent.preventDefault();
      titleElement.click();
    }
  });
  containerElement.addEventListener('dblclick', (mouseEvent) => {
    const cardElement = mouseEvent.target && mouseEvent.target.closest ? mouseEvent.target.closest('.gjs-block') : null;
    cardElement && activateCard(cardElement, false);
  });
};

export default wireBlockPanelKeyboard;
