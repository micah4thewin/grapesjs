import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import filterBlockCardsByQuery from './filterBlockCardsByQuery.js';
import getIconMarkup from '../support/getIconMarkup.js';

const mountBlockSearchInput = (editor) => {
  const readCurrentQuery = () => {
    const containerElement = editor.getContainer && editor.getContainer();
    const searchInput = containerElement && containerElement.querySelector('[data-db-block-search] input');
    return searchInput ? searchInput.value : '';
  };
  const reapplyCurrentQuery = () => {
    const containerElement = editor.getContainer && editor.getContainer();
    const blocksContainer = containerElement && containerElement.querySelector('.gjs-blocks-cs');
    if (!blocksContainer) return;
    filterBlockCardsByQuery(blocksContainer, readCurrentQuery());
  };
  const tryMountSearch = () => {
    const containerElement = editor.getContainer && editor.getContainer();
    if (!containerElement) return;
    const blocksContainer = containerElement.querySelector('.gjs-blocks-cs');
    if (!blocksContainer || !blocksContainer.parentElement) return;
    if (containerElement.querySelector('[data-db-block-search]')) {
      reapplyCurrentQuery();
      return;
    }
    const searchMarkup = [
      '<div class="gjs-db-block-search" data-db-block-search>',
      getIconMarkup('search', { size: 14 }),
      '<input type="search" class="gjs-db-block-search-input" placeholder="Search blocks"',
      ' aria-label="Search blocks" />',
      '</div>',
    ].join('');
    const searchElement = buildElementFromMarkup(containerElement.ownerDocument, searchMarkup);
    if (!searchElement) return;
    blocksContainer.parentElement.insertBefore(searchElement, blocksContainer);
    const searchInput = searchElement.querySelector('input');
    searchInput.addEventListener('input', () => filterBlockCardsByQuery(blocksContainer, searchInput.value));
  };
  tryMountSearch();
  setTimeout(tryMountSearch, 250);
  setTimeout(tryMountSearch, 800);
  editor.on('command:run:open-blocks', () => setTimeout(tryMountSearch, 60));
  editor.on('command:run:core:open-blocks', () => setTimeout(tryMountSearch, 60));
  editor.on('block:add', () => setTimeout(reapplyCurrentQuery, 30));
  editor.on('block:remove', () => setTimeout(reapplyCurrentQuery, 30));
};

export default mountBlockSearchInput;
